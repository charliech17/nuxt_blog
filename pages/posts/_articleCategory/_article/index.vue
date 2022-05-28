<template>
  <div>
    <h2 class="title">{{ articleTitle }}</h2>
    <section class="information">
      <p>
        文章分類:
        <b class="boldText">{{ $route.params.articleCategory }}</b>
      </p>
      <p>
        作者: <b class="boldText">{{ articleAuthor }}</b>
      </p>
      <p>
        時間: <b class="boldText">{{ articleTime }}</b>
      </p>
    </section>
    <section class="article_contents">
      <p v-html="articleContents"></p>
    </section>
  </div>
</template>

<script>
import getUserData from '@/assets/js/firebase/getUserData.js'
export default {
  data() {
    return {
      articleTitle: '',
      articleAuthor: '',
      articleContents: '',
      articleTime: '',
      articleId: '',
    }
  },
  async created() {
    const articleCategory = this.$route.params.articleCategory
    this.articleId = this.$route.params.article

    const articleInformation = await getUserData({
      path: `${articleCategory}/articles/${this.articleId}`,
    })

    this.articleTitle = articleInformation.articleTitle
    this.articleAuthor = articleInformation.articleAuthor
    this.articleTime = articleInformation.writeTime
    this.articleContents = articleInformation.articleContents
  },
}
</script>

<style scoped>
.title {
  text-align: center;
  padding: .5rem;
}

.information {
  background-color: rgb(193, 235, 235);
  padding: .5rem;
}

.article_contents {
  margin: 2rem 1.5rem;
  /* font-size: 1.5rem; */
  word-wrap: break-word;
  white-space: pre-wrap;
}

@media (min-width: 750px) {
  .information {
    display: flex;
    background-color: aqua;
    justify-content: center;
    width: 80%;
    margin: auto;
  }

  .information > * {
    margin: auto 1rem;
    /* white-space: pre-wrap; */
  }

  .title{
      font-size: 3rem;
  }
}
</style>