<template>
  <div class="all_category_section">
    <NuxtLink
      v-for="(category, index) in allArticles"
      :key="index"
      class="category_background"
      :to="gotoPage(category.id)"
    >
      <section class="category_img">
        <img
          :src="`https://source.unsplash.com/random/1920x1081?sig=${index}`"
          width="640"
          height="360.33"
        />
      </section>
      <section class="preview_text">
        <h2 class="title">{{ category.article.articleTitle }}</h2>
        <p v-html="category.article.articleContents"></p>
      </section>
    </NuxtLink>
    <p v-if="allArticles.length === 0">目前尚無文章</p>
    <section class="line" v-else></section>
  </div>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  data() {
    return {
      article: [
        {
          title: '學習到了學習到了學習到了學習到了學習到了',
          previewText: '真的很棒',
          id: '123',
        },
        {
          title: '學習到了!!!',
          previewText:
            '真的很棒!!!Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse officia quam pariatur dignissimos, odit nulla. Facere vero alias itaque necessitatibus ad reprehenderit ipsam fuga ipsa eligendi delectus quo, minus ratione.',
          id: '456',
        },
      ],
    }
  },
  computed: {
    allArticles() {
      return this.$store.getters['useFirebase/getAllArticles']
    },
  },
  beforeMount() {
    this.$store.dispatch('useFirebase/fetchArticles', {
      articleCategory: this.$route.params.articleCategory,
    })
  },
  methods: {
    gotoPage(id) {
      return this.isAdmin
        ? {
            path: `/Admin/${this.$route.params.articleCategory}/createNewArticle`,
            query: { id },
          }
        : `/posts/${this.$route.params.articleCategory}/${id}`
    },
  },
}
</script>

<style scoped>
.title{
  padding: .5rem;
}

.all_category_section {
  display: flex;
  flex-wrap: wrap;
}

.all_category_section > * {
  text-decoration: none;
  color: black;
}

.category_background {
  /* background-color: white; */
  background-color: rgb(255, 255, 255);
  /* box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5); */
  list-style: none;
  margin: 5vh auto;
  text-align: center;
}

.category_img {
  width: 80vw;
  margin: 0 auto;
  background-color: rgb(0, 0, 0);
}

.category_img > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview_text {
  border-bottom: 1px solid #c6c6c6;
  word-break: break-all;
}

.preview_text > p {
  max-height: 5vh;
  overflow: hidden;
  padding: 2rem;
}

.line {
  display: none;
}

@media (min-width: 750px) {
  .all_category_section {
    position: relative;
  }

  .category_background {
    display: flex;
    max-width: 1000px;
  }

  .category_img {
    flex: 2;
    z-index: 2;
    width: 60vw;
  }
  .category_img > img {
    object-fit: cover;
    object-position: center;
  }

  .preview_text {
    flex: 1.2;
    border: 1px solid #eaeaea;
    z-index: 1;
    /* width: 25vw; */
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  a:nth-child(odd) > .preview_text {
    /* transform: translateX(30px); */
    padding-right: 3rem;
    transform: translate(-3rem, 2rem);
  }

  a:nth-child(odd) > .preview_text > * {
    transform: translateX(3rem);
    padding: 0 1rem;
  }

  a:nth-child(odd) > .preview_text {
  }

  a:nth-child(even) {
    flex-direction: row-reverse;
  }

  a:nth-child(even) > .preview_text {
    /* transform: translateX(30px); */
    padding-left: 3rem;
    transform: translate(3rem, 2rem);
  }

  a:nth-child(even) > .preview_text > * {
    transform: translateX(-3rem);
    padding: 0 1rem;
  }

  .line {
    display: block;
    min-height: 100vh;
    height: 100%;
    border: 1px solid #eaeaea;
    position: absolute;
    top: 5vh;
    left: 50%;
  }
}
</style>