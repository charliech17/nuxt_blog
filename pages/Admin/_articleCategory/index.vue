<template>
  <div>
    <h2 class="title">
      {{ $route.params.articleCategory }}
    </h2>
    <CustomButton title="新增學習類別" :link="`/Admin/${$route.params.articleCategory}/createNewArticle`"/>
    <AllArticles :isAdmin="true"/>
  </div>
</template>


<script>
import AllArticles from '@/components/article/AllArticles.vue'
export default {
  components: {
    AllArticles,
  },
}
</script>

<style scoped>
.title {
  text-align: center;
}
</style>