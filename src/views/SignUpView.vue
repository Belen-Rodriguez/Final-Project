<template>
    <h1>Sign Up View</h1>
    <form @submit.prevent>
      <div>
      <label for="email" >Email</label><br>
      <input v-model="userEntered" type="email" id="email" name="email" placeholder="Enter your email">
      </div>
      <div>
      <label for="password">Password</label><br>
      <input v-model="passwordEntered" type="password" id="password" name="password">
      </div>
      <div>
      <label for="confirmPassword">Password</label><br>
      <input v-model="confirmPasEntered" type="password" id="confirmPassword" name="password">
      <button @click="_sendNewUserToStore(userEntered,passwordEntered, confirmPasEntered)" type="submit">Create Accoount!</button>
      </div>
  
    </form>
  </template>
  
  <script>
  import { useUserStore } from '../stores/userStore'
  import { mapActions, mapState } from 'pinia'
  
  export default{
      name: 'SignUpView',
      data(){
          return{
              userEntered: '',
              passwordEntered: '',
              confirmPasEntered: '',
          }
      },
      components: {
      },
      computed: {
      ...mapState(useUserStore, ['user']),
      },
      methods: {
      ...mapActions(useUserStore, ['signUp']),
  
      _sendNewUserToStore(userEntered, passwordEntered, confirmPasEntered) {
            if(passwordEntered === confirmPasEntered) {
          this.signUp(userEntered, passwordEntered) 
          this.userEntered = ''
          this.passwordEntered = ''
          this.confirmPasEntered = ''
        console.log('created account!')}
        console.log('account no created');
          return
      }
      }
  }
</script>

<style scoped></style>
