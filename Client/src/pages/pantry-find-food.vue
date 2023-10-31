<template>
  <q-page padding>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">{{ organization[0] }}</div>
          <div class="text-subtitle2">{{streetAddress[0]}}</div>
          <div class="text-subtitle2">{{csz[0]}}</div>
        </q-card-section>

        <q-card-section>
          {{ food }}
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat @click="reserveFood">Reserve</q-btn>
          <q-btn flat @click="contact">Contact</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">{{ organization[1] }}</div>
          <div class="text-subtitle2">{{streetAddress[1]}}</div>
          <div class="text-subtitle2">{{csz[1]}}</div>
        </q-card-section>

        <q-card-section>
          {{ food }}
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat @click="reserveFood">Reserve</q-btn>
          <q-btn flat @click="contact">Contact</q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'pantry-find-food',
  data () {
    return {
      organization: ['Panera', "Chilie's", 'Chipotle'],
      streetAddress: ['1200 Some Street Dr.', '1234 Another Street Dr.', '5678 Yet Another Street Dr.'],
      csz: ['33453 Tampa FL', '33454 Tampa FL', '33455 Tampa FL'],
      food: 'Such and such food is available.'
    }
  },
  methods: {
    async reserveFood () {
      console.log('Reserve food button clicked.');
    },
    async contact () {
      console.log('Contact button clicked.');
    }
  }
})
</script>
