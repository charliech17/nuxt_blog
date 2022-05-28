<template>
  <div>
    <section class="buttons">
      <CustomButton title="新增學習類別" link="/Admin/createNewCategory" />
      <CustomButton title="編輯學習類別" @changeEdit="isEdit = !isEdit" />
    </section>
    <ArticleCategory :isAdmin="true" :isEdit="isEdit" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false,
    }
  },
  middleware:'checkAuth'
}
</script>

<style scoped>
.buttons {
  text-align: center;
  background-color: azure;
}

.buttons > section {
  display: inline-block;
  margin: 2.5vh 2.5vw;
}

.create_new_category {
  margin: 1rem 0;
  text-align: center;
}

.create_new_category > a {
  padding: 0.5rem;
  font-weight: 800;
  background-color: black;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
}
</style>