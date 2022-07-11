<template>
  <section class="block block-Text block-Filter">
    <div
      class="blockTop"
      v-html="require('~/assets/images/spaceform.svg?include')"
    />

    <div class="block-Text_Content">
      <div class="block-Text_Column year">
        <div class :class="{ active: sortByYear }" @click="sortYear">
          <p class="cursorInteract" title="sort by year">year</p>
        </div>
      </div>

      <div class="block-Text_Column title">
        <div
          class="listItem-Title listItem-Details"
          :class="{ active: sortByTitle }"
          @click="sortTitle"
        >
          <p class="cursorInteract" title="sort by project">project</p>
        </div>
      </div>

      <!-- <li class="block-Text_Column agency">
          <div
            class="listItem-Agency listItem-Details"
            :class="{ active: sortByAgency }"
            @click="sortAgency"
          >
            <p class="cursorInteract" title="sort by agency">agency</p>
          </div>
        </li> -->
      <!-- <li class="block-Text_Column category">
          <div
            class="listItem-Category listItem-Details"
            :class="{ active: sortByCategory }"
            @click="sortCategory"
          >
            <p class="cursorInteract" title="sort by industry">industry</p>
          </div>
        </li> -->
      <!-- <li class="block-Text_Column category">
          <div
            class="listItem-Category listItem-Details"
            :class="{ active: sortByCategory }"
            @click="sortCategory"
          >
            <p class="cursorInteract" title="sort by role">role</p>
          </div>
        </li> -->

      <!-- SEARCH -->
      <div class="block-Text_Column block-Text_Icons">
        <ul class="block-Text_Icons">
          <li
            v-click-outside="outsideSearch"
            class="block-Text_Input"
            :class="{ active: toggleSearch }"
          >
            <input
              id="search"
              ref="search"
              v-model="search"
              class="cursorInteract"
              type="text"
              placeholder="search project.."
              title="search project"
              size="13"
            />
          </li>
          <li
            class="block-Text_Icon block-Text_Search"
            title="search project"
            @click.stop="searchIconClick"
          >
            <div
              class="cursorInteract icon icon-Search"
              :class="{ active: toggleSearch }"
            >
              <div
                v-html="require('~/assets/images/icon-search.svg?include')"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
