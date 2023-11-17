<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-accent" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/PantryPal-Logo.png">
          </q-avatar>
          PantryPal
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
              <q-item clickable to="/home">
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
        <q-route-tab v-if="isLoggedIn" to="/home" label="Home" />
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
import EssentialLink from 'src/components/EssentialLink.vue'
import { defineComponent, onUpdated, ref } from 'vue'
import { onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'TabledLayout',

  setup () {
    const $q = useQuasar()
    const token = ref(null)
    const payload = ref(null)
    const router = useRouter();
    const isLoggedIn = ref(false)
    const userEmail = ref(null)
    const setLogInStatus = async () => {
        
      try {
        //Fetch the token from local storage
        token.value = $q.localStorage.getItem('token');

        if (!token.value) throw new Error('No token found');

        payload.value = JSON.parse(atob(token.value.split('.')[1]));

        if(token.value)
        {
          userEmail.value = payload.value.email;
          isLoggedIn.value = true;
        }
       else {
          userEmail.value = null;
          isLoggedIn.value = false;
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        // Handle the error according to your app's requirements
        // For example, you may want to set isLoggedIn to false or redirect the user
      }

    }


    // need to move this to a differnt lifecyce hook
    setLogInStatus();
    
    const logOut = async () => {
      console.log('Log out clicked.');
      let response = await fetch('http://localhost:3000/currentUser', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "",
          isLogged: false
        }),
      });
      if (response.ok) {
        // Clear the JWT from localStorage
        localStorage.removeItem('token');

        setLogInStatus();

        // Optionally, redirect the user to the login page
        
        router.push('/signin')
        } 
      else {
          console.error('Logout failed');
      }
    }

    onUpdated( () => {
      setLogInStatus();
    })

    return {
      isLoggedIn,
      setLogInStatus,
      userEmail,
      logOut
  
    }
    
  },
  
})
</script>

<style>
  .bg-image {
    background-image: url('../assets/bg2.png');
    background-size: cover;
  }

</style>
