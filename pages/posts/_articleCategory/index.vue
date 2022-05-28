<template>
  <div>
    <h2 class="title">
      {{ $route.params.articleCategory }}
    </h2>
    <AllArticles :isAdmin="false"/>
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