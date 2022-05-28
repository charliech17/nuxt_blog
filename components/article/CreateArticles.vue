<template>
  <div class="create_pages">
    <!-- Title -->

    <section class="input_section">
      <label>標題</label>
      <input v-model.trim="articleTitle" type="text" />
    </section>
    <section class="input_section">
      <label>作者</label>
      <input v-model.trim="articleAuthor" type="text" />
    </section>
    <section class="input_section save_section">
      <label>文章類別: {{ articleCategory }}</label>
      <button class="save_button" @click="handleSave">儲存檔案</button>
      <p v-if="error" class="error">再次確認欄位是否空白</p>
    </section>
    <!-- Submit -->

    <!-- edit control -->
    <!-- <CKEditor/> -->
    <section>
      <TextEditor />
    </section>
    <!-- contents -->
    <div
      id="articleContents"
      class="content"
      contenteditable="true"
      @click="getCursor"
      @focus="error = false"
      @paste.prevent="handlePaste"
      data-text="請輸入文字"
      v-html="articleContents"
    ></div>
  </div>
</template>

<script>
import TextEditor from '@/components/UI/TextEditor.vue'
import writeUserData from '@/assets/js/firebase/writeUserData.js'
import getUserData from '@/assets/js/firebase/getUserData.js'

export default {
  components: {
    TextEditor,
  },
  data() {
    return {
      articleTitle: '',
      articleAuthor: '',
      articleContents: '',
      articleCategory: this.$route.params.articleCategory,
      error: false,
      articleId: '',
    }
  },
  async created() {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      const articleCategory = this.$route.params.articleCategory
      const articleInformation = await getUserData({
        path: `${articleCategory}/articles/${this.articleId}`,
      })

      this.articleTitle = articleInformation.articleTitle
      this.articleAuthor = articleInformation.articleAuthor
      this.articleContents = articleInformation.articleContents
    }
  },
  methods: {
    getCursor() {
      console.log(window.getSelection())
    },
    handleSave() {
      if (this.judgeInputData() === true) return

      const articleParameters = {
        articleTitle: this.articleTitle,
        articleAuthor: this.articleAuthor,
        articleContents: this.articleContents,
        writeTime: new Date().toString(),
      }
      //  存入firebase中
      this.handleFirebaseUpdate({ articleParameters })
      //  回到該頁面標籤
      this.$router.replace(`/Admin/${this.$route.params.articleCategory}`)
    },
    judgeInputData() {
      this.error = false
      this.articleContents =
        document.querySelector('#articleContents').innerHTML

      //  判斷是否空值
      if (
        this.articleTitle === '' ||
        this.articleAuthor === '' ||
        this.articleContents === '' ||
        this.articleCategory === ''
      ) {
        return (this.error = true)
      }
    },
    handleFirebaseUpdate({ articleParameters }) {
      //  如果是新增類別
      if (!this.$route.query.id) {
        writeUserData({ category: this.articleCategory, articleParameters })
      }
      //  如果是編輯舊有的類別
      else {
        writeUserData({
          category: this.articleCategory,
          articleParameters,
          articleId: this.articleId,
        })
      }
    },
    handlePaste(event) {
      const text = event.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    },
  },
}
</script>

<style scoped>
.create_pages {
  min-height: 90vh;
}

.input_section {
  margin: 2vh 0;
  text-align: center;
}

.input_section > input {
  border-radius: 0.5rem;
  border: 1px solid rgb(83, 83, 83);
  padding: 0.5rem;
}

.save_section > label {
  margin: 0 0.5rem;
}

.save_button {
  border: none;
  background-color: burlywood;
  padding: 0.5rem;
}

.content {
  margin: 2.5vh auto;
  height: 60vh;
  border-top: 1px solid black;
  padding: 1.5rem;
  overflow: scroll;
  font-size: x-large;
  /* color: blue; */
}

.error {
  color: red;
}

[contentEditable='true']:empty:not(:focus):before {
  content: attr(data-text);
}
</style>