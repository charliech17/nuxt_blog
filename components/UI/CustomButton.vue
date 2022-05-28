<template>
  <section class="create_new_category">
    <!-- <NuxtLink :to="link">{{title}}</NuxtLink> -->
    <button @click="gotoPage(link)">{{title}}</button>
  </section>
</template>

<script>
export default {
    props:{
        title:{
            require:true,
            type:String
        },
        link:{
            require:false,
            type:String
        }
    },
    emits:['changeEdit'],
    methods:{
      gotoPage(link){
        if(!link){
          this.$emit('changeEdit');
          return;
        }
        this.$router.push(link);
      }
    }
}
</script>

<style scoped>
.create_new_category {
  margin: 1rem 0;
  text-align: center;
}

.create_new_category>button{
    padding: .5rem;
    font-weight: 800;
    background-color: black;
    color: white;
    border-radius: .5rem;
    text-decoration: none;
    cursor: pointer;
}
</style>