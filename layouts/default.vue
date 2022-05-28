<template>
  <div>
    <TheHeader/>
    <Nuxt/>
  </div>
</template>

<script>
import TheHeader from '~/components/navbar/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
}
</script>