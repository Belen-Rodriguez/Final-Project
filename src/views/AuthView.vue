<template>
    <div class="container-auth">
    <RouterView />
    <RouterLink to="/auth/sign-in" class="links">Sign In</RouterLink>
    <RouterLink to="/auth/sign-up" class="links">Sign Up</RouterLink>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
    name: 'AuthView',
    components: {
        RouterLink,
        RouterView
    }

};
</script>
<style scoped>
h2 {
    text-align: center;
    color:rgba(20, 35, 30, 0.479);
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