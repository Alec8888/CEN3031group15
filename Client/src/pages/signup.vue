<template>
  <q-page padding>
    
    <div class="text-h5 text-primary">
      Sign up page
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input v-model="text" label="Name" :dense="dense" />
        <q-input v-model="text" label="Organization Name" :dense="dense" />
        <q-input v-model="text" label="Email" :dense="dense" />
        <q-input v-model="text" label="Password" :dense="dense" />
        <q-input v-model="text" label="Confirm Password" :dense="dense" />
        <q-input v-model="text" label="Street Address" :dense="dense" />
        <q-input v-model="text" label="City" :dense="dense" />
        <q-input v-model="text" label="State" :dense="dense" />
        <q-input v-model="text" label="Zip" :dense="dense" />
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-radio v-model="foodDonation" val="donate" label="Donate food." />
        <q-radio v-model="foodDonation" val="pickup" label="Pick up donated food." />
      </div>
    </div>

    <div class="q-pa-md qgutter-sm">
      <q-btn color="secondary" glossy label="Sumbmit" @click="createAccount" />
    </div>
    

  </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
   name: 'signUp',
   setup () {
      return {
        foodDonation: ref('')
      }
   },
   methods: {
    async createAccount () {
         console.log('Sign up button clicked.');
      }
   }
})
</script>
