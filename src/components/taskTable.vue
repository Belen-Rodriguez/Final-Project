<template>
  <!--SECTION 1 - TABLA TO DO LIST-->
  <section class="section1">
    <h1 class="personal-h1">Just Doït</h1>
    <div class="container-table">
    <table>
      <tr v-for="task in showedList" :key="task.id">
        <td>
          <input
            type="checkbox"
            :checked="task.is_complete"
            @change="_changeStatus(task, $event.target.checked)"
          />
        </td>
        <td v-if="task.id === selectedTaskId && openInputStatus">
          <input type="text" v-model="newTitle" @keydown.enter="_changeDataStore(task, newTitle)" />
          <button
            @click="_changeDataStore(task, newTitle)"
            class="btn btn-outline-info rounded-pill"
          >
            Save
          </button>
        </td>
        <td v-else>{{ task.title }}</td>
        <td>
          <button @click="_deleteTask(task.title)" class="btn btn-outline-info rounded-pill">
            D
          </button>
        </td>
        <td>
          <button @click="_openInput(task)" class="btn btn-outline-info rounded-pill">
            Change
          </button>
        </td>
      </tr>
    </table>
    <div>
      <input type="text" v-model="taskToAdd" @keydown.enter="_sendTaskStore(taskToAdd, user)" />
      <button @click="_sendTaskStore(taskToAdd, user)">New Task</button>
    </div>
  </div>
    <!--SECTION 2 - TABLA DONE-->
  </section>
  <section class="section2">
    <div>
      <button @click="_openTaskDone()" class="btn btn-outline-light btn-lg rounded-pill">Show tasks done</button>
    </div>
    <table v-if="taskDoneList">
      <tr v-for="task in showedListTrue" :key="task.id">
        <td>
          <input
            type="checkbox"
            :checked="task.is_complete"
            @change="_changeStatus(task, $event.target.checked)"
          />
        </td>
        <td>{{ task.title }}</td>
        <td><button @click="_deleteTask(task.title)">Delete</button></td>
      </tr>
    </table>
  </section>
</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import userStore from '../stores/userStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'taskTable',
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
    ...mapActions(useTaskStore, ['_addNewTask', '_deleteTask', '_changeTask', '_changeStatus']),

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
  }
}
</script>

<style scoped>
.section1{
  height: auto;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: auto
}

.container-table{

}

table tr{
  width: 100%;
  display: grid;
  grid-template-columns: 5% 60% 10% 30%;
  grid-gap:5%;
  line-height: 3rem;
}
.section2{
  margin-top: 4rem;
  padding: 4rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-image: url(../assets/img3.wallspic.com-naranja-morado-violeta-rosa-arte-5120x2880.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

h1{
  margin-bottom: 3rem;
  font-size: 6rem;
}
</style>
