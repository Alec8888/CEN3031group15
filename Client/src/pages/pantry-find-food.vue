<template>
  <q-page padding>
    <div class="row items-start q-gutter-sm">

      <q-card class="my-card bg-secondary text-white" v-for="(organization, index) in organizations" :key="index">
        <q-card-section>
          <div class="text-h6">{{ organization.name }}</div>
          <div class="text-subtitle2">{{ organization.streetAddress }}</div>
          <div class="text-subtitle2">{{ organization.csz }}</div>
        </q-card-section>

        <q-card-section>
          {{ organization.food }}
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
      organizations: [
        {
          name: 'Panera',
          streetAddress: '1200 Some Street Dr.',
          csz: '33453 Tampa FL',
          food: 'Such and such food is available.'
        },
        {
          name: "Chilie's",
          streetAddress: '1234 Another Street Dr.',
          csz: '33454 Tampa FL',
          food: 'Such and such food is available.'
        },
        {
          name: 'Chipotle',
          streetAddress: '5678 Yet Another Street Dr.',
          csz: '33455 Tampa FL',
          food: 'Such and such food is available.'
        }
      ]
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
