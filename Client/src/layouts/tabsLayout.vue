<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-accent" height-hint="98">
      <q-toolbar>
        <q-toolbar-title style="width: 100%; display: flex; align-items: center; margin-left: 10px;">
          <q-avatar style="transform: scale(1.2); margin-left: 10px;">
            <img src="https://preudbpdnhcigtnuiuit.supabase.co/storage/v1/object/public/images/PantryPal-Logo.png?t=2023-11-19T00%3A56%3A02.143Z">
          </q-avatar>
          <div class="custom-hammersmith" style="margin-left: 10px;">PantryPal</div>
        </q-toolbar-title>


        <div class="q-gutter-sm">
          <q-btn
            v-if="!isLoggedIn"
            color="secondary"
            label="Sign In"
            to="signin"
             >
          </q-btn>
          <q-btn
            v-if="!isLoggedIn"
            color="secondary"
            label="Register"
            to="register"
             >
          </q-btn>
        </div>

        <div>
          <q-btn
          data-cy="user-btn"
            v-if="isLoggedIn"
            color="secondary"
            icon="account_circle"
             >
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list style="min-width: 100px">
              <q-item clickable to="/profile">
                <q-item-section>{{ userEmail }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="logOut" data-cy="logout-btn">
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        </div>

      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab v-if="!isLoggedIn" to="/" label="Welcome" />
        <q-route-tab v-if="!isLoggedIn" to="/signin" label="Sign In" />
        <q-route-tab v-if="!isLoggedIn" to="/register" label="Register" data-cy="register-tab" />
        <q-route-tab v-if="isLoggedIn" to="/profile" label="Profile" />
        <q-route-tab v-if="isLoggedIn" to="/pantry" label="Pantry" />
        <q-route-tab v-if="isLoggedIn" to="/donate" label="Donate" />
      </q-tabs>
    </q-header>

    <q-page-container class="bg-image">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, onUpdated, ref } from 'vue'
import { onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'src/lib/supabaseClient'
import { compileScript } from 'vue/compiler-sfc'


export default defineComponent({
  name: 'TabledLayout',

  setup () {
    const $q = useQuasar()
    const router = useRouter();
    const isLoggedIn = ref(false)
    const userEmail = ref(null)
    const setLogInStatus = async () => {
        
      try {
        // Get current user from Supabase session
        console.log("attempting to get user from supa session")

        // get the logged in user with the current existing session
        const { data: { user } } = await supabase.auth.getUser()
        
        // get the logged in user with JWT, not working
        // const { data: { user } } = await supabase.auth.getUser(jwt)
        
        // recomended for faster results but it's not working
        // const { data: { user }} = await supabase.auth.getSession().session.user 

        console.log("user from supa: " + user.email)

        userEmail.value = user.email;
        isLoggedIn.value = true;
  
      } catch (error) {
        console.error('Failed to fetch current user:', error.message);
        
        userEmail.value = null;
        isLoggedIn.value = false;
      }

    }

    const logOut = async () => {
      console.log('Log out clicked.');

      // Sign out from Supabase Auth
      let { error } = await supabase.auth.signOut()
      
      if (!error) {
          console.log('Logout successful');

          isLoggedIn.value = false;
          userEmail.value = null;
          router.push('/signin')

          q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Log out successful'
          });
        } 
      else {
          console.error('Logout failed');

          q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Log out failed'
          });
      }
    }

    onUpdated( () => {
      setLogInStatus();
    }),
    onMounted( () => {
      setLogInStatus();
    })

    return {
      isLoggedIn,
      setLogInStatus,
      userEmail,
      logOut,
    }
    
  },
  
})
</script>

<style>
  .bg-image {
    background-image: url("https://preudbpdnhcigtnuiuit.supabase.co/storage/v1/object/public/images/bg.png?t=2023-11-19T00%3A53%3A40.968Z");
    background-size: cover;
  }
</style>
