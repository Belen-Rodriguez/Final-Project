<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">Authorization</RouterLink>
    </nav>
  </header>
  <RouterView />
  <body>
   <!-- <ul>
      <li v-for="task in listOfTasks">{{ task }}</li>
    </ul>
    <p>{{ taskCount }}</p>
    <button @click="addTask('NewTask')">Add</button> -->
  </body>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
// import { mapStores } from 'pinia'

import { useTaskStore } from './stores/tasksStore'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'App',

  components: {},
  computed: {
    // ...mapStores(useTaskStore), esto sirve para traerse la store entera
    ...mapState(useTaskStore, ['listOfTasks', 'taskCount'])
  },
  methods: {
    ...mapActions(useTaskStore, ['_fetchAllTasks'])
  },
  created() {
    console.log('Created App View')
    this._fetchAllTasks()
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
