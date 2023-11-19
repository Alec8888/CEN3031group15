<template>
  <q-page padding>

    <q-input rounded outlined v-model="searchText" label="Search..." />

    <div class="row q-gutter-md" style="margin-top: 5px;">

      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems" :key="index">
        <q-card-section>
          <div class="text-h6">{{ pantry_item.org_displayname }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetaddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state }} {{ pantry_item.pickup_zip }}</div>
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
import { supabase } from '../lib/supabaseClient'

export default {
  name: 'pantry-find-food',
  setup() {

    const selectedOrganization = ref(null);
    const pantryItems = ref([]);

    const fetchDonations = async () => {
      try {
        var currentDate = new Date();
        currentDate = currentDate.toISOString().slice(0, 10);
        console.log(currentDate);
        const { data, error } = await supabase.from('donations').select().eq("reserved", null).lt("date_expires", currentDate)
        if (error) {
          console.error('Error fetching donations:', error);
          return;
        }
        pantryItems.value = data;
        console.log("pantryItems: ", pantryItems.value);
        console.log("pantryItems (stringified): " + JSON.stringify(pantryItems.value, null, 2));
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    onMounted(fetchDonations);

    const clickedCall = ref(false);
    const clickedReserve = ref(false);

    const reserveDonation = () => {
      console.log('Reserve food button clicked.');
      clickedReserve.value = true;
    };

    // take in a donation and return the organization
    // not sure we still need this with supabase
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
      pantryItems.value = pantryItems.value.filter((donation) => {
        return donation.org_displayname.includes(searchText.value);
      });
      if (searchText.value === '') {
        fetchDonations();
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
      watch,
      fetchDonations // was working without this?
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
