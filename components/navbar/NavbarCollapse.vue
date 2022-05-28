<template>
  <div>
    <section class="menu" @click="handleMenuOpen">
      <div></div>
      <div></div>
      <div></div>
    </section>
    <section v-if="navbarOpen" class="sidenav" >
      <div class="rightnav">
        <ul class="menu_list" @click="handleMenuOpen">
          <NuxtLinks/>
        </ul>
      </div>
      <div class="backdrop" @click="handleMenuOpen"></div>
    </section>
  </div>
</template>


<script>

import NuxtLinks from '@/components/navbar/NuxtLinks.vue'
export default {
  components:{NuxtLinks},
  data() {
    return {
      navbarOpen: false,
    }
  },
  methods: {
    handleMenuOpen() {
      this.navbarOpen = !this.navbarOpen;
    },
  },
}
</script>

<style scoped>
.menu {
  background-color: rgb(0, 0, 0);
  height: 8vh;
  width: 12vw;
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.menu:active,
.menu:hover {
  border: 5px solid blue;
  transform: translateX(5px);
}

.menu > * {
  width: 100%;
  height: 0.2rem;
  background-color: white;
  /* margin: 2vh; */
}

.rightnav {
  min-height: 100vh;
  width: 30%;
  z-index: 10000;
  background-color: rgb(248, 247, 246);
  position: fixed;
  right: 0;
  top: 0;
}

.backdrop {
  min-height: 100vh;
  width: 100%;
  z-index: 1000;
  background-color: rgb(26, 24, 24);
  position: fixed;
  right: 0;
  top: 0;
  opacity: 0.8;
}

 .menu_list{
    margin: 0;
    padding: 0;
}
</style>