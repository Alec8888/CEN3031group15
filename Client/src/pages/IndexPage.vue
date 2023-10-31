<template>
  <q-page padding>
    <div class="q-gutter-lg">
      <q-btn push color="primary" label="Sign In" text-color="accent" to="signin"/>      
    </div>

    <div class = "text-body1 q-mt-md" >
      A food donation platform.
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
