<template>
  <div class="all_category_section">
    <NuxtLink
      v-for="(category, index) in finalView"
      :key="index"
      class="category_background"
      :class="{ shakeAnimate: isEdit }"
      :to="
        goToPage({ categoryTitle: category.title, imageUrl: category.imageUrl })
      "
    >
      <div class="category_img"><img :src="category.imageUrl" /></div>
      <h3>{{ category.title }}</h3>
    </NuxtLink>
  </div>
</template>

<script>
import 'animate.css'

export default {
  props: {
    isAdmin: {
      type: Boolean,
      require: true,
    },
    isEdit: {
      type: Boolean,
      require: false,
    },
  },
  data() {
    return {
      article: [
        {
          title: '學習到了',
          src: '',
          previewText: '真的很棒',
        },
      ],
    }
  },
  computed: {
    finalView() {
      return this.$store.getters['useFirebase/getArticleCategory']
    },
  },
  created() {
    this.$store.dispatch('useFirebase/fetchCategory')
  },
  methods: {
    goToPage({ categoryTitle, imageUrl }) {
      const path = this.$router.currentRoute.path
      //  若在首頁，或是/posts，進入該類別文章列表
      if (path === '/' || path === '/posts') {
        return `/posts/${categoryTitle}`
      }

      // 若在類別文章列表，判斷是否編輯模式
        //  若"否"進入該文章
        //  若"是"編輯模式，
      if (!this.isEdit) {
        return `/Admin/${categoryTitle}`
      } else {
        return {
          path: `/Admin/createNewCategory`,
          query: { categoryTitle, imageUrl, isUpdate: true },
        }
      }
    },
  },
  // asyncData(){

  // }
}
</script>

<style scoped>
.all_category_section {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5vh;
  margin: 0 2.5vh;
}

.all_category_section > * {
  text-decoration: none;
  color: black;
}

.category_background {
  /* background-color: white; */
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  list-style: none;
  width: 30%;
  margin: 5vh auto;
  text-align: center;
  max-width: 300px;
  min-width: 150px;
  border-radius: .5rem;
}

.category_img {
  height: 20vh;
}

.category_img > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.category_background > h3 {
  margin: 0;
  padding: 0.5rem;
  white-space: pre-wrap;
  overflow: hidden;
  background-color: blanchedalmond;
}

.shakeAnimate {
  animation: shakeX 1.5s infinite;
  /* animation-duration: 2s;  */
}
</style>