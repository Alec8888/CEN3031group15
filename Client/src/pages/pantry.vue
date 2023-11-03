<template>
  <q-page padding>
    <q-input rounded outlined v-model="searchText" label="Search..." />
    

    <div class="row items-start q-gutter-sm" style="margin-top: 5px;">
      
      <q-card class="my-card bg-secondary text-white" v-for="(organization, index) in organizations" :key="index" style="width: 180px; height:fit-content;">
        <q-card-section>
          <div class="text-h6">{{ organization.name }}</div>
          <div class="text-subtitle2">{{ organization.streetAddress }}</div>
          <div class="text-subtitle2">{{ organization.csz }}</div>
        </q-card-section>
        
        <q-card-section>
          {{ organization.food }}
        </q-card-section>
        
        <q-separator dark />
        
        <q-card-actions class="justify-around">
          <q-btn flat @click="reserveDonation">Reserve</q-btn>
          <q-btn flat @click="() => contact(organization)">Contact</q-btn>
        </q-card-actions>
        
      </q-card>
      
    </div>
    <q-dialog
      v-model="clickedCall"
    >
      <q-card style="width: 300px">
        <div class="q-pd-md">
          <q-card-section>
            Email: {{ selectedOrganization.email }}
          </q-card-section>
  
          <q-card-section>
            Phone: {{ selectedOrganization.phone }}
          </q-card-section>

        </div>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="clickedReserve"
    >
      <q-card style="width: 300px">
        <div class="q-pd-md">
          <q-card-section>
            Are you sure you want to  reserve this food?
          </q-card-section>
          <q-card-section>
            You will have 24 hours to pick up the food.
          </q-card-section>
  
          <q-card-section>
            After clicking OK, this food will be reserved for you and it will appear on your home page.
          </q-card-section>
           
        </div>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    
  </q-page>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
  name: 'pantry-find-food',
  setup() {
    
    const selectedOrganization = ref(null);
    const organizations = ref([]);

    const fetchOrganization = async () => {
      const response = await fetch('http://localhost:3000/organizations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      organizations.value = data;
    };

    onMounted(fetchOrganization);


    const clickedCall = ref(false);
    const clickedReserve = ref(false);

    const reserveDonation = () => {
      console.log('Reserve food button clicked.');
      clickedReserve.value = true;
    };

    const contact = (organization) => {
      console.log('Contact button clicked.');
      console.log(organization);
      selectedOrganization.value = organization;
      clickedCall.value = true;
    };

    const searchText = ref('');
    watch(searchText, () => {
      console.log('Search text changed.');
      // update organizations [] where name includes searchText
      organizations.value = organizations.value.filter((organization) => {
        return organization.name.includes(searchText.value);
      });
      if (searchText.value === '') {
        fetchOrganization();
      }
    });
    
    return {
      organizations,
      selectedOrganization,
      clickedCall,
      contact,
      clickedReserve,
      reserveDonation,
      searchText,
      watch
    };
  }
}
</script>
