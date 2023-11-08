<template>
  <q-page class="q-gutter-md" style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px;">
      <img
        alt="PantryPal logo"
        src="~assets/Cropped-Pantry-Pal-Logo.png"
        style="max-width: 60%; height: auto; margin-bottom: 10px; margin-top: 100px"
      >
    </div>
    <div class="text-h7 q-mb-md">
      <div class="welcome-text custom-hammersmith">
        Welcome to Pantry Pal, your go-to food donation web app designed with a mission to make a difference! 
        Here at Pantry Pal, we're passionate about connecting local community organizations with donation centers, 
        empowering them to collaborate seamlessly in the fight against food waste. Created by a team of dedicated 
        students from the University of Florida, our app is a testament to our commitment to reducing food waste 
        and alleviating hunger in the United States. With Pantry Pal, you join a community-driven initiative aimed 
        at fostering meaningful connections, promoting sustainability, and making a positive impact on the lives 
        of those in need. Together, let's create a world where no one goes hungry, and where surplus food finds 
        its way to those who need it the most. Thank you for joining us!
      </div>
    </div>
  </q-page>
</template>

<style scoped>

.welcome-text {
  text-align: center;
  padding: 0 10vw;
  margin-bottom: 50px;
}

.custom-hammersmith {
  font-family: 'Hammersmith One', sans-serif;
  font-size: 2em;
  font-weight: normal;
}
</style>

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
