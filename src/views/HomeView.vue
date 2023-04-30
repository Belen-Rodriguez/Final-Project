<template>
  <p>Home View</p>
  <button type= "submit" @click="signOut()">Sign Out</button>
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
      <td>
        <input type="checkbox" :check="task.is_complete" @change="_changeStatus(task, 'TRUE')" />
      </td>
    </tr>
  </table>

  <div>
    <input
      type="text"
      v-model="taskToAdd"
      @keydown.enter="_sendTaskStore(taskToAdd, this.userIdSupabase)"
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
      <td>
        <input type="checkbox" :check="task.is_complete" @change="_changeStatus(task, 'FALSE')" />
      </td>
    </tr>
  </table>
</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import userStore from '../stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'HomeView',
  data() {
    return {
      taskToAdd: '',
      totalItems: [],

     // userID: 'ebef0852-0634-4cfb-9fd2-10e3cb84bb47',
      openInputStatus: false,
      selectedTaskId: '',
      taskDone: 'FALSE',
      newTitle: '',
      openInputAddStatus: false
    }
  },

  computed: {
    ...mapState(useTaskStore, ['listOfTasks']),
    ...mapState(userStore, ['user', 'userIdSupabase']),
    showedList(){
      return this.listOfTasks.filter(task => task.is_complete === false)
    },
    showedListTrue(){
      return this.listOfTasks.filter(task => task.is_complete === true)
    }

  },

  methods: {
    ...mapActions(useTaskStore, ['_fetchAllTasks','_addNewTask', '_deleteTask', '_changeTask', '_changeStatus']),
    ...mapActions(userStore, ['signOut']),
    
    async created() {
      console.log('Created Home View')
      await this._fetchAllTasks()
    },

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
