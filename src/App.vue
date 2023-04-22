<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/auth">Authorization</RouterLink>
      </nav>
  </header>
  <RouterView />
  <body>
    <ul>
      <li v-for="task in tasksStore.tasks">{{ task }}
      </li>
    </ul>
    <p>{{ tasksStore.taskCount }}</p>
    <button @click="tasksStore.addTask('NewTask')">Add</button>
  </body>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { useTaskStore } from './stores/tasksStore'
import { mapStores } from 'pinia';
export default {
    name: 'App',
    components: {
        
    },
    computed: {
      ...mapStores(useTaskStore)
    }
};
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
