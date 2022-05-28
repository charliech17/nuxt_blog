<template>
  <div class="loginBackground">
    <h2 class="title">
      {{ isLogin ? '登入' : '註冊' }}
    </h2>
    <ValidationInput
      :inputType="{ title: '登入帳號', type: 'text', id: 'login_account' }"
    />
    <ValidationInput
      :inputType="{ title: '登入密碼', type: 'password', id: 'login_password' }"
    />
    <ValidationInput
      v-if="!isLogin"
      :inputType="{
        title: '確認密碼',
        type: 'password',
        id: 'confirm_password',
      }"
    />
    <section>
      <p v-if="error" class="error_message">再次檢查表單有否錯誤</p>
    </section>
    <div class="signin_buttons">
      <button @click="handleConfirm">{{ isLogin ? '登入' : '註冊' }}</button>
      <button @click="changePage">
        {{ isLogin ? '前往註冊' : '前往登入' }}
      </button>
    </div>
  </div>
</template>

<script>
import ValidationInput from '@/components/form/ValidationInput.vue'

export default {
  components: {
    ValidationInput,
  },
  data() {
    return {
      password: '',
      account: '',
      isLogin: true,
      error: false,
    }
  },
  methods: {
    handleConfirm() {
      this.error = false
      const account = document.querySelector('#login_account').value
      const password = document.querySelector('#login_password').value

      //  確認是否有error
      if (!account.includes('@') || password.length < 6) {
        this.error = true;
        return
      }

      console.log(true)
    },
    changePage() {
      this.isLogin = !this.isLogin
    },
  },
}
</script>

<style scoped>
.title {
  text-align: center;
}

.error_message {
  color: brown;
  text-align: right;
  font-size: .5rem;
}

.loginBackground {
  width: fit-content;
  padding: 0.5rem;
  margin: 5rem auto;
  background-color: rgb(128, 131, 131);
  border-radius: 0.5rem;
}

.signin_buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.signin_buttons > button {
  background-color: black;
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}
</style>