import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('user', {
    state: () => ({
        user: undefined,
    }),
   /*  getters: {
       userCount(state) {
            return state.user
        },
        userIdSupabase(state){
            return state.user.id
        },
        userEmail(state){
            return state.user.email
        }
    },*/
    actions: {

        async _fetchUser() {
            const { data: { user } } = await supabase.auth.getUser()
            /* if (error) {
               console.error(error)
               return;
             } 
           */
            console.log(user);
            this.user = user
        },

        async signIn(userEntered, passwordEntered) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: userEntered,
                password: passwordEntered,
            })
            if (error) {
                console.error(error)
                return;
            }
            console.log("data store user ", data)
            this.user = data.user
            console.log("user store user", this.user)
        },

        async signOut() {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error(error)
                return;
            }
            this.user = null
            console.log(this.user)
        },

        async signUp(userEntered, passwordEntered) {

            const { data, error } = await supabase.auth.signUp({
                email: userEntered,
                password: passwordEntered,
            })
            if (error) {
                console.error(error)
                return;
            }
            console.log(data)
            this.user = data.user
        }


    }
})

/*
            email: 'belerguez@gmail.com',
            password: '0306BelenR92',

            email: 'belenrodiguez@ironhack.com'
            password: 'belenrodriguez'
            */

