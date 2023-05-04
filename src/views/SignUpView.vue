<template>
  <h4>Create your account</h4>
  <form @submit.prevent>
    <div>
      <p>{{ isValidEmail }}</p>
      <label for="email">Email</label><br />
      <input
        v-model="userMail"
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
      />
    </div>
    <div v-if="isValidEmail === false" class="inValid">Invalid email address</div>
    <div>
      <label for="password">Password</label><br />
      <input v-model="passwordEntered" type="password" id="password" name="password" />
    </div>
    <div v-if="isStrongPassword === false" class="inValid">The password is weak!</div>
    <div>
      <label for="confirmPassword">Confirm password</label><br />
      <input v-model="confirmPasEntered" type="password" id="confirmPassword" name="password" />
    </div>
    <button @click="_sendNewUserToStore(userMail, passwordEntered)" type="submit">
      Create Accoount!
    </button>
  </form>
  <p v-if="errorMsg !== false" class="inValid">{{ errorMsg }}</p>
</template>

<script>
import userStore from '../stores/userStore'
import { useTaskStore } from '../stores/tasksStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'SignUpView',
  data() {
    return {
      startValidation: false,
      userMail: '',
      passwordEntered: '',
      confirmPasEntered: '',
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
    },

    isStrongPassword() {
      return this.startValidation
        ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(this.passwordEntered)
        : null
    },

    isPasswordConfirmed() {
      return this.startValidation ? this.passwordEntered === this.confirmPasEntered : null
    }
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    ...mapActions(useTaskStore, ['_fetchAllTasks']),

    async _sendNewUserToStore(userMail, passwordEntered) {
      this.startValidation = true
      if (
        this.isValidEmail === true &&
        this.isStrongPassword === true &&
        this.isPasswordConfirmed === true
      ) {
        try {
          await this.signUp(userMail, passwordEntered)
          alert('Succesful registration')
          this.userMail = ''
          this.passwordEntered = ''
          this.confirmPasEntered = ''
        } catch (error) {
          console.log(error)
          this.errorMsg = 'Invalid account, please enter your details again.'
        }
      }
    }
  }

  //:class="{ valid : isPasswordConfirmed == true , inValid : isPasswordConfirmed == false }"
}
</script>

<style scoped>
.valid {
  background-color: white;
}

.inValid {
  color: darkred;
}
</style>
