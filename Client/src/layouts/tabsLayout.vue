<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-accent" height-hint="98">
      <q-toolbar>
        <q-toolbar-title style="width: 100%; display: flex; align-items: center; margin-left: 10px;">
          <q-avatar style="transform: scale(1.2); margin-left: 10px;">
            <img src="~assets/PantryPal-Logo.png">
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
              <q-item clickable @click="logOut">
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
        <q-route-tab v-if="!isLoggedIn" to="/register" label="Register" />
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


export default defineComponent({
  name: 'TabledLayout',

  setup () {
    const router = useRouter();
    const isLoggedIn = ref(false)
    const userEmail = ref(null)
    const setLogInStatus = async () => {
      let response = await fetch('http://localhost:3000/currentUser', {
        method: 'GET'
      });
      let data = await response.json();
      // if there is a current user, then set isLoggedIn to true
      console.log(data)
      console.log('current user: ' + data.email);
      console.log('isLogged: ' + data.isLogged);
      if (data.isLogged) {
        userEmail.value = data.email;
        isLoggedIn.value = true;
      }
      else {
        userEmail.value = null;
        isLoggedIn.value = false;
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
