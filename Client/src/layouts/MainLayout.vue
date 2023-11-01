<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-accent">
        <q-btn
          
          dense
          color="secondary"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $route.meta.title }}
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
                <q-item-section>{{ userName }}</q-item-section>
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
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered

      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <EssentialLink
              v-for="link in essentialLinks"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="~/assets/PantryPal-Logo.png" style="height: 150px">
        </q-img>
        
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Start here if you are new.',
    icon: 'help',
    link: '#/'
  },
  {
    title: 'Pantry',
    caption: 'Find food here.',
    icon: 'inbox',
    link: '#/pantry'
  },
  {
    title: 'Fill Pantry',
    caption: 'Post your food as in the pantry.',
    icon: 'star',
    link: '#/fillPantry'
  },
  {
    title: 'Profile',
    caption: 'Your profile.',
    icon: 'settings',
    link: '#/profile'
  },
  {
    title: 'Sign In',
    caption: 'Log in here.',
    icon: 'code',
    link: '#/signIn'
  },
  {
    title: 'Register',
    caption: 'New user registration.',
    icon: 'send',
    link: '#/register'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const isLoggedIn = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      isLoggedIn,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  // this is blending in optoins api, need to fix
  data () {
    return {
      userName: 'John Doe'


    }
  }
})
</script>
