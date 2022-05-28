<template>
  <div>
    <h2 class="title">Learning Share</h2>
    <section class="intro_section">
      <p class="intro_text">
        Everyone can share your progress in learning program here!!
      </p>
    </section>
  </div>
</template>

<script>
export default {
    name: 'AboutPage',
}
</script>

<style scoped>
.title {
  text-align: center;
}

.intro_section{
    background-color: aliceblue;
    min-height: 50vh;
}

.intro_text {
  white-space: pre-wrap;
  margin: 0 0.5rem;
}
</style>