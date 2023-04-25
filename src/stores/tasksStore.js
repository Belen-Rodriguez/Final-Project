
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
    /*  addTask(newTask){
        this.listOfTasks.push(newTask)
      },*/


    async _fetchAllTasks() {
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


    async _addNewTask({ title, user_id }) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, user_id })
        .select()

      if (error) {
        console.error(error);
        return;
      }

      this.listOfTasks.push(...data)
      this.taskToAdd = ''
      console.log(data)
      console.log(this.taskToAdd)
    },


    async _deleteTask(taskTitle) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('title', taskTitle)

      if (error) {
        console.error(error);
        return;
      }

      const indexToDelete = this.listOfTasks.findIndex(task => task.title === taskTitle)
      this.listOfTasks.splice(indexToDelete, 1)
    },


    async _changeTask(task, newTitle) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: newTitle })
        .eq('id', task.id)
        .select()
    
    if (error) {
      console.error(error);
      return;
    }
    const indexToChange = this.listOfTasks.indexOf(task)
    this.listOfTasks[indexToChange] = data[0]
    console.log(...data)
  }
}
})