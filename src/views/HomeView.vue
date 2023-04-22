<template>
  <p>Home View</p>
  <p v-for="task in listOfTasks" :key="task.id">{{ task.title }} </p>
  <button @click="_addNewTask({ title: 'New task', userId: '9805ccb2-40cf-4413-ad8c-64ff7fbfeb5c'})">Add task in supabase</button>
</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import { mapActions, mapState } from 'pinia'


export default {
  name: 'HomeView',
  computed: {
    ...mapState(useTaskStore, ['listOfTasks'])
  },
  methods: {
    ...mapActions(useTaskStore, ['_addNewTask'])
  },
  
}
</script>

<style scoped></style>
