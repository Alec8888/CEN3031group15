<template>
  <q-page>
    <div class = "q-pa-md text-h3 text-primary" >
      PantryPal
    </div>

    <div class = "q-pa-md text-body1" >
      A food donation platform.
    </div>

    <div class="q-pa-md qgutter-sm">
      <q-btn color="primary" glossy label="Sign In" to="signin" />
    </div>

    <div class="q-pa-md qgutter-sm">
      <q-btn color="secondary" glossy label="Sign up" to="register" />
    </div>

    <img
      alt="PantryPal logo"
      src="~assets/PantryPal-Logo.png"
      style="width: 700px; height: 700px"
    >

    
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
