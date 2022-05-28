import Vue from 'vue'
import CustomButton from '@/components/UI/CustomButton.vue'
import firebaseInit from '@/assets/js/firebase/firebaseInit.js'
import ArticleCategory from '@/components/article/ArticleCategory.vue'

Vue.component('CustomButton', CustomButton)
Vue.component('ArticleCategory', ArticleCategory)

//  import firebase
firebaseInit()
