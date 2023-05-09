<template>

    <div class="container-auth">
    <RouterView />
    <footerView />
    </div>

</template>

<script>
import { RouterView } from 'vue-router'
import { mapState } from 'pinia'
import userStore from '../stores/userStore'
import footerView from '../components/footerView.vue'

export default{
    name: 'AuthView',
    components: {
        RouterView,
        footerView
    },
    computed: {
    ...mapState(userStore, ['user']),
  },

};
</script>
<style scoped>
h2 {
    text-align: center;
}
.container-auth{
    align-items: center;
    text-align: center;
}
.links{
    margin: 1rem;
    padding: 0.2rem 1rem;
    text-decoration: none;
    background-color: rgba(129, 228, 195, 0.479);
    color:rgba(20, 35, 30, 0.479);
    border-radius: 45%;
}

</style>