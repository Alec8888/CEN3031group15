<template>
  <q-page padding>
    <q-input rounded outlined v-model="searchText" label="Search..." />
    

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
import { ref, watch } from 'vue';
import { initialOrganizations } from '../demoData/initialOrganizations.js';

export default {
  name: 'pantry-find-food',
  setup() {
    const organizations = ref([...initialOrganizations]);

    const clickedCall = ref(false);

    const reserveFood = async () => {
      console.log('Reserve food button clicked.');
    };

    const contact = () => {
      console.log('Contact button clicked.');
      clickedCall.value = true;
    };

    const searchText = ref('');
    watch(searchText, () => {
      console.log('Search text changed.');
      // update organizations [] where name includes searchText
      organizations.value = organizations.value.filter((organization) => {
        return organization.name.includes(searchText.value);
      });
      // if searchText is '' then reset organizations []
      if (searchText.value === '') {
        organizations.value = [...initialOrganizations];
      }
    });
    
    return {
      organizations,
      clickedCall,
      reserveFood,
      contact,
      searchText,
      watch
    };
  }
}
</script>
