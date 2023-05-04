<template>
  <button type="submit" @click="_handleSignOut()">Sign Out</button>
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
        <button @click="_changeDataStore(task, newTitle)">Save</button>
      </td>
      <td v-else>{{ task.title }}</td>
      <td><button @click="_deleteTask(task.title)">Delete</button></td>
      <td><button @click="_openInput(task)">Change</button></td>
      <td>
        <input
          type="checkbox"
          :checked="task.is_complete"
          @change="_changeStatus(task, $event.target.checked)"
        />
      </td>
    </tr>
  </table>
  <div>
    <input type="text" v-model="taskToAdd" @keydown.enter="_sendTaskStore(taskToAdd, user)"/>
    <button @click="_sendTaskStore(taskToAdd, user)">New Task</button>
    <label for="name">Add New Task! </label>
  </div>
  <div>
    <button @click="_openTaskDone()">Show tasks done</button>
  </div>
  <table v-if="taskDoneList">
    <tr v-for="task in showedListTrue" :key="task.id">
      <td>{{ task.title }}</td>
      <td><button @click="_deleteTask(task.title)">Delete</button></td>
      <td>
        <input
          type="checkbox"
          :checked="task.is_complete"
          @change="_changeStatus(task, $event.target.checked)"
        />
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
      openInputStatus: false,
      selectedTaskId: '',
      taskDone: 'FALSE',
      newTitle: '',
      openInputAddStatus: false,
      taskDoneList: false
    }
  },

  computed: {
    ...mapState(useTaskStore, ['listOfTasks']),
    ...mapState(userStore, ['user']),
    showedList() {
      return this.listOfTasks.filter((task) => task.is_complete === false)
    },
    showedListTrue() {
      return this.listOfTasks.filter((task) => task.is_complete === true)
    }
  },

  methods: {
    ...mapActions(useTaskStore, [
      '_fetchAllTasks',
      '_addNewTask',
      '_deleteTask',
      '_changeTask',
      '_changeStatus'
    ]),
    ...mapActions(userStore, ['signOut']),

    async _handleSignOut() {
      await this.signOut()
      this.$router.push({ path: '/auth' })
    },

    _sendTaskStore(taskToAdd, user) {
      this._addNewTask(taskToAdd, user.id)
      this.taskToAdd = ''
    },

    _openInput(task) {
      if (!this.openInputStatus) {
        this.openInputStatus = true
        this.selectedTaskId = task.id
      } else {
        this.openInputStatus = false
        this.selectedTaskId = ''
      }
    },
    _changeDataStore(task, newTitle) {
      this._changeTask(task, newTitle)
      this.newTitle = ''
      this.openInputStatus = false
      this.selectedTaskId = ''
    },
    _openTaskDone() {
      if (!this.taskDoneList) {
        this.taskDoneList = true
      } else {
        this.taskDoneList = false
      }
    }
  },
  async created() {
    console.log('Created Home View')
    await this._fetchAllTasks()
  }
}
</script>

<style scoped></style>
