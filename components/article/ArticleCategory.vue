<template>
  <div class="all_category_section">
    <div
      v-for="(category, index) in finalView"
      :key="index"
      class="category_background"
      :class="{ shakeAnimate: isEdit }"
    >
      <div class="category_img" @click="goToPage({ categoryTitle: category.title, imageUrl: category.imageUrl })"><img :src="category.imageUrl" /></div>
      <h3>{{ category.title }}</h3>
      <div class="deleteButton" @click.stop="deleteCategory" v-if="isEdit">X</div>
    </div>
    <el-dialog
      :visible.sync="isClickPressed"
      :append-to-body="true"
      top="30vh"
      width="80%"
    >
      <div slot="title" class="dialog_delete_title">警告！</div>
      <div class="dialog_delete_content">您是否確認要刪除此類型，如此類型裡有相關文章，將一併刪除</div>
      <div slot="footer" @click="confirmDelete">確認</div>
    </el-dialog>
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
      isClickPressed:false
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
        // return `/posts/${categoryTitle}`
        this.$router.push(`/posts/${categoryTitle}`)
      }

      // 若在類別文章列表，判斷是否編輯模式
        //  若"否"進入該文章
        //  若"是"編輯模式，
      if (!this.isEdit) {
        this.$router.push(`/Admin/${categoryTitle}`)
      } else {
        this.$router.push({
          path: `/Admin/createNewCategory`,
          query: { categoryTitle, imageUrl, isUpdate: true },
        })
      }
    },
    deleteCategory(){
      // console.log('try try see~~~')
      this.isClickPressed = !this.isClickPressed
    },
    confirmDelete(){
      //  TODO 加入delete 邏輯
      this.isClickPressed = !this.isClickPressed
    }
  },
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
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  list-style: none;
  width: 30%;
  margin: 5vh auto;
  text-align: center;
  max-width: 300px;
  min-width: 150px;
  border-radius: .5rem;
  position: relative;
  cursor: pointer;
}

.dialog_delete_title{
  text-align: center;
}

.delete_comfirm_dialog{
  height: 30vh;
  overflow: scroll;
}

.deleteButton{
  position: absolute;
  top: -12px;
  right: -12px;
  background-color: red;
  width:24px;
  height: 24px;
  line-height: 24px;
  color:white;
}

.dialog_delete_content{
  max-height: 30vh;
  overflow-y: auto;
  text-align: left;
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