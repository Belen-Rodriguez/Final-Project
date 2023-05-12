<template>
    <!--SIGN UP - Intro -->
  <div class="contenedorSign">
  <h1 class="personal-h1">Start your organized life</h1>
  <h2 class="personal-h2">Doït · Achieve your goals ·</h2>
  <p class="personal-p">
    Doït is a new to-do-list app that will help you to organice your time better and achive your
    goals.
  </p>
  <!--Botones Sign In y Sign UP -->
  <div class="containerBtnS">
    <RouterLink to="/auth/sign-in" class="btn btn-outline-info rounded-pill mt-2"
      >Sign In</RouterLink
    >
    <RouterLink to="/auth/sign-up" class="btn btn-outline-info rounded-pill mt-2"
      >Sign Up</RouterLink
    >
  </div>
  <!--Forulario -->
  <div class="container-sign">
    <form @submit.prevent class="sing-upIn-form">
      <div class="container-email">
        <div>
          <label for="email" class="personal-p">Email</label>
          <input
            v-model="userMail"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            class="form-control"
          />
        </div>
        <div v-if="isValidEmail === false" class="inValid">Invalid email address</div>
        <div>
          <label for="password" class="personal-p">Password</label>
          <input
            v-model="passwordEntered"
            type="password"
            id="password"
            name="password"
            class="form-control"
          />
        </div>
        <div v-if="isStrongPassword === false" class="inValid">The password is weak</div>
        <div>
          <label for="confirmPassword" class="personal-p">Confirm password</label>
          <input
            v-model="confirmPasEntered"
            type="password"
            id="confirmPassword"
            name="password"
            class="form-control"
          />
        </div>
        <div v-if="pasworNoMach" class="inValid">Passwords don't match</div>
      </div>
      <!--Boton Create account -->
      <button
        @click="_sendNewUserToStore(userMail, passwordEntered)"
        type="submit"
        class="btn btn-outline-info btn-lg rounded-pill 
         mb-3 btnCreateA"
      >
        Create Accoount
      </button>
    </form>
    <p v-if="errorMsg !== false" class="inValid">{{ errorMsg }}</p>
  </div>
</div>
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
      errorMsg: '',
      pasworNoMach: ''
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

    async _sendNewUserToStore(userMail, passwordEntered) {
      this.startValidation = true
      if (
        this.passwordEntered !== this.confirmPasEntered
      ) { this.pasworNoMach = "Password don't match"}
      if (
        this.isValidEmail === true &&
        this.isStrongPassword === true &&
        this.isPasswordConfirmed === true
      ) {
        try {
          await this.signUp(userMail, passwordEntered)
          alert('Succesful registration')
          this.$router.push({ path: '/' })
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
.contenedorSign {
  padding: 3rem 3rem 0rem 3rem;
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
.containerBtnS{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem
  }
  .btnCreateA{
    margin-top: 2rem;
  }
@media (min-width: 480px) and (max-width: 770px) {

h1 {
  font-size: 6.5rem;
  padding: 0rem 3rem 1.5rem;
}
.personal-p{
  padding: 0rem 0rem 1rem
}
}
@media (max-width: 479px) {
  body {
    max-width: 480px;
  }
  .personal-h1 {
    font-size: 4rem;
    margin-top: 1rem;
  }
  .container-sign {
    margin-top: 1.5rem;
  }
  .contenedorSign {
  padding: 3rem 3rem 0rem 3rem;
}
  .containerBtnS {
    margin-top: 2rem;
  }
  .inputEmail {
    width: 20rem;
  }
  .sing-upIn-form {
    width: 90%;
  }
  .btnCreateA{
    margin-top: 1.5rem;
  }
}

</style>
