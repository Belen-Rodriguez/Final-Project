<template>

      <h2 v-if="user">{{ `Hi ${user.email}` }}</h2>
      <button type="submit" @click="_handleSignOut()">Sign Out</button>
      <tableTask />
</template>

<script>
import { useTaskStore } from '../stores/tasksStore'
import userStore from '../stores/userStore'
import { mapActions, mapState } from 'pinia'
import tableTask from '../components/taskTable.vue'

export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  components: {
    tableTask
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

    async _handleSignOut() {
      await this.signOut()
      this.$router.push({ path: '/auth' })
    },

  },
  async created() {
    console.log('Created Home View')
    await this._fetchAllTasks()
  }
}
</script>

<style scoped></style>
