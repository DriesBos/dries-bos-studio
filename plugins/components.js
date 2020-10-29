import Vue from "vue"
import Page from "~/components/Page.vue"
import Project from "~/components/Project.vue"
import Markdown from "~/components/Markdown.vue"
import ItemText from "~/components/ItemText.vue"
import ItemColumn from "~/components/ItemColumn.vue"
import IndexTextItem from "~/components/IndexTextItem.vue"
import IndexImageItem from "~/components/IndexImageItem.vue"

Vue.component("blok-page", Page)
Vue.component("blok-project", Project)
Vue.component("markdown", Markdown)
Vue.component("blok-item-text", ItemText)
Vue.component("blok-item-column", ItemColumn)
Vue.component("blok-index-text-item", IndexTextItem)
Vue.component("blok-index-image-item", IndexImageItem)
