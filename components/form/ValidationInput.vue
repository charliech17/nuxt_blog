<template>
  <ValidationProvider v-slot="{ errors }" :rules="inputType.type==='text'?'email':'length'">
    <label class="title">{{ inputType.title }}</label>
    <input v-model="getValue" :type="inputType.type" :id="inputType.id"/>
    <p class="error_message">{{ errors[0] }}</p>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'

extend('length', (value) => {
  if (value.length < 6) {
      return 'Must excess 6 characters'
  }
    return true;
})

extend('email', (value) => {
  if(!value.includes('@')){
      return 'must use email type'
  }
    return true;
})

export default {
  components: {
    ValidationProvider,
  },
  props: {
    inputType: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      getValue: '',
    }
  },
}
</script>

<style scoped>
.error_message {
  color: brown;
  text-align: right;
}

.title{
    margin: 0 .5rem;
    padding: .5rem;
}

.title+input{
    padding: .5rem;
    border-radius: .5rem;
    border: 1px solid black;
}
</style>