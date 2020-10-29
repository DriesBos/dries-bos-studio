<template>
  <li class="contentListItem-Column">
    <LazyMarkdown :input="blok.text" />
  </li>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
