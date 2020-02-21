<template>
  <li :key="post.id" :id="post.id" class="listItem listItem_Project">
    <div class="listItem-Thumb">
      <img :src="post.cover_image" alt="" />
    </div>
    <nuxt-link
      :to="`/blog/${post.id}`"
      class="listItem-DetailsWrapper"
      tag="div"
    >
      <div class="listItem-Number listItem-Details ellipsis">
        <p>001</p>
      </div>
      <div v-if="post.title" class="listItem-Title listItem-Details ellipsis">
        <p>{{ post.title }}</p>
      </div>
      <div
        v-if="post.category"
        class="listItem-Category listItem-Details ellipsis"
      >
        <p>{{ post.category }}</p>
      </div>
    </nuxt-link>
    <div class="listItem-Icons">
      <div class="icon-Container" title="view project">
        <svg width="25" height="25" viewBox="0 0 25 25" class="icon">
          <path
            d="M13.5101551,-0.0106601718 L13.5094466,21.1873398 L21.0001551,13.6964466 L22.4143687,15.1106602 L12.5148737,25.0101551 L12.5104466,25.0053398 L12.5059415,25.0101551 L2.60644661,15.1106602 L4.02066017,13.6964466 L11.5094466,21.1853398 L11.5101551,-0.0106601718 L13.5101551,-0.0106601718 Z"
            fill
            transform="translate(12.510408, 12.499747) scale(-1, -1) rotate(90.000000) translate(-12.510408, -12.499747)"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "IndexListItem",
  props: {
    post: Object
  },
  mounted() {
    console.log(this.post)
  }
}
</script>
