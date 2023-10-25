<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Pantry Pal
        </q-toolbar-title>

        <div>Fall 2023 - CEN2031 - Group 15</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
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
    icon: 'school',
    link: '#/'
  },
  {
    title: 'Profile',
    caption: 'Your profile.',
    icon: 'public',
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
    icon: 'chat',
    link: '#/signUp'
  },
  {
    title: 'Pantry',
    caption: 'Find food here.',
    icon: 'record_voice_over',
    link: '#/pantry'
  },
  {
    title: 'Fill Pantry',
    caption: 'Post your food as in the pantry.',
    icon: 'rss_feed',
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
  }
})
</script>
