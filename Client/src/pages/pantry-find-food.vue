<template>
  <q-page padding>
    <q-input rounded outlined v-model="text" label="Search..." />
    

    <div class="row items-start q-gutter-sm" style="margin-top: 5px;">
      
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
        
        <q-card-actions align="center">
          <q-btn flat @click="reserveFood">Reserve</q-btn>
          <q-btn flat @click="contact">Contact</q-btn>
        </q-card-actions>
        
        <q-dialog
          v-model="clickedCall"
        >
          <q-card style="width: 300px">
            <div class="q-pd-md">
              <q-card-section>
                Email: {{ organization.email }}
              </q-card-section>
      
              <q-card-section>
                Phone: {{ organization.phone }}
              </q-card-section>
    
            </div>
    
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
      
    </div>

    
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'pantry-find-food',
  setup() {
    const organizations = ref([
      {
        name: 'Panera',
        streetAddress: '1200 Some Street Dr.',
        csz: '33453 Tampa FL',
        food: 'Such and such food is available.',
        email: 'panera@email.com',
        phone: '123-456-1111'
      },
      {
        name: "Chilie's",
        streetAddress: '1234 Another Street Dr.',
        csz: '33454 Tampa FL',
        food: 'Such and such food is available.',
        email: 'chilies@email.com',
        phone: '123-456-2222'
      },
      {
        name: 'Chipotle',
        streetAddress: '5678 Yet Another Street Dr.',
        csz: '33455 Tampa FL',
        food: 'Such and such food is available.',
        email: 'chipotle@email.com',
        phone: '123-456-3333'
      }
    ]);

    const clickedCall = ref(false);

    const reserveFood = async () => {
      console.log('Reserve food button clicked.');
    };

    const contact = () => {
      console.log('Contact button clicked.');
      clickedCall.value = true;
    };
    

    return {
      organizations,
      clickedCall,
      reserveFood,
      contact
    };
  }
}
</script>
