<template>
  
  <q-page padding class="q-gutter-md">

    <q-banner dense v-if="messages && messages.length > 0 && banner" inline-actions class="text-white bg-secondary">
      <q-icon name="notifications_active" color="primary" size="sm" />

      {{ messages.length === 1 ? 'You have a new notification!' : 'You have new notifications!' }}

      <template v-slot:action>
        <q-btn flat dense label="Dismiss" @click="dismissBanner"/>
      </template>

    </q-banner>

    <q-card>
        <div class="text-subtitle1">
          <q-btn flat color="secondary" :icon="showAccountNotifications ? 'expand_more' : 'chevron_right'" @click="showNotifications" />
          Notifications
        </div>
    </q-card>

        <q-list dark row v-if="showAccountNotifications" bordered dense separator class="rounded-borders">
          <q-item class="bg-secondary text-white" v-for="(message,index) in messages" :key="index">

            <q-item-section side>
              <q-btn flat text-color="grey" size="sm" dense round icon="delete" @click="dismiss(message.id)"/>
            </q-item-section>
            
            <q-item-section>
              <q-item-label>{{ message.notification_type }}</q-item-label>
              <q-item-label lines="1">{{ message.donations.food }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label>
                {{ new Date(message.time).toLocaleDateString([], { month: 'short', day: '2-digit' }) }}
                {{ new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </q-item-label>
            </q-item-section>

          </q-item>
        </q-list>


    <q-card style="height: 33vh;">
      <div class="q-pd-md" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
        <div class="q-gutter-y-md column" style="text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center;">
            <div class="text-h6" style="margin-right: 10px;">My Community Rating</div>
            <q-rating
              v-model="myRatingTotal"
              size="2em"
              color="secondary"
              icon="star_border"
              icon-half="star_half"
              icon-selected="star"
              readonly
            />
          </div>
        </div>
      </div>
    </q-card>

    <q-card>
        <div class="text-subtitle1">
          <q-btn flat color="secondary" :icon="showActiveItems ? 'expand_more' : 'chevron_right'" @click="showActive" />
          Active Donations
        </div>
    </q-card>

    <div v-if="showActiveItems" class="row q-gutter-md" style="margin-top: 5px;">
      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems_active" :key="index">
        <q-card-section>
          <div class="text-primary"> Expires: {{ pantry_item.date_expires }} </div>
          <div class="text-h6">{{ pantry_item.org }}</div>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetAddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state.value }} {{ pantry_item.pickup_zip }}</div>
        </q-card-section>
        <div class="absolute-bottom">
          <q-separator dark />
          <q-card-actions class="justify-around">
            <q-btn flat @click="cancel">Cancel</q-btn>
          </q-card-actions>
        </div>
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
        <q-card-section >
          <div class="text-primary"> Expired: {{ pantry_item.date_expires }} </div>
          <div class="text-h6">{{ pantry_item.org }}</div>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
          <br/>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetAddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state.value }} {{ pantry_item.pickup_zip }}</div>
        </q-card-section>

        <div class="absolute-bottom">
          <q-separator dark />
          <q-card-actions class="justify-around">
            <q-btn flat :disable="reviewedDonations.includes(pantry_item.id)" @click="showReview(pantry_item)">
            {{ reviewedDonations.includes(pantry_item.id)  ? 'Review Completed' : 'Leave a Review' }}
          </q-btn>
          </q-card-actions>
        </div>
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
          <q-card-section>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-rating
                  name="numStars"
                  v-model="numStars"
                  size="3.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                />
              </q-form>
            </div>
          </q-card-section>
        </div>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat @click="submitReview" label="COMPLETE REVIEW" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { watch} from 'vue'

export default defineComponent({
  name: 'AccountPage',
  setup () {
    const $q = useQuasar();
    const pantryItems_active = ref([]);
    const pantryItems_expired = ref([]);
    const showActiveItems = ref(false);
    const showPastItems = ref(false);
    const showAccountSettings = ref(false);
    const showAccountNotifications = ref(false);
    const clickedReview = ref(false);
    const today = ref(new Date());
    const messages = ref(null);
    const banner = ref(true);    const selected_donation = ref([]);
    const numStars = ref(0);
    const nullRating = ref(0);
    const ratingResult = ref([]);
    const reviewedDonations = ref([]);
    const myRatingTotal = ref(0);
    
    const fetchDonations = async () => {
      try {
        // get current user id
        const { data: { user } } = await supabase.auth.getUser()
        const currentUser_id = user.id;
        console.log(currentUser_id);

        // get donation from supabase for current user
        const { data , error } = await supabase
          .from('donations')
          .select()
          .eq('donator_id', currentUser_id);

        if (error) {
          throw new Error('Failed to fetch donations, error: ' + error.message);
        }

        // filter the items into active and expired
        // this should be moved into a seperate function
        for (let i = 0; i < data.length; i++) {
          let date_today = new Date();
          date_today.setHours(0, 0, 0, 0);
          let date_active = new Date(data[i].date_active);
          date_active.setHours(0, 0, 0, 0);
          let date_expires = new Date(data[i].date_expires);
          date_expires.setHours(0, 0, 0, 0);

          console.log("today: " + date_today);
          console.log("activeDate: " + date_active);
          console.log("expirationDate: " + date_expires);

          if (date_active <= date_today && date_today <= date_expires) {
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
        console.error('Failed to fetch donations:', error.message);
      }

    };

    const fetchMessages = async () => {
      console.log("fetching messages")

      try {
        // get current user id
        let { data: { user } } = await supabase.auth.getUser()
        let currentUser_id = user.id;
        console.log("current user id: " + currentUser_id);

        // get messages from supabase for current user
        let { data , error } = await supabase
          .from('Notifications')
          .select(`
                    notification_type,
                    time,
                    id,
                    donations ( food )
                  `)
          .filter('dismissed', 'eq', false)
          .filter('user_id', 'eq', currentUser_id); // Add a filter for user_id

        if (error) {
          throw new Error('Failed to fetch messages, error: ' + error.message);
        }

        messages.value = data;
        console.log("messages: " + messages.value);
        console.log(data[0])

      } catch (error) {
        console.error('Failed to fetch messages:', error.message);
      }

      console.log("done fetching messages")

    };

    onMounted(async () => {
      fetchDonations();
      fetchMessages();
      let todayDate = new Date();
      today.value = todayDate.toISOString().split('T')[0];
      todayDate.setHours(0, 0, 0, 0);
      console.log("onMounted todays date: " + today.value);

      // Check review status for completed donnations when the page is mounted
      await getReviewedDonations();
      await getMyRatingTotal();
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
    const showNotifications = () => {
      console.log('Show Notifications button clicked.');
      showAccountNotifications.value = !showAccountNotifications.value;
    }
    const dismissBanner = () => {
      console.log('Dismiss Banner button clicked.');
      banner.value = !banner.value;
    }
    const dismiss = async (index) => {
      console.log('Dismiss button clicked.');

      // Get the ID of the message to dismiss
      const messageId =index;

      try {
        // Update the 'dismissed' column to true in Supabase
        let { data, error } = await supabase
        .from('Notifications')
        .update({ dismissed: true })
        .eq('id', messageId);

        if (error) {
          throw new Error('Failed to dismiss message, error: ' + error.message);
        }

      console.log('Message dismissed:', data);

      // Remove the dismissed message from the local messages array
      fetchMessages();

        } catch (error) {
          console.error('Failed to dismiss message:', error.message);
        }
    }
    const formatMessageTime = (time) => {
      const dateObject = new Date(time);
      const formatter = new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      });

      return formatter.format(dateObject);
    };

    const showReview = async (donation) => {
      console.log('Add review button clicked.');
      selected_donation.value = donation;
      clickedReview.value = true;
    };

    // function to fill reviewedDonations array with donations that have been reviewed
    const getReviewedDonations = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log(user.id);
      const { data, error } = await supabase
        .from('reviews')
        .select('donation_id')
        .eq('reviewer_id', user.id);
      if (error) {
        console.error('Error checking for review:', error.message);
      }
      let uniqueDonations = new Set(reviewedDonations.value);
      for (let i = 0; i < data.length; i++) {
        uniqueDonations.add(data[i].donation_id);
      }
      reviewedDonations.value = Array.from(uniqueDonations);
      console.log("Reviewed Donations: " + reviewedDonations.value);
    };

    const getMyRatingTotal = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || !user.id) {
          console.error("User or user ID is null or undefined.");
          return;
        }

        const { data, error } = await supabase
          .from('reviews')
          .select('rating')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error checking for rating values:', error.message);
          return;
        }

        if (!data || data.length === 0) {
          console.warn("No rating data found for the user.");
          return;
        }

        console.log("This user's star ratings:", data);

        let totalRating = 0;

        for (let i = 0; i < data.length; i++) {
          if (data[i].rating) {
            totalRating += data[i].rating;
            console.log("Current value:", totalRating);
          }
        }

        if (data.length > 0) {
          // Divide total star rating count by the number of reviews
          myRatingTotal.value = totalRating / data.length;
          // Round to the nearest half star
          myRatingTotal.value = Math.round(myRatingTotal.value * 2) / 2;
          console.log("Final value:", myRatingTotal.value);
        }
      } catch (e) {
        console.error('An unexpected error occurred:', e.message);
      }
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
      showAccountNotifications,
      showNotifications,
      messages,
      fetchMessages,
      dismiss,
      formatMessageTime,
      dismissBanner,
      banner,
      showReview,
      clickedReview,
      numStars,
      nullRating,
      ratingResult,
      getReviewedDonations,
      reviewedDonations,
      getMyRatingTotal,
      myRatingTotal,

      onSubmit (evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [ name, value ] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        ratingResult.value = data
      },

      async submitReview() {
        console.log("submitReview function entered.");

        const { data: { user } } = await supabase.auth.getUser()
        console.log(user.id);

        const userType = ref([]);

        // User Type is a Donatee, set id of user_id to review to donator
        if (user.donation_status == false) {
            console.log("selected donation id: " + selected_donation.value.donator_id);
            userType.value = selected_donation.value.donator_id;
        }
        // User Type is a Donator, set id of user_id to review to donatee
        else {
          console.log("selected donation id: " + selected_donation.value.donatee_id);
          userType.value = selected_donation.value.donatee_id;
        }

        console.log("user_id: " + userType.value);
        console.log("rating: " + numStars.value);
        console.log("donation_id: " + selected_donation.value.id);
        console.log("reviewer_id: " + user.id);

        // Send review data to SupaBase
        let { error1 } = await supabase.from('reviews').
        insert({
          user_id: userType.value,
          rating: numStars.value,
          donation_id: selected_donation.value.id,
          reviewer_id: user.id
          })

        // If review form fails, display error message
        if (error1) {
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Review submission failed!'
            });
        }
        // If review succeeds, display success message
        else {
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Review submitted!'
            });
        }
        // Reset value of stars to 0 for future reviews
        numStars.value = 0;
        await getReviewedDonations();
      }
    }
  }
  })
</script>

<style >
  .donationCards
  {
    width: 100%;
    max-width: 250px;
    height: 250px;
  }

</style>
