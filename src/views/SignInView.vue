<template>
  <h1>Sign In View</h1>
  <form @submit.prevent>
    <div>
    <label for="email" >Email</label><br>
    <input v-model="userEntered" type="email" id="email" name="email" placeholder="Enter your email">
    </div>
    <div>
    <label for="password">Password</label><br>
    <input v-model="passwordEntered" type="text" id="password" name="password">
    <button @click="_sendUserToStore(userEntered,passwordEntered)" type="submit">Log in</button>
    </div>

  </form>
</template>

<script>
import { useUserStore } from '../stores/userStore'
import { mapActions, mapState } from 'pinia'

export default{
    name: 'SignInView',
    data(){
        return{
            userEntered: '',
            passwordEntered: '',
        }
    },
    components: {
    },
    computed: {
    ...mapState(useUserStore, ['user']),
    },
    methods: {
    ...mapActions(useUserStore, ['signIn']),

    _sendUserToStore(userEntered, passwordEntered) {
        this.signIn(userEntered, passwordEntered)
        this.userEntered = ''
        this.passwordEntered = ''
    }
    }
}
</script>

<style scoped></style>
