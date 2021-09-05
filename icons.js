import  Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronDown, faCogs, faPencilAlt, faSignOutAlt, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons"
import {} from "@fortawesome/free-regular-svg-icons"
import {} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faChevronDown, faCogs, faSignOutAlt, faPencilAlt, faTrash, faUserEdit)

Vue.component('font-icon', FontAwesomeIcon)