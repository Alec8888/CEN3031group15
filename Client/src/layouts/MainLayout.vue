<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          
          dense
          
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Pantry Pal
        </q-toolbar-title>

        <q-btn 
          color="primary"
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

        <q-img class="absolute-top" src="~/assets/PantryPal-Logo.png" style="height: 200px">
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
    title: 'Sign Up',
    caption: 'New user registration.',
    icon: 'send',
    link: '#/signUp'
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
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data () {
    return {
      userName: 'John Doe'

    }
  }
})
</script>
