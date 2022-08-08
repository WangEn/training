console.log('Hello World!');
// console.log(THREE);

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// 位移
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

// 缩放
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5

// 旋转 rotation 当你旋转x轴时，也会改变其他轴的方向
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

// 旋转 quaternion 四元数



scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// 采用右手笛卡尔坐标系，y轴向上，z轴向后，x轴向右
camera.position.z = 3

// lookAt 让指定的3D物体自动旋转朝向一个坐标
// camera.lookAt(new THREE.Vector3(0, -1, 0))
camera.lookAt(mesh.position)

scene.add(camera)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)


// length()一个向量的长度
// console.log(mesh.position.length());
// distanceTo() 计算和另一个向量坐标的距离
// console.log(mesh.position.distanceTo(camera.position));
// normalize 归一化：仅保留方向特性
// console.log(mesh.position.normalize());
// set一次性改变x,y,z
// console.log(mesh.position.set(0.7, -0.6, 1));

// Axes Helper 轴辅助工具
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


// Group
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)

renderer.render(scene, camera)