<!-- This file is the parent to the vue page files.
This file contains the navigation bar and the router view. -->
<template>
  <q-layout view="hHh lpR fFf">

    <!-- In the q-header, the q-toolbar is the top bar with the logo and the user dropdown menu. -->
    <q-header elevated class="bg-primary text-accent" height-hint="98">
      <q-toolbar>
        <q-toolbar-title style="width: 100%; display: flex; align-items: center; margin-top: 10px;">
          <q-avatar style="transform: scale(1.2); margin-left: 10px;">
            <img src="https://preudbpdnhcigtnuiuit.supabase.co/storage/v1/object/public/images/pear.png?t=2023-11-29T20%3A24%3A30.885Z">
          </q-avatar>
          <div class="custom-hammersmith text-secondary" style="margin-left: 10px;">PantryPal</div>
        </q-toolbar-title>

        <!-- User profile button for logging out -->
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

      <!-- The q-tabs are the navigation tabs at the top of the page. -->
      <q-tabs align="center">
        <q-route-tab v-if="!isLoggedIn" to="/" label="Welcome" style="color: black;"/>
        <q-route-tab v-if="!isLoggedIn" to="/signin" label="Sign In" style="color: black;"/>
        <q-route-tab v-if="!isLoggedIn" to="/register" label="Register" data-cy="register-tab" style="color: black;"/>
        <q-route-tab v-if="isLoggedIn" to="/profile" label="Profile" style="color: black;"/>
        <q-route-tab v-if="isLoggedIn" to="/pantry" label="Pantry" style="color: black;"/>
        <q-route-tab v-if="isLoggedIn && userRole" to="/donate" label="Donate" style="color: black;"/>
      </q-tabs>
    </q-header>

    <!-- The vue pages are rendered here -->
    <q-page-container class="bg-image">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, onUpdated, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'src/lib/supabaseClient'

export default defineComponent({
  name: 'TabledLayout',

  setup () {
    const $q = useQuasar() // used for notifications
    const router = useRouter(); // used to redirect to other pages
    const isLoggedIn = ref(false) // used for conditional rendering
    const userEmail = ref(null) // used to display the user's email in the dropdown menu
    const userRole = ref(false); // used to store current user role

    // Checks for logged in user and sets the isLoggedIn variable that is used for conditional rendering
    const setLogInStatus = async () => {
      try {
        // get the logged in user with the current existing session
        const { data: { user } } = await supabase.auth.getUser()

        // if user is not null then isLoggedIn is true
        if (user) {

          const { data, error } = await supabase
          .from('Accounts')
          .select('Donation_Status')
          .eq('user_id', user.id);

          userEmail.value = user.email;
          isLoggedIn.value = true;

          if (data[0].Donation_Status) {
            userRole.value = true;
          } else {
            userRole.value = false;
          }
        }
        else {
          isLoggedIn.value = false;
          userEmail.value = null;
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error.message);
      }
    };

    // Logs out the user and redirects to the sign in page
    // called when user clicks the log out button
    const logOut = async () => {

      // Sign out from Supabase Auth
      let { error } = await supabase.auth.signOut()
      
      // no error so successful logout, notify user and redirect to sign in page
      if (!error) {
          isLoggedIn.value = false;
          userEmail.value = null;
          router.push('/signin')

          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Log out successful'
          })
        } 
      else { // error so notify user logout failed

          $q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Log out failed'
          })
      }
    };

    // when the component is updated or mounted, check if the user is logged in
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
      userRole,
      logOut,
    };
    
  },
  
})
</script>

<style>
  .bg-image {
    background-image: url("https://preudbpdnhcigtnuiuit.supabase.co/storage/v1/object/public/images/Gradient2.png?t=2023-12-01T19%3A31%3A08.969Z");
    background-size: cover;
  }
</style>
