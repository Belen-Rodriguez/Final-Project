<template>
    <navBar/>
    <tableTask />
    <footerView />

</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import userStore from '../stores/userStore'
import { mapActions, mapState } from 'pinia'
import tableTask from '../components/taskTable.vue'
import navBar from '../components/navBar.vue'
import footerView from '../components/footerView.vue'

export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  components: {
    tableTask,
    navBar,
    footerView
  },

  computed: {
    ...mapState(useTaskStore, ['listOfTasks']),
    ...mapState(userStore, ['user']),

  },

  methods: {
    ...mapActions(useTaskStore, [
      '_fetchAllTasks'
    ]),
    ...mapActions(userStore, ['signOut']),

  },
  async created() {
    console.log('Created Home View')
    await this._fetchAllTasks()
  }
}
</script>

<style scoped>
</style>
