import { gsap } from "gsap"

export default {
  mounted() {
    this.loadSections()
  },
  methods: {
    loadSections() {
      gsap.to("section", {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.33,
        stagger: {
          amount: 0.66
        }
      })
    }
  }
}
