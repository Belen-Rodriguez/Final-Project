
import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    listOfTasks: [],
  }),
  getters: {
    taskCount(state) {
      return state.listOfTasks.length
    }
    /*  listDoneTask(state){
  return state.listOfTasks.filter(task => task.is_complete === false)
},
listToDoTask(state) {
  return state.listOfTasks.filter(task => task.is_complete === true)
} */

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

      this.listOfTasks.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      })
    },


    async _addNewTask(taskToAdd, userID) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title: taskToAdd, user_id: userID })
        .select()

      if (error) {
        console.error(error);
        return;
      }

      this.listOfTasks.push(...data);
      console.log(data)

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

    },

    async _changeStatus(task, taskDone) {
      console.log(taskDone)
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: taskDone })
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