<template>
      <h2 v-if="user">{{ `Hi ${user.email}` }}</h2>
    <h2 v-else>Sign in to start adventure!</h2>
  <div class="container-sign">
    <form @submit.prevent class="container-form-sign">
      <div>
        <label for="email">Email</label><br />
        <input
          v-model="userMail"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <p v-if="isValidEmail === false" class="inValid">Invalid email address</p>

      <div>
        <label for="password">Password</label><br />
        <input v-model="passwordEntered" type="password" id="password" name="password" />
        <div class="d-grid d-md-flex justify-content-md-center">
        <button class="btn btn-outline-info" @click="_sendUserToStore(userMail, passwordEntered)" type="submit">Log in!</button>
      </div>
      </div>
    </form>
    <p v-if="errorMsg !== false" class="inValid">{{ errorMsg }}</p>
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
      }
      catch (error){
        console.log(error)
        this.errorMsg = 'Invalid credentials, please enter your details again.'
      }

    }
  }
}
</script>

<style scoped>
.inValid {
  color: darkred;
}
.container-sign {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
.container-form-sign {
  width: 20rem;
  text-align: center;
  margin-top: 1rem;
}
input {
  width: 100%;
}
button {
  display: block;
  margin: 1rem;
  padding: 0.2rem 1rem;
 
}
</style>
