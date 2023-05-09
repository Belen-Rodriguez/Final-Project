<template>
  <!--SECTION 1 - TABLA TO DO LIST-->
  <section class="section1">
    <h1 class="personal-h1">Just Doït</h1>
    <div class="containerTable">
      <table>
        <tr v-for="task in showedList" :key="task.id" class="tableRow">
          <td>
            <input
              type="checkbox"
              :checked="task.is_complete"
              @change="_changeStatus(task, $event.target.checked)"
            />
          </td>
          <td v-if="task.id === selectedTaskId && openInputStatus">
            <div>
              <input
                type="text"
                v-model="newTitle"
                @keydown.enter="_changeDataStore(task, newTitle)"
                class="personal-p form-control rounded-pill"
              />
              <button
                @click="_changeDataStore(task, newTitle)"
                class="btn btn-outline-info rounded-pill"
              >
                Save
              </button>
            </div>
          </td>
          <td v-else class="personal-p">{{ task.title }}</td>

          <td class="cngBtn">
            <button @click="_deleteTask(task.title)" class="btn btn-outline-info rounded-circle">
              <i class="bi bi-x"></i>
            </button>
          </td>
          <td class="cngBtn">
            <button @click="_openInput(task)" class="btn btn-outline-info rounded-pill">
              Change
            </button>
          </td>
        </tr>
      </table>

      <!--Boton Añadir-->
      <div
        class="input-group buttonNew"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <input
          type="text"
          v-model="taskToAdd"
          @keydown.enter="_sendTaskStore(taskToAdd, user)"
          class="form-control rounded-pill"
          aria-describedby="btnGroupAddon"
        />
        <div class="btn-group" role="group">
          <button
            @click="_sendTaskStore(taskToAdd, user)"
            class="btn btn-primary rounded-pill btn-lg"
            id="btnGroupAddon"
          >
            New Task
          </button>
        </div>
      </div>
    </div>
    <!--SECTION 2 - TABLA DONE-->
  </section>
  <section class="section2">
    <div>
      <button @click="_openTaskDone()" class="btn btn-outline-light btn-lg rounded-pill">
        {{ msgShowDone }}
      </button>
    </div>
    <table v-if="taskDoneList" class="containerTableDelete">
      <tr v-for="task in showedListTrue" :key="task.id" class="tableRowDelete">
        <td>
          <input
            type="checkbox"
            :checked="task.is_complete"
            @change="_changeStatus(task, $event.target.checked)"
          />
        </td>
        <td class="personal-p white">{{ task.title }}</td>
        <td>
          <button @click="_deleteTask(task.title)" class="btn btn-outline-light rounded-circle">
            <i class="bi bi-x"></i>
          </button>
        </td>
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
      taskDoneList: false,
      msgShowDone: 'Show done tasks'
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
        this.msgShowDone = 'Hide done tasks'
      } else {
        this.taskDoneList = false
        this.msgShowDone = 'Show done tasks'
      }
    }
  }
}
</script>

<style scoped>
.section1 {
  height: auto;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: auto;
}

.tableRow {
  width: 60vw;
  display: grid;
  grid-template-columns: 5% 70% 5% 10%;
  grid-gap: 3%;
  line-height: 3rem;
}
.cngBtn {
  text-align: end;
}
.tableRowDelete {
  width: 60vw;
  display: grid;
  grid-template-columns: 5% 80% 10%;
  grid-gap: 2%;
  line-height: 3rem;
}
.section2 {
  margin-top: 3rem;
  padding: 3rem;
  min-height: 20rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-image: url(../assets/img3.wallspic.com-naranja-morado-violeta-rosa-arte-5120x2880.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.containerTableDelete {
  margin-top: 2rem;
}
h1 {
  margin-bottom: 3rem;
  font-size: 6rem;
  text-align: center;
}
.buttonNew {
  margin-top: 3rem;
  gap: 2rem;
}

@media (min-width: 480px) and (max-width: 770px) {
  h1 {
    font-size: 5rem;
  }
  .tableRow {
    display: grid;
    grid-template-columns: 5% 62% 8% 15%;
    grid-gap: 3%;
  }
}

@media (max-width: 479px) {
  body {
    max-width: 480px;
  }
  h1 {
    font-size: 3.5rem;
  }
  .tableRow {
    width: 80vw;
    display: grid;
    grid-template-columns: 5% 55% 10% 20%;
    grid-gap: 3%;
    line-height: 3rem;
  }
}
</style>
