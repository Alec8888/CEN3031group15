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
          v-if="isLoggedIn"
            color="secondary"
            icon="account_circle"
             >
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>{{ currentUser }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        </div>

      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/account" label="Home" />
        <q-route-tab to="/pantry" label="Pantry" />
        <q-route-tab to="/donate" label="Donate" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default {
  name: 'TabledLayout',

  setup () {
    const isLoggedIn = ref(true)
    const currentUser = ref('Current User')

    return {
      isLoggedIn,
      currentUser
    }
  }
}
</script>