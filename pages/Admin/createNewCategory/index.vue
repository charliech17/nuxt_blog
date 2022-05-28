<template>
  <div class="page_contents">
    <div class="inner_contents">
      <section class="title">
        <label>學習類別</label>
        <input
          v-model="newCategory"
          type="text"
          placeholder="  vue、python、docker.."
        />
      </section>
      <section class="image_src">
        <label>圖片網址</label>
        <input
          v-model="imageUrl"
          type="text"
          placeholder="請輸入圖片網址"
          @input="imageError = false"
        />
      </section>
      <section>
        <div class="preview_image">
          <img :src="imageUrl" />
        </div>
      </section>
      <section v-if="isError">
        <p class="error">只接受"jpg及png格式的圖片"，且學習類別不為空白</p>
      </section>
      <section class="button_control">
        <button @click="updateCategory">確定</button>
      </section>
    </div>
  </div>
</template>

<script>
import writeUserData from '@/assets/js/firebase/writeUserData.js'

export default {
  data() {
    return {
      imageUrl: '',
      isError: false,
      newCategory: '',
      routeQuery:{},
    }
  },
  created() {
    this.routeQuery = this.$route.query
    if (this.routeQuery.categoryTitle) {
      this.newCategory = this.routeQuery.categoryTitle
      this.imageUrl = this.routeQuery.imageUrl
    }
  },
  methods: {
    updateCategory() {
      //  得到imageType
      const imageString = this.imageUrl.split('.')
      const imageType = imageString[imageString.length - 1]

      //  所有可接受的Type，將判斷錯誤設為false
      const acceptImageTypes = ['jpg', 'jpeg', 'png']
      this.isError = false

      //  判斷是否可接受type
      if (
        !acceptImageTypes.includes(imageType) ||
        this.newCategory.trim() === ''
      ) {
        this.isError = true;
        return;
      }

      //  寫入firebase中
      writeUserData({
        category: this.newCategory,
        imageUrl: this.imageUrl,
        routeQuery: this.routeQuery
      }).then(() => {
        this.$router.replace('/Admin')
      })
    },
  },
}
</script>

<style scoped>
.page_contents {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 90vh;
}

.inner_contents {
  background-color: antiquewhite;
  width: fit-content;
  margin: 0.5rem auto;
  padding: 5vh;
  border-radius: 1rem;
}

.title,
.image_src {
  text-align: center;
  padding: 0.5rem;
}

.title > input,
.image_src > input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 30vw;
}

.title > label,
.image_src > label {
  margin-right: 0.5rem;
}

.preview_image {
  width: 60vw;
  background-color: black;
  height: 30vh;
  margin: 2vh auto;
  border-radius: .5rem;
}

.preview_image > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.button_control {
  text-align: center;
  padding: 1rem;
}

.button_control > button {
  padding: 0.5rem;
  width: 20vw;
  /* border: none; */
  font-size: 1rem;
  border-radius: .5rem;
  background-color: white;
}

.error {
  color: red;
}

@media (min-width:750px) {
  .preview_image{
    width: 40vw;
  }

  .preview_image > img{
    object-fit: cover;
  }

  .button_control > button {
    font-size: 2rem;
  }
}
</style>