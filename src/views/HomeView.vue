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
    <tr v-for="task in listOfTasks" :key="task.id">
      <td v-if="task.id === selectedTaskId && openInputStatus">
        <input type="text" v-model="newTitle"/>
      </td>
      <td v-else>{{ task.title }}</td>
      <td>
        <button @click="_deleteTask(task.title)">Delete</button>
      </td>
      <td>
        <button @click="_openInput(task)">Change</button>
        <!-- <button @click="_changeTask(task) ">Change</button>-->
      </td>
      <td>
        <input type="checkbox" :v-model="taskDone = true"/>
      </td>
    </tr>
  </table>

  <div>
    <!-- <input v-if="openInputStatus" type="text" v-model="taskChanged" @keydown.enter="_changeTask({title: taskChanged, id: selectedTaskId})" /> 
    form@submit.prevent>
    -->
    <input
      type="text"
      v-model="taskToAdd"
      @keydown.enter="_addNewTask({ title: taskToAdd, user_id: userID })"
    />
    <label for="name">Add New Task! </label>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'HomeView',
  data() {
    return {
      taskToAdd: '',
      totalItems: [],
      userID: '9805ccb2-40cf-4413-ad8c-64ff7fbfeb5c',
      openInputStatus: false,
      selectedTaskId: '',
      taskDone: false,
      newTitle: '',
    }
  },

  computed: {
    ...mapState(useTaskStore, ['listOfTasks'])
  },
  methods: {
    ...mapActions(useTaskStore, ['_addNewTask', '_deleteTask', '_changeTask']),

    _openInput(task) {
      if (!this.openInputStatus) {
        this.openInputStatus = true
        this.selectedTaskId = task.id

      } else {
        this.openInputStatus = false
        this.selectedTaskId = ''
        this._changeTask(task, this.newTask)
      }
      console.log(task)
      console.log(this.selectedTask)
      console.log(this.openInputStatus)
    }
  }
}
</script>

<style scoped></style>
