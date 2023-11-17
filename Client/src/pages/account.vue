<template>
  <q-page padding class="q-gutter-md">
    <q-card>
        <div class="text-subtitle1">
          <q-btn flat color="secondary" :icon="showActiveItems ? 'expand_more' : 'chevron_right'" @click="showActive" />
          Active Donations
        </div>
    </q-card>

    
    <div v-if="showActiveItems" class="row q-gutter-md" style="margin-top: 5px;">
      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems_active" :key="index">
        <q-card-section>
          <div class="text-h6">{{ pantry_item.org }}</div>
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
          <q-btn flat @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    
    <q-card>
        <div class="text-subtitle1">
          <q-btn @click="showPast" flat color="secondary" :icon="showPastItems ? 'expand_more' : 'chevron_right'" />
          Past Donations
        </div>
    </q-card>

    <div v-if="showPastItems" class="row q-gutter-md" style="margin-top: 5px;">
      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems_expired" :key="index">
        <q-card-section>
          <div class="text-h6">{{ pantry_item.org }}</div>
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
          <q-btn flat @click="showReview">Leave a Review</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog
      v-model="clickedReview"
    >
      <q-card style="width: 300px">
        <div class="q-pd-md" style="display: flex; flex-direction: column; align-items: center;">
          <q-card-section>
            Please leave a star rating for your donation!
          </q-card-section>

          <div style="display: flex; flex-direction: column; align-items: center;">
            <q-rating
              v-model="ratingModel"
              size="3.5em"
              color="primary"
              icon="star_border"
              icon-selected="star"
            />
          </div>
           
        </div>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
    <!-- <q-card>
        <div class="text-subtitle1">
          <q-btn @click="showSettings" flat color="secondary" :icon="showAccountSettings ? 'expand_more' : 'chevron_right'" />
          Account Settings
        </div>
    </q-card> -->

  </q-page>
</template>

<script>
import { defineComponent, toDisplayString } from 'vue'
import { ref, watch, onMounted } from 'vue';

export default defineComponent({
  name: 'AccountPage',
  setup () {
    const pantryItems_active = ref([]);
    const pantryItems_expired = ref([]);
    const showActiveItems = ref(false);
    const showPastItems = ref(false);
    const showAccountSettings = ref(false);
    const clickedReview = ref(false);
    const today = ref(new Date());
    const ratingModel = ref(0);
    
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:3000/pantry', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("data.dateActive: " + data[0].dateActive);
        console.log("data.dateExpires: " + data[0].dateExpires);
  
        for (let i = 0; i < data.length; i++) {
          let todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          let activeDate = new Date(data[i].dateActive);
          activeDate.setHours(0, 0, 0, 0);
          let expirationDate = new Date(data[i].dateExpires);
          expirationDate.setHours(0, 0, 0, 0);
  
          console.log("today: " + todayDate);
          console.log("activeDate: " + activeDate);
          console.log("expirationDate: " + expirationDate);
          
          if (activeDate <= todayDate && todayDate <= expirationDate) {
            pantryItems_active.value.push(data[i]);
            console.log("found active item: " + data[i].food);
          }
          else {
            pantryItems_expired.value.push(data[i]);
            console.log("found expired item: " + data[i].food);
            console.log("today: " + today.value);
          }
        }
        if (pantryItems_active.value.length > 0) {
          showActiveItems.value = true;
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }

    };

    onMounted(() => {
      fetchDonations();
      let todayDate = new Date();
      today.value = todayDate.toISOString().split('T')[0];
      todayDate.setHours(0, 0, 0, 0);
      console.log("onMounted todays date: " + today.value);
    });
    

    const cancel = () => {
     console.log('Cancel button clicked.');
    }
    const showActive = () => {
      console.log('Show Active button clicked.');
      showActiveItems.value = !showActiveItems.value;
    }
    const showPast = () => {
      console.log('Show Past button clicked.');
      showPastItems.value = !showPastItems.value;
    }
    const showSettings = () => {
      console.log('Show Settings button clicked.');
      showAccountSettings.value = !showAccountSettings.value;
    }
    const showReview = () => {
      console.log('Add review button clicked.');
      clickedReview.value = true;
    };
    return {
      pantryItems_active,
      pantryItems_expired,
      fetchDonations,
      cancel,
      showActiveItems,
      showActive,
      showPastItems,
      showAccountSettings,
      showPast,
      showSettings,
      showReview,
      clickedReview,
      ratingModel
    }
  }
})
</script>
