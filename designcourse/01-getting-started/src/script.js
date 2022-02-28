import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
// const textureLoader = new THREE.TextureLoader()
// const earthNormal = textureLoader.load('/textures/earth_normal_map.tif')
// const earthMap = textureLoader.load('/textures/earth_night_map.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 0.65
material.normalMap = earthNormal
material.map = earthMap

// Mesh
// const sphere = new THREE.Mesh(geometry, material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0)
pointLight.position.x = -1.6
pointLight.position.y = -6 //2.17
pointLight.position.z = 2.58
scene.add(pointLight)

gui.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
gui.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
gui.add(pointLight.position, 'z').min(0).max(10).step(0.01)
gui.add(pointLight, 'intensity').min(0).max(1)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

gui.add(camera.position, 'x')
gui.add(camera.position, 'y')
gui.add(camera.position, 'z')
gui.add(camera.rotation, 'x')
gui.add(camera.rotation, 'y')
gui.add(camera.rotation, 'z')

document.addEventListener('keypress', e => {
  if (e.key == 'p') {
    console.log(camera.position)
    console.log(camera.rotation)
  }
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
