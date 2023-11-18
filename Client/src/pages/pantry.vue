<template>
  <q-page padding>

    <q-input rounded outlined v-model="searchText" label="Search..." />
    
    <div class="row q-gutter-md" style="margin-top: 5px;">
      
      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems" :key="index">
        <q-card-section>
          <div class="text-h6">{{ pantry_item.orgDisplayName }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetAddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state.value }} {{ pantry_item.pickup_zip }}</div>
        </q-card-section>
        <q-separator dark />
        <q-card-actions class="justify-around">
          <q-btn flat @click="reserveDonation">Reserve</q-btn>
          <q-btn flat @click="() => contact(pantry_item)">Contact</q-btn>
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
            Are you sure you want to reserve this food?
          </q-card-section>
          <q-card-section>
            You will have 24 hours to pick up the food.
          </q-card-section>
  
          <q-card-section>
            After clicking OK, this food will be reserved for you and it will appear on your profile page.
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
    const pantryItems = ref([]);

    const fetchOrganization = async () => {
      const response = await fetch('http://localhost:3000/pantry', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      pantryItems.value = data;
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
      pantryItems.value = pantryItems.value.filter((organization) => {
        return organization.org.includes(searchText.value);
      });
      if (searchText.value === '') {
        fetchOrganization();
      }
    });
    
    return {
      pantryItems,
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
<style >
  .donationCards
  {
    width: 100%;
    max-width: 250px;
  }

</style>