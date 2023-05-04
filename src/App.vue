<template>
  <header>
    <nav>
      <!--RouterLink to="/auth">Authorization</RouterLink-->
      <!-- revisar porque necesita actualizar, si hay que usar el getter-->

      <h2 v-if="user">{{ `Hi ${user.email}` }}</h2>
      <h2 v-else>To start the adventure enter your account!</h2>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
  <RouterView />
  <body>
  </body>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useTaskStore } from './stores/tasksStore'
import userStore from './stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'App',

  components: {},
  computed: {
    ...mapState(useTaskStore, ['listOfTasks', 'taskCount']),
    ...mapState(userStore, ['user', 'userCount','userEmail']),
  },
  methods: {
    ...mapActions(useTaskStore, ['_fetchAllTasks']),
    ...mapActions(userStore, ['_fetchUser'])
  },
  async created() {
    console.log('Created App View')
    console.log(this.user)
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
