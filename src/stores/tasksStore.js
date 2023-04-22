
import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
      tasks: ['tarea1','tarea2','tarea3']
  }),
  getters: {
    taskCount(state) {
      return state.tasks.length
    }

  },
  actions: {
    addTask(newTask){
      this.tasks.push(newTask)
    }
  }
  })