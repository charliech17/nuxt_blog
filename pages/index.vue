<template>
  <div>
    <section class="index_img">
      <img src="~assets/img/index_photo.jpg" />
    </section>
    <ArticleCategory :isAdmin="false" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.index_img {
  width: 100%;
  max-height: 70vh;
}

.index_img > img {
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  /* object-position: center; */
}
</style>