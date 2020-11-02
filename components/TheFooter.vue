<template>
  <section class="contentListItem-Footer">
    <ul class="contentListItem">
      <li class="contentListItem-Column empty"></li>
      <li class="contentListItem-Column icons">
        <ul class="contentListItem-Icons">
          <!-- MAIL -->
          <!-- <li
            class="contentListItem-Icon contentListItem-View"
            title="mail me!"
          >
            <a
              href="mailto:info@driesbos.com"
              class="cursorInteract icon icon-Mail"
            >
              <div v-html="require('~/assets/images/icon-mail.svg?include')" />
            </a>
          </li> -->
          <!-- PHONE -->
          <!-- <li
            class="contentListItem-Icon contentListItem-View"
            title="call me!"
          >
            <a href="tel:0031636101262" class="cursorInteract icon icon-Phone">
              <div v-html="require('~/assets/images/icon-phone.svg?include')" />
            </a>
          </li> -->
          <!-- UP -->
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
