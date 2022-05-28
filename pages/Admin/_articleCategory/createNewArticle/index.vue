<template>
  <div>
    <CreateArticles />
  </div>
</template>

<script>
import CreateArticles from '@/components/article/CreateArticles.vue'

export default {
  components: {
    CreateArticles,
  },
}
</script>

<style scoped>
.title_input {
  margin: 2.5vh 0;
  text-align: center;
}

.content {
  margin: 2.5vh auto;
  width: 80%;
  height: 60vh;
  border: 1px solid black;
  padding: 1rem;
  overflow: scroll;
}

.upload {
  text-align: center;
}

.upload > button {
  padding: 0.5rem;
}

.error {
  color: red;
}
</style>