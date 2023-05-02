<template>
  <div class="container-sign">
    <h4>Sign In your Account!</h4>
    <form @submit.prevent class="container-form-sign">
      <div>
        <label for="email">Email</label><br />
        <input
          v-model="userEntered"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label for="password">Password</label><br />
        <input v-model="passwordEntered" type="password" id="password" name="password" />
        <button @click="_sendUserToStore(userEntered, passwordEntered)" type="submit">
          Log in!
        </button>
      </div>
    </form>
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
      userEntered: '',
      passwordEntered: ''
    }
  },
  components: {},
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    ...mapActions(useTaskStore, ['_fetchAllTasks']),
  

    async _sendUserToStore(userEntered, passwordEntered) {
      await this.signIn(userEntered, passwordEntered)
      this.$router.push({path: '/'})
      this.userEntered = ''
      this.passwordEntered = ''
    }
    
  }
}
</script>

<style scoped>
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
input{
  width: 100%;
}
button {
  display: block;
  margin: 1rem;
  padding: 0.2rem 1rem;
  text-decoration: none;
  color: rgba(82, 147, 126, 0.479);
  background-color: white;
  border: 2px;
  border-color:  rgba(82, 147, 126, 0.479);
  font-size: 1.5rem;
}
</style>
