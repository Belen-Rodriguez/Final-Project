<template>
    <h1>Auth View</h1>

    <RouterView />
    <RouterLink to="/auth/sign-in">Sign In</RouterLink>
    <p>    </p>
    <RouterLink to="/auth/sign-up">Sign Up</RouterLink>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
    name: 'AuthView',
    components: {

    }

};
</script>

<style scoped>
</style>