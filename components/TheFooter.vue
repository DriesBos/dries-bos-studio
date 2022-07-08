<template>
  <section class="block block-Navigation contentListItem-Footer">
    <ul class="contentListItem">
      <li class="contentListItem-Column empty"></li>
      <li class="contentListItem-Column icons">
        <ul class="contentListItem-Icons">
          <li
            v-scroll-to="'#top'"
            class="contentListItem-Icon contentListItem-Arrow"
          >
            <div
              class="icon icon-Arrow cursorInteract"
              title="view project"
              v-html="require('~/assets/images/icon-arrow.svg?include')"
            ></div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
