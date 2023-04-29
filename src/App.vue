<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">Authorization</RouterLink>
      <button @click="signOut()">Sign Out</button>

         <!-- revisar porque necesita actualizar, si hay que usar el getter-->

      <h2 v-if="userCount">{{ `${user.email}` }}</h2>
      <h2 v-else>To start the adventure enter your account!</h2>
    </nav>
  </header>
  <RouterView />
  <body>
  </body>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
// import { mapStores } from 'pinia'

import { useTaskStore } from './stores/tasksStore'
import { useUserStore } from './stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'App',

  components: {},
  computed: {
    // ...mapStores(useTaskStore), esto sirve para traerse la store entera
    ...mapState(useTaskStore, ['listOfTasks', 'taskCount']),
    ...mapState(useUserStore, ['user', 'userCount']),
  },
  methods: {
    ...mapActions(useTaskStore, ['_fetchAllTasks']),
    ...mapActions(useUserStore, ['_fetchUser','signOut'])
  },
  async created() {
    console.log('Created App View')
    await this._fetchAllTasks()
    await this._fetchUser()
    console.log(this.user)
    console.log(this.user.id)
  },
}



</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
