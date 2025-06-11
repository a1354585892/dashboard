<template>
  <div class="globe-container" ref="globeContainer"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const globeContainer = ref(null);
let scene, camera, renderer, globe, controls;
let animationId = null;
let textureLoader = null;
let earthTexture = null;
let bumpTexture = null;
let specularTexture = null;
let isTexturesLoaded = false;

// 创建加载管理器来跟踪纹理加载状态
const loadManager = new THREE.LoadingManager();
loadManager.onLoad = () => {
  isTexturesLoaded = true;
  createGlobe();
};
loadManager.onError = (url) => {
  console.error("加载纹理失败:", url);
};

onMounted(() => {
  initThree();
  loadTextures();
  animate();
  window.addEventListener("resize", onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onWindowResize);
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
  // 释放纹理资源
  if (earthTexture) earthTexture.dispose();
  if (bumpTexture) bumpTexture.dispose();
  if (specularTexture) specularTexture.dispose();
});

function loadTextures() {
  textureLoader = new THREE.TextureLoader(loadManager);

  // 使用绝对路径加载纹理
  const baseUrl = window.location.origin;

  // 尝试加载纹理 - 使用备用纹理URL以防原始URL不可用
  try {
    earthTexture = textureLoader.load(
      `${baseUrl}/textures/earth_dark.jpg`,
      undefined,
      undefined,
      () => {
        console.error("地球纹理加载失败，使用备用纹理");
        earthTexture = textureLoader.load(
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
        );
      }
    );

    bumpTexture = textureLoader.load(
      `${baseUrl}/textures/earth_bump.jpg`,
      undefined,
      undefined,
      () => {
        console.error("凹凸纹理加载失败，使用备用纹理");
        bumpTexture = textureLoader.load(
          "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg"
        );
      }
    );

    specularTexture = textureLoader.load(
      `${baseUrl}/textures/earth_specular.jpg`,
      undefined,
      undefined,
      () => {
        console.error("高光纹理加载失败，使用备用纹理");
        specularTexture = null; // 如果没有合适的备用，可以不使用高光贴图
      }
    );
  } catch (error) {
    console.error("纹理加载错误:", error);
    // 使用备用纹理
    createGlobeWithDefaultTexture();
  }
}

function createGlobeWithDefaultTexture() {
  // 创建一个简单的地球，不依赖外部纹理
  const earthGeometry = new THREE.SphereGeometry(80, 64, 64);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
    specular: 0xffffff,
    shininess: 25,
  });
  globe = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(globe);

  // 添加大气层
  createAtmosphere();
}

function initThree() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000510);

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    globeContainer.value.clientWidth / globeContainer.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 200;

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    globeContainer.value.clientWidth,
    globeContainer.value.clientHeight
  );
  renderer.setPixelRatio(window.devicePixelRatio);
  globeContainer.value.appendChild(renderer.domElement);

  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.minDistance = 100;
  controls.maxDistance = 500;

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 添加星空背景
  createStars();
}

function createGlobe() {
  if (!isTexturesLoaded) return;

  // 创建地球
  const earthGeometry = new THREE.SphereGeometry(80, 64, 64);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.5,
    specularMap: specularTexture,
    specular: new THREE.Color(0x333333),
    shininess: 15,
  });

  globe = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(globe);

  // 添加大气层
  createAtmosphere();

  // 添加连线
  if (props.data && props.data.length > 0) {
    addConnectionLines();
  }
}

function createAtmosphere() {
  const atmosphereGeometry = new THREE.SphereGeometry(82, 64, 64);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);
}

function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    transparent: true,
  });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

function addConnectionLines() {
  props.data.forEach((connection) => {
    const { from, to, value } = connection;

    // 将经纬度转换为3D坐标
    const startPoint = latLongToVector3(from[1], from[0], 82);
    const endPoint = latLongToVector3(to[1], to[0], 82);

    // 创建曲线
    const curveHeight = 30 + (value / 100) * 20;
    const midPoint = new THREE.Vector3(
      (startPoint.x + endPoint.x) / 2,
      (startPoint.y + endPoint.y) / 2,
      (startPoint.z + endPoint.z) / 2
    );
    midPoint.normalize();
    midPoint.multiplyScalar(82 + curveHeight);

    const curve = new THREE.QuadraticBezierCurve3(
      startPoint,
      midPoint,
      endPoint
    );

    // 创建曲线几何体
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // 创建材质
    const material = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    });

    // 创建线条
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  });
}

function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function animate() {
  animationId = requestAnimationFrame(animate);

  // 地球自转
  if (globe) {
    globe.rotation.y += 0.001;
  }

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  if (!globeContainer.value) return;

  camera.aspect =
    globeContainer.value.clientWidth / globeContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    globeContainer.value.clientWidth,
    globeContainer.value.clientHeight
  );
}

// 监听数据变化，更新连线
watch(
  () => props.data,
  (newData) => {
    if (newData && newData.length > 0 && globe) {
      // 清除旧的连线
      scene.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          scene.remove(child);
        }
      });
      // 添加新的连线
      addConnectionLines();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.globe-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 10, 30, 0.3);
  border-radius: 8px;
}
</style>
