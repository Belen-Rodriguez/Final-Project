
import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
      listOfTasks: []
  }),
  getters: {
    taskCount(state) {
      return state.listOfTasks.length
    }

  },
  actions: {
    addTask(newTask){
      this.listOfTasks.push(newTask)
    },
    async _fetchAllTasks(){
      const { data, error } = await supabase
      .from('tasks')
      .select();

      if (error) {
        console.error(error)
        return;
      }
      console.log(data);
      this.listOfTasks = data
    },
    async _addNewTask({ title, userId }){
      const { data, error } = await supabase
      .from('tasks')
      .insert({ title, user_id: userId })
      .select()

      if (error) {
        console.error(error);
        return;
      }

      this.listOfTasks.push(...data)
      console.log(data)
    }
  }
  })