<template>
  <section>
    <NuxtLinks :inputClass="'links'" />
  </section>
</template>

<script>
import NuxtLinks from '@/components/navbar/NuxtLinks.vue'
export default {
  components: {
    NuxtLinks,
  },
}
</script>