<template>
  <li class="contentListItem-Column">
    <markdown :input="blok.text" />
  </li>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
