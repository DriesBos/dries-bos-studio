<template>
  <div class="three-Container" id="container"></div>
</template>

<script>
import * as THREE from 'three'
import image from '../assets/images/star.png'

export default {
  name: 'TheStars',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      stars: null,
      starGeo: null
    }
  },
  methods: {
    init: function() {
      let container = document.getElementById('container')
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        1,
        1000
      )
      this.camera.position.z = 1
      this.camera.rotation.x = Math.PI / 2
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
      this.starGeo = new THREE.Geometry()
      for (let i = 0; i < 3000; i++) {
        let star = new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        )
        star.velocity = 0
        star.acceleration = 0.02
        this.starGeo.vertices.push(star)
      }
      let sprite = new THREE.TextureLoader().load(image)
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
      })
      this.stars = new THREE.Points(this.starGeo, starMaterial)
      this.scene.add(this.stars)
    },
    animate: function() {
      this.starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity

        if (p.y < -200) {
          p.y = 200
          p.velocity = 0
        }
      })
      this.starGeo.verticesNeedUpdate = true
      // this.stars.rotation.y += 0.002

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    onWindowResize: function() {
      let container = document.getElementById('container')
      this.camera.aspect = container.clientWidth / container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(container.clientWidth, container.clientHeight)
    }
  },
  mounted() {
    this.init()
    this.animate()
    window.addEventListener('resize', this.onWindowResize)
  }
}
</script>