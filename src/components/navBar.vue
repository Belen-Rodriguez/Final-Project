<template>
  <nav class="navBar">
    <h3 class="personal-h3">Doït</h3>
    <p class="personal-p">{{ `Hi ${userName}` }}</p>
    <div class="container-button">
      <button
        type="submit"
        @click="_handleSignOut()"
        class="btn btn-primary rounded-pill btn-sm"
      >
        Sign Out
      </button>
    </div>
  </nav>
</template>

<script>
import userStore from '../stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'navBar',

  computed: {
    ...mapState(userStore, ['user']),

    userName() {
      const userNameE = this.user.email.split('@')
      return userNameE[0]
    }
  },

  methods: {
    ...mapActions(userStore, ['signOut']),

    async _handleSignOut() {
      await this.signOut()
      this.$router.push({ path: '/auth' })
    }
  }
}
</script>

<style scoped>
.navBar {
  padding: 0rem 3rem;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 55% 20% 15%;
  grid-column-gap: 5%;
  margin-bottom: 3rem;
  align-items: center;
}
.container-button {
  text-align: end;
}

.personal-p{
  text-align: end;
  margin: 0
}
.personal-h3{
  margin:0;
}
@media (max-width: 479px) {
  body {
    max-width: 480px;
  }
  .navBar {
  display: grid;
  grid-template-columns: 40% 30% 20%;
  grid-column-gap: 5%;
}
}

</style>
