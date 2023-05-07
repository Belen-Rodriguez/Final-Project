<template>
  <div class="contenedorSign">
  <h1 class="personal-h1">Sign in to start adventure</h1>
  <h2 class="personal-h2">Doït · Achieve your goals ·</h2>
  <p class="personal-p">
    Doit is a new to-do-list app that will help you to organice your time better and achive your
    goals.
  </p>
  <div class="d-grid gap-2 d-sm-flex justify-content-center">
    <RouterLink to="/auth/sign-in" class="btn btn-outline-info rounded-pill mt-2"
      >Sign In</RouterLink
    >
    <RouterLink to="/auth/sign-up" class="btn btn-outline-info rounded-pill mt-2"
      >Sign Up</RouterLink
    >
  </div>

  <div class="container-sign">
    <form @submit.prevent class="sing-upIn-form">
      <div class="container-email">
        <div>
          <label for="email" class="personal-p">Email</label><br />
          <input
            v-model="userMail"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            class="form-control"
          />
        </div>
        <p v-if="isValidEmail === false" class="inValid">Invalid email address</p>

        <div>
          <label for="password" class="personal-p">Password</label><br />
          <input
            v-model="passwordEntered"
            type="password"
            id="password"
            name="password"
            class="form-control"
          />
          <div class="d-grid d-md-flex justify-content-md-center">
            <button
              class="btn btn-outline-info btn-lg rounded-pill mt-5 mb-3"
              @click="_sendUserToStore(userMail, passwordEntered)"
              type="submit"
            >
              Log in!
            </button>
          </div>
        </div>
      </div>
    </form>
    <p v-if="errorMsg !== false" class="inValid">{{ errorMsg }}</p>
  </div>
</div>
</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import userStore from '../stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'SignInView',
  data() {
    return {
      startValidation: false,
      userMail: '',
      passwordEntered: '',
      errorMsg: ''
    }
  },
  components: {},
  computed: {
    ...mapState(userStore, ['user']),

    isValidEmail() {
      return this.startValidation
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userMail)
        : null
    }
  },
  methods: {
    ...mapActions(userStore, ['signIn']),

    async _sendUserToStore(userMail, passwordEntered) {
      this.startValidation = true
      try {
        await this.signIn(userMail, passwordEntered)
        this.$router.push({ path: '/' })
        this.userMail = ''
        this.passwordEntered = ''
      } catch (error) {
        console.log(error)
        this.errorMsg = 'Invalid credentials, please enter your details again.'
      }
    }
  }
}
</script>

<style scoped>

.contenedorSign{
  padding: 3rem;
}

h2 {
  margin-top: 2.5rem;
}
.sing-upIn-form {
  width: 30%;
  line-height: 3rem;
}
.container-email {
  text-align: start;
  margin-bottom: 0.5rem;
}
.valid {
  background-color: white;
}

.inValid {
  color: darkred;
}

.container-sign {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1{
  margin-top: 5rem;
}
</style>
