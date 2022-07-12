<template>
  <section class="block block-Text block-Footer block-Footer_Up">
    <div
      class="blockTop"
      v-html="require('~/assets/images/spaceform.svg?include')"
    />

    <div class="block-Text_Content block-Footer_Content">
      <div class="block-Text_Column block-Text_Icons">
        <div
          v-scroll-to="'#top'"
          class="icon icon-Arrow icon-Arrow_Up cursorInteract"
          title="view project"
          v-html="require('~/assets/images/icon-arrow.svg?include')"
        ></div>
      </div>
    </div>
  </section>
</template>
