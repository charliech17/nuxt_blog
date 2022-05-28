<template>
  <div class="all_contents">
    <section class="brand_img"><img src="~assets/img/logo.png" /></section>
    <TheNavigater class="navigater" />
    <NavbarCollapse class="navbar_collapse" />
  </div>
</template>

<script>
import TheNavigater from '~/components/navbar/TheNavigater.vue'
import NavbarCollapse from '~/components/navbar/NavbarCollapse.vue'
export default {
  components: {
    TheNavigater,
    NavbarCollapse,
  },
}
</script>

<style scoped>
.all_contents {
  height: 10vh;
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand_img {
  width: 6vh;
  height: 6vh;
  text-align: center;
  line-height: 5vh;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  margin: 0 1rem;
  background-color: white;
  opacity: 0.8;
}

.brand_img > img {
  width: 100%;
  height: 100%;
}



@media (min-width: 750px) {
  .navbar_collapse {
    display: none;
  }
}

@media (max-width: 750px) {
  .navigater {
    display: none;
  }
}
</style>