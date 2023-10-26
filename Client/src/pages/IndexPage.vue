<template>
  <q-page>
    <img
      alt="PantryPal logo"
      src="~assets/PantryPal-Logo.png"
      style="width: 700px; height: 700px"
    >

    <div class = "q-pa-md text-h3 text-primary" >
      PantryPal
    </div>

    <div class = "q-pa-md text-body1" >
      A food pantry management system.
    </div>

    <div class="q-pa-md qgutter-sm">
      <q-btn color="primary" glossy label="Sign In" to="signUp" />
    </div>

    <div class="q-pa-md qgutter-sm">
      <q-btn color="secondary" glossy label="Sign up" to="signUp" />
    </div>
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      // dataFromOracle: []

    }
  }
})
</script>
