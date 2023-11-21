<template>
  <q-page padding>

    <q-input rounded outlined v-model="searchText" label="Search..." />

    <div class="row q-gutter-md" style="margin-top: 5px;">

      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems" :key="index">
        <q-card-section>
          <div class="text-h6 hidden">{{ pantry_item.id }}</div>
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
          <q-btn flat @click="() => reserveDonation(pantry_item)">Reserve</q-btn>
          <q-btn flat @click="() => contact(pantry_item)">Contact</q-btn>
        </q-card-actions>

      </q-card>

    </div>
    <q-dialog
      v-model="clickedCall"
    >
      <q-card style="width: 300px" >
        <div class="q-pd-md">
          <q-card-section>

          </q-card-section>

          <q-card-section v-for="(user, index) in selectedOrganization" :key="index">
            Email: {{ user.Email }}
            <br>
            <br>
            Phone: {{ user.Phone }}
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
            Your reservation has been sucessfully saved.
          </q-card-section>
          <q-card-section>
            You will have 24 hours to pick up the food.
          </q-card-section>

          <q-card-section>
            You can now see this reservation in your Home tab.
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
import { event } from 'quasar';

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
        const { data, error } = await supabase.from('donations').select().neq('reserved', true)
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

    const reserveDonation = async (pantry_item) => {
      console.log('Reserve food button clicked.');
      console.log(pantry_item)
      //get current user to make reservation
      const currentUserId = ref(null);
      const { data: { user } } = await supabase.auth.getUser()
        currentUserId.value = user.id;
      clickedReserve.value = true;
      const { error } = await supabase.from('donations').update([{reserved: true, donatee_id: currentUserId.value}]).eq('id', pantry_item.id)
        if (error) {
          console.error('Error fetching donations:', error);
          return;
        }
        else
        {
          console.log("Donation successfully reserved.")
        }
    };

    // take in a donation and return the organization
    // not sure we still need this with supabase
    const contact = async (pantry_item) => {
      const {data, error } = await supabase.from('Accounts').select().eq('user_id', pantry_item.donator_id)
      console.log('Contact button clicked.');
      if (error) {
          console.error('Error fetching contact information:', error);
          return;
        }
      selectedOrganization.value = data;
      console.log(selectedOrganization.value);
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
