<template>
  <p>Home View</p>
  <table>
    <tr>
      <th>To Do List</th>
    </tr>
    <tr>
      <th>Task</th>
      <th>Delete</th>
      <th>Change</th>
    </tr>
    <tr v-for="task in showedList" :key="task.id">
      <td v-if="task.id === selectedTaskId && openInputStatus">
        <input type="text" v-model="newTitle" @keydown.enter="_changeDataStore(task, newTitle)" />
      </td>
      <td v-else>{{ task.title }}</td>
      <td><button @click="_deleteTask(task.title)">Delete</button></td>
      <td><button @click="_openInput(task)">Change</button></td>
      <td><input type="checkbox" :check="task.is_complete" @change="_changeStatus(task, 'TRUE')" /></td>
    </tr>
</table>

<div>
    <input
      type="text"
      v-model="taskToAdd"
      @keydown.enter="_sendTaskStore(taskToAdd, userID)"
    />
    <label for="name">Add New Task! </label>
  </div>

<table>
  <tr>
      <th>Task done!</th>
    </tr>
    <tr v-for="task in showedListTrue" :key="task.id">
      <td>{{ task.title }}</td>
      <td><button @click="_deleteTask(task.title)">Delete</button></td>
      <td><input type="checkbox" :check="task.is_complete" @change="_changeStatus(task, 'FALSE')" /></td>
    </tr>
</table>


</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import { useUserStore } from '../stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'HomeView',
  data() {
    return {
      taskToAdd: '',
      totalItems: [],
      // importar la store y traer el id del usuario
      userID: 'c1e063bf-86b4-47b4-8022-365515f542da',
      openInputStatus: false,
      selectedTaskId: '',
      taskDone: 'FALSE',
      newTitle: '',
      openInputAddStatus: false
    }
  },

  computed: {
    ...mapState(useTaskStore, ['listOfTasks']),
    ...mapState(useUserStore, ['user']),
    showedList(){
      return this.listOfTasks.filter(task => task.is_complete === false)
    },
    showedListTrue(){
      return this.listOfTasks.filter(task => task.is_complete === true)
    }

  },

  methods: {
    ...mapActions(useTaskStore, ['_addNewTask', '_deleteTask', '_changeTask', '_changeStatus']),

    _sendTaskStore(taskToAdd, userID) {
      this._addNewTask(taskToAdd, userID)
      this.taskToAdd = '';
    },
    
    _openInput(task) {
      if (!this.openInputStatus) {
        this.openInputStatus = true
        this.selectedTaskId = task.id
      } else {
        this.openInputStatus = false
        this.selectedTaskId = ''
      }
      console.log(task)
      console.log(this.selectedTask)
      console.log(this.openInputStatus)
      console.log(this.showedList)
    },
    _changeDataStore(task, newTitle){
      this._changeTask(task, newTitle)
      this.newTitle = ''
      this.openInputStatus = false
        this.selectedTaskId = ''
    }
  
  }
}
</script>

<style scoped></style>


