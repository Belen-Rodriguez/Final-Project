<template>
  <!--SECTION 1 - TABLA TO DO LIST-->
  <section class="section1">
    <h1 class="personal-h1">Doït List</h1>
    <div class="containerTable">
      <h2 v-if="showedList.length === 0 " class="personal-h2">Add you a new task here!</h2>
      <table>
        <tr v-for="task in showedList" :key="task.id" class="tableRow">
          <!--Check-->
          <td>
            <input
              type="checkbox"
              :checked="task.is_complete"
              @change="_changeStatus(task, $event.target.checked)"
            />
          </td>
          <!--Tarea-->
          <td v-if="task.id === selectedTaskId && openInputStatus">
            <div class="btnInputSave">
              <input
                type="text"
                v-model="newTitle"
                @keydown.enter="_changeDataStore(task, newTitle)"
                class="personal-p form-control rounded-pill"
              />
              <!--Boton Save-->
              <button
                @click="_changeDataStore(task, newTitle)"
                class="btn btn-outline-info rounded-pill"
              >
                Save
              </button>
            </div>
          </td>
          <td v-else class="personal-p">{{ task.title }}</td>
          <!--Boton 3 puntosMobil-->
          <div class="containerChangeDelete">
            <td class="abrirMenu">
              <button @click="_openMenu(task)" class="btn btn-outline-info rounded-circle btn-sm">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
            </td>
            <!--Boton Delete-->

            <td :class="`cngBtn ${_showBtn(task)}`">
              <button @click="_deleteTask(task.title)" class="btn btn-outline-info rounded-pill MvlDCButton">
               {{ titleDelete }} <i v-if="!titleDelete" class="bi bi-x"></i>
              </button>
            </td>
            <!--Boton Cambiar-->
            <td :class="`cngBtn ${_showBtn(task)}`">
              <button @click="_openInput(task)" class="btn btn-outline-info rounded-pill MvlDCButton">
                Change
              </button>
            </td>
          </div>
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
    <!--Boton Tareas-->
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
        <!--Boton Delete-->
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
      msgShowDone: 'Show done tasks',
      mobileBtnStatus: true,
      titleDelete: ''
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
    },
    screenMobile() {
      return document.body.clientWidth < 479 ? true : false
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
    },
    _openMenu(task) {
      this.mobileBtnStatus = !this.mobileBtnStatus
      if (this.mobileBtnStatus === false) {
        this.selectedTaskId = task.id
      } else {
        this.selectedTaskId = ''
      }

      console.log(this.mobileBtnStatus)
      console.log(this.showButtonsDC)
    },
    _showBtn(task) {
      if (this.mobileBtnStatus === false && this.selectedTaskId === task.id) {
        this.titleDelete = 'Delete'
        return 'visible'
      } else {
        this.titleDelete = ''
        return ''
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
.section2 {
  width: 100%;
  margin-top: 3rem;
  padding: 3rem 3rem 6rem 3rem;
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
h1 {
  margin-bottom: 3rem;
  font-size: 6rem;
  text-align: center;
}
h2{
  text-align: center;
  font-size: 2rem;
}
.containerTable{
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
}
.containerTableDelete {
  margin-top: 2rem;
}

table {
  width: 50vw;
  margin: auto;
}
.tableRowDelete {
  width: 60vw;
  margin: auto;
  display: grid;
  grid-template-columns: 5% 80% 10%;
  grid-gap: 2%;
  line-height: 3rem;
}

.buttonNew {
  margin-top: 3rem;
  gap: 2rem;
}
.abrirMenu {
  display: none;
}

td {
  padding: 0.5rem;
  vertical-align: baseline;
}
.btnInputSave {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.containerChangeDelete {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
}
tr td:first-child {
  text-align: left;
}

tr td:nth-child(2) {
  text-align: left;
}

tr td:nth-child(3) {
  text-align: left;
}
tr td:nth-child(4) {
  text-align: left;
}
tr td:last-child {
  text-align: right;
}

@media (min-width: 480px) and (max-width: 770px) {
  h1 {
    font-size: 5rem;
    margin-top: 1rem;
  }
  table {
  width: 60vw;
}
.containerTable{
  min-height: 25rem;
}
.section2{
  height: auto;
  min-height: 30rem;
}
}
@media (max-width: 479px) {
  body {
    max-width: 480px;
  }
  h1 {
    font-size: 3.5rem;
  }

  table {
    width: 80vw;
  }
  .tableRowDelete {
    width: 80vw;
  }
  .section1 {
    width: 80%;
  }
  .section2{
  height: auto;
  min-height: 22rem;
}

  .cngBtn {
    display: none;
  }
  .abrirMenu {
    display: block;
  }
  .cngBtn.visible {
    display: block;
  }
  .containerChangeDelete {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
  }
  .MvlDCButton{
    width: 6rem;
  }


}
</style>
