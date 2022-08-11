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
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5

// 旋转 rotation 当你旋转x轴时，也会改变其他轴的方向
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// 旋转 quaternion 四元数



scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// 采用右手笛卡尔坐标系，y轴向上，z轴向后，x轴向右
camera.position.z = 1

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


window.addEventListener('resize', () => {
  console.log('window has been resized');
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  // 更改了像aspect这样的相机属性时，还需要使用camera.Updatejectionmatrix()来更新投影矩阵
  camera.updateProjectionMatrix()
  // update renderer size
  renderer.setSize(sizes.width, sizes.height)
  // set renderer 像素比
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// 双击 全屏
window.addEventListener('dblclick', () => {
  console.log('double click.');
  if(!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

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
// scene.add(group)

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

// Cursor 鼠标
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', event => {
  // 调整鼠标坐标值，使之相对画布中心变化
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
  // console.log(event.clientX, event.clientY);
  // console.log(cursor.x, cursor.y);
})

renderer.render(scene, camera)

// Animate
// const time = new Date().getTime()
// const tick = () => {
//   const elapsedTime = (new Date().getTime() - time) / 1000
//   mesh.rotation.y = elapsedTime
//   // mesh.rotation.y += 0.01
//   renderer.render(scene, camera)
//   window.requestAnimationFrame(tick)
// }

// Controls 环轨控制器
const controls = new THREE.OrbitControls(camera, canvas)
controls.target.y = 2
controls.enableDamping = true


// Clock 内置方法：处理时间的计算
// CLock().getElapsedTime() 创建时钟以来过去了多少秒
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  // mesh.rotation.y = elapsedTime
  // 三角函数优化动效
  mesh.rotation.x = Math.cos(elapsedTime)
  mesh.rotation.y = Math.sin(elapsedTime)
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)

  // 改变相机坐标，使之持续lookAt看向立方体mesh
  // camera.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)

  // camera.position.x = cursor.x
  // camera.position.y = cursor.y
  
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  // camera.position.y = cursor.y * 3
  // camera.lookAt(mesh.position)

  // Update controls
  controls.update()
}

// GSAP
// gsap.to(mesh.rotation, { duration: 1, y: 45*(Math.PI/180) })
// const tick = () => {


//   renderer.render(scene, camera)
//   window.requestAnimationFrame(tick)
// }


tick()