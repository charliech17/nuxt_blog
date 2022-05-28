<template>
  <div :class="inputClass">
    <NuxtLink exact to="/">home</NuxtLink>
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLink to="/Admin">admin</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    inputClass: {
      require: true,
      type: String,
      default:'menu_list'
    },
  },
}
</script>

<style scoped>
.menu_list > * {
  list-style: none;
  text-decoration: none;
  text-align: center;
  font-weight: 800;
  color: black;
  font-size: 1.5rem;
  margin: 1rem 0;
  display: block;
}

.links {
  display: flex;
  gap: 0.5rem;
}

.links > * {
  text-decoration: none;
  color: white;
  margin: 0 0.5rem;
  font-size: 1.5rem;
}

.nuxt-link-active {
  color: rgb(224, 103, 103);
}
</style>