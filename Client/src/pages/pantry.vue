<!--This file contains the pantry page that lists all active donations that can be reserved. It displays the overall review of the donator
and it also notifies the donator when items are reserved-->
<template>
  <q-page padding style="background-color: black;">

    <!-- <q-input rounded outlined v-model="searchText" label="Search..." /> -->
    <div class="q-gutter-md row justify-center" >
      <q-btn
        class="glossy"
        color="accent"
        label="Clear Filters"
        icon="filter_list"
        @click="clearFilters"
      />
      <!-- Company filter dropdown -->
      <q-btn-dropdown
        class="glossy"
        color="accent"
        label="Company"
        icon="filter_list"
      >
        <div class="column">
          <q-option-group
            v-model="organizations_selected"
            :options="organizations"
            color="primary"
            type="checkbox"
          />
        </div>
      </q-btn-dropdown>
      <!-- City filter dropdown -->
      <q-btn-dropdown
        class="glossy q-ml-md"
        color="accent"
        label="City"
        icon="filter_list"
        >
        <div class="column">
          <q-option-group
          v-model="cities_selected"
          :options="cities"
          color="primary"
          type="checkbox"
          />
        </div>
      </q-btn-dropdown>
      <!-- State filter dropdown -->
      <q-btn-dropdown
        class="glossy"
        color="accent"
        label="State"
        icon="filter_list"
        >
        <div class="column">
          <q-option-group
          v-model="states_selected"
          :options="states"
          color="primary"
          type="checkbox"
          />
        </div>
      </q-btn-dropdown>

      <!-- Zip Code filter dropdown -->
      <q-btn-dropdown
        class="glossy"
        color="accent"
        label="Zip Code"
        icon="filter_list"
      >
        <div class="column">
          <q-option-group
            v-model="zipCodes_selected"
            :options="zipCodes"
            color="primary"
            type="checkbox"
          />
        </div>
      </q-btn-dropdown>
  </div>
    <!-- Pantry items -->
    <div class="row q-gutter-md justify-center" style="margin-top: 5px;">

      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems" :key="index" >
        <!-- Pantry item details -->
        <q-card-section >
          <div class="text-h6">
            {{ pantry_item.org_displayname }}
            <q-rating
              :model-value="getRatingForDonator(pantry_item.donator_id)"
              @update:modelValue="updateRating($event, pantry_item.donator_id)"
              :key="ratingsMapWatcher"
              size="xs"
              color="primary"
              icon="star_border"
              icon-selected="star"
              readonly
            />
          </div>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
          <br/>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetaddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state }} {{ pantry_item.pickup_zip }}</div>

          <div class="text-subtitle2 text-primary">Expires: {{ new Date(pantry_item.date_expires).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) }}</div>
        </q-card-section>
        <!-- Actions for the pantry item -->
        <div class="absolute-bottom">
          <q-separator dark />
          <q-card-actions align="center" >
            <q-btn  flat @click="() => reserveDonation(pantry_item)" v-if="donationStatus == false" inline-actions> Reserve</q-btn>
            <q-btn flat @click="() => contact(pantry_item)">Contact</q-btn>
          </q-card-actions>
        </div>

      </q-card>

    </div>
    <!-- Contact dialog -->
    <q-dialog
      v-model="clickedCall"
    >
      <q-card style="width: 300px" >
        <div class="q-pd-md">
          <q-card-section>

          </q-card-section>

          <q-card-section>
            Email: {{ pantryItem.contact_email }}
          </q-card-section>
          <q-card-section>
            Phone: {{ pantryItem.contact_phone }}
          </q-card-section>

        </div>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <!-- Reservation dialog -->
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
            You can now see this reservation in your Profile tab.
          </q-card-section>

        </div>
        <q-card-actions align="right" class="bg-white text-teal">
        <q-btn to="/profile" flat label="OK" v-close-popup />
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

    const pantryItem = ref(null); //used to reference the pantry item that is being reserved
    const donationStatus = ref(0); //used to check the reservation status of the pantry item in supabase
    const pantryItems = ref([]); //used to store the pantry items that are being displayed
    //used to store the zip codes, states, and orginzations that are being displayed
    const zipCodes = ref([]); 
    const zipCodes_selected = ref([]);
    const states = ref([]);
    const states_selected = ref([]);
    const cities = ref([]);
    const cities_selected = ref([]);
    const organizations = ref([]);
    const organizations_selected = ref([]);
    // used to store the ratings of the donators
    const ratingsMap = ref(new Map());
    const ratingsMapWatcher = ref(0);
    // populating the donations from the donations database to the pantry
    const fetchDonations = async () => {
      try {
        var currentDate = new Date();
        currentDate = currentDate.toISOString().slice(0, 10);


        const { data, error } = await supabase.from('donations').select().neq('reserved', true).gt('date_expires', currentDate);

        if (error) {
          console.error('Error fetching donations:', error.message);
          return;
        }
        pantryItems.value = data;

        
      } catch (error) {
        console.error('Error fetching donations:', error);
      }

    };
    //used to get the user status from supabase
    const getUserStatus = async () =>
    {
      try{
      //get current user to make reservation
      const currentUserId = ref(null);
      const { data: { user } } = await supabase.auth.getUser()
      currentUserId.value = user.id;
      const { data, error } = await supabase.from('Accounts').select('Donation_Status').eq('user_id', currentUserId.value);

      if (error) {
          console.error('Error fetching donations:', error.message);
          return;
        }

      donationStatus.value = data[0].Donation_Status;
      } catch(error)
      {
        console.error('Error fetching user donation status', error);
      }

    }
    //used to get the ratings of the donators from supabase
    const setRatingsMap = async () => {
      // swap back to for each loop
      for (let i = 0; i < pantryItems.value.length; i++) {

        const { data, error } = await supabase
          .from('reviews')
          .select('rating')
          .eq('user_id', pantryItems.value[i].donator_id);

        if (error) {
          console.error('Error checking for rating values:', error.message);
          return;
        }

        let totalRating = 0;

        // Check if there is matching data in the reviews table
        if (Array.isArray(data) && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            totalRating += data[i].rating;
          }

          totalRating = totalRating / data.length;
          totalRating = Math.round(totalRating * 2) / 2;
        } else {
          // Handle the case when there is no matching data
          totalRating = 0; // Or set to a default value
        }

        ratingsMap.value.set(pantryItems.value[i].donator_id, totalRating);
      }

    };
    //used to get the rating of the donator
    const getRatingForDonator = (donatorId) => {
      return ratingsMap.value.get(donatorId) || 0;
    };
    //used to update the rating of the donator
    const updateRating = (value, donatorId) => {
      ratingsMap.value.set(donatorId, value);
    };
    //used to clear the filters
    const clearFilters = () => {
      zipCodes_selected.value = [];
      states_selected.value = [];
      cities_selected.value = [];
      organizations_selected.value = [];
      fetchDonations();
    }

    onMounted(async () => {
      //Fetch donations from supabase and user status
      await fetchDonations();
      await getUserStatus();
      
      updateZipCodes();
      updateStates();
      updateCities();
      updateOrganizations();
    });

    const updateZipCodes = () => {

      zipCodes.value = [];
      pantryItems.value.forEach((donation) => {
        // if zip code is not in zipCodes, add it
        if (!zipCodes.value.some(zipCode => zipCode.value === donation.pickup_zip)) {
          zipCodes.value.push({ label: donation.pickup_zip, value: donation.pickup_zip });
        }
      });
    }
    // update states from donations
    const updateStates = () => {
      states.value = [];
      pantryItems.value.forEach((donation) => {
        // if state is not in states, add it
        if (!states.value.some(state => state.value === donation.pickup_state)) {
          states.value.push({ label: donation.pickup_state, value: donation.pickup_state });
        }
      });
    }
    // update cities from donations
    const updateCities = () => {
      cities.value = [];
      pantryItems.value.forEach((donation) => {
        // if city is not in cities, add it
        if (!cities.value.some(city => city.value === donation.pickup_city)) {
          cities.value.push({ label: donation.pickup_city, value: donation.pickup_city });
        }
      });
    }

    // update organizations from donations
    const updateOrganizations = () => {
      organizations.value = [];
      pantryItems.value.forEach((donation) => {
        // if organization is not in organizations, add it
        if (!organizations.value.some(organization => organization.value === donation.org_displayname)) {
          organizations.value.push({ label: donation.org_displayname, value: donation.org_displayname });
        }
      });
    }

    const clickedCall = ref(false);
    const clickedReserve = ref(false);

    //used to reserve the donation and notify the donator
    const reserveDonation = async (pantry_item) => {
      //get current user to make reservation
      const currentUserId = ref(null);
      const { data: { user } } = await supabase.auth.getUser()
      currentUserId.value = user.id;
      clickedReserve.value = true;

        // update donation status in db to reserved
        const { error } = await supabase.from('donations').update([{reserved: true, donatee_id: currentUserId.value}]).eq('id', pantry_item.id)
        if (error) {
          console.error('Error fetching donations:', error);
          return;
        }
      
          // update notifications in db for the donator
          const { error: notificationError } = await supabase
            .from('Notifications')
            .insert({
              user_id: pantry_item.donator_id,
              donation_id: pantry_item.id,
              notification_type: 'New Reservation',
              time: new Date()
            })
            .eq('donation_id', pantry_item.id);

          if (notificationError) {
            console.error('Error updating Notifications:', notificationError);
            return;
          } 

    };

    const contact = async (pantry_item) => {
     
      try {
        // get the contact info for the donator of the donation
        const {data, error } = await supabase.from('donations').select().eq('donator_id', pantry_item.donator_id)
       
        if (error) {
          console.error('Error fetching donations:', error.message);
          return;
        }
        pantryItem.value = data[0];
        clickedCall.value = true;
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    const searchText = ref('');
    watch(searchText, () => {
      // update organizations [] where name includes searchText
      pantryItems.value = pantryItems.value.filter((donation) => {
        return donation.org_displayname.includes(searchText.value);
      });
      if (searchText.value === '') {
        fetchDonations();
      }
    });

    // update pantryItems from zipCodes_selected
    watch(zipCodes_selected, async () => {
      if (zipCodes_selected.value.length === 0) {
        fetchDonations();
        return;
      }

      // Fetch donations again before filtering
      await fetchDonations();
      pantryItems.value = pantryItems.value.filter((donation) => {

        // Compare donation.pickup_zip with the strings in zipCodes_selected.value
        return zipCodes_selected.value.includes(donation.pickup_zip);
      });
    });

    // update pantryItems from states_selected
    watch(states_selected, async () => {
      if (states_selected.value.length === 0) {
        fetchDonations();
        return;
      }

      // Fetch donations again before filtering
      await fetchDonations();
      pantryItems.value = pantryItems.value.filter((donation) => {


        // Compare donation.pickup_state with the strings in states_selected.value
        return states_selected.value.includes(donation.pickup_state);
      });
    });

    // update pantryItems from cities_selected
    watch(cities_selected, async () => {
      if (cities_selected.value.length === 0) {
        fetchDonations();
        return;
      }

      // Fetch donations again before filtering
      await fetchDonations();
      pantryItems.value = pantryItems.value.filter((donation) => {
        // Compare donation.pickup_city with the strings in cities_selected.value
        return cities_selected.value.includes(donation.pickup_city);
      });
    });

    // update pantryItems from organizations_selected
    watch(organizations_selected, async () => {
      if (organizations_selected.value.length === 0) {
        fetchDonations();
        return;
      }

      // Fetch donations again before filtering
      await fetchDonations();
      pantryItems.value = pantryItems.value.filter((donation) => {

        // Compare donation.org_displayname with the strings in organizations_selected.value
        return organizations_selected.value.includes(donation.org_displayname);
      });
    });

    
    watch(pantryItems, async () => {

      await setRatingsMap();

      ratingsMapWatcher.value += 1;
    });

    return {
      pantryItems,
      donationStatus,
      clickedCall,
      contact,
      clickedReserve,
      reserveDonation,
      searchText,
      watch,
      fetchDonations,
      mobileData: ref(false),
      bluetooth: ref(false),
      zipCodes,
      zipCodes_selected,
      updateZipCodes,
      states,
      states_selected,
      cities,
      cities_selected,
      updateCities,
      updateStates,
      organizations,
      organizations_selected,
      updateOrganizations,
      clearFilters,
      pantryItem,
      setRatingsMap,
      ratingsMap,
      ratingsMapWatcher,
      getRatingForDonator,
      updateRating,
      getUserStatus

    };
  }
}
</script>
<style >
  .donationCards
  {
    width: 100%;
    max-width: 250px;
    height: 350px;
  }

</style>
