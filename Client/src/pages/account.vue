<template>
  
  <q-page padding class="q-gutter-md" style="background-color: black;">

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


        <q-card style="display: flex; height: 235px;">

          <!-- My Community Rating Section -->
          <q-card style="flex: 3; display: flex; align-items: center; justify-content: center;">
          <!-- My Community Rating Section -->
          <div class="q-pa-md">
            <div class="q-gutter-y-md" style="text-align: center; margin-block: 8px; margin-left: 12px;">
              <div style="display: flex; align-items: center; justify-content: center;">
                <div class="text-h6">My Community Rating</div>
              </div>
              <div style="display: flex; align-items: center; justify-content: center;">
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


        <!-- Account Info Section -->
        <q-card style="flex: 12; max-height: 10px;">
          <div class="q-pa-xs">
            <q-card-section>
              <div class="text-h6">Account Info</div>

              <!-- User Info -->
              <q-separator light />

              <q-card-section class="text-fit">
                <div class="text-body1">Account Role: {{ userInfo.role }}</div>
                <div class="text-body1">Organization Name: {{ userInfo.organization }}</div>
                <div class="text-body1">Account Owner: {{ userInfo.name }}</div>
                <div class="text-body1">Email: {{ userInfo.email }}</div>
                <div class="text-body1">Phone Number: {{ userInfo.phone }}</div>
                <div class="text-body1">Current Address: {{ userInfo.address }}, {{ userInfo.city }} {{ userInfo.state }} {{ userInfo.zip }}</div>
              </q-card-section>

            </q-card-section>
          </div>
        </q-card>

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
          <div class="text-subtitle2">{{ pantry_item.pickup_streetaddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state.value }} {{ pantry_item.pickup_zip }}</div>
          <div class="text-subtitle2" v-if="userInfo.email != pantry_item.contact_email && pantry_item.user_email != userInfo.email">{{ pantry_item.contact_name }}</div>
          <div class="text-subtitle2" v-if="userInfo.email != pantry_item.contact_email && pantry_item.user_email != userInfo.email">{{ pantry_item.contact_email }}</div>
          <div class="text-subtitle2" v-if="userInfo.email != pantry_item.contact_email && pantry_item.user_email != userInfo.email">{{ pantry_item.contact_phone }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-primary"> Reserved By: {{ getInfoForDonator(pantry_item.donatee_id) }} </div>
        </q-card-section>
        <div class="absolute-bottom">
          <q-separator dark />
          <q-card-actions class="justify-around">
            <q-btn flat @click="() => cancel(pantry_item)">Cancel</q-btn>
            <q-btn v-if="pantry_item.reserved" flat @click="() => completeOrder(pantry_item)">Complete</q-btn>
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
          <div v-if="pantry_item.pickup_time === null" class="text-primary"> Expired: {{ pantry_item.date_expires }} </div>
          <div v-if="pantry_item.pickup_time !== null" class="text-primary"> Picked Up: {{ pantry_item.date_expires }} </div>
          <div class="text-h6">{{ pantry_item.org }}</div>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
          <br/>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetaddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state.value }} {{ pantry_item.pickup_zip }}</div>
          <div class="text-subtitle2" v-if="userInfo.email != pantry_item.contact_email && pantry_item.user_email != userInfo.email">{{ pantry_item.contact_name }}</div>
          <div class="text-subtitle2" v-if="userInfo.email != pantry_item.contact_email && pantry_item.user_email != userInfo.email">{{ pantry_item.contact_email }}</div>
          <div class="text-subtitle2" v-if="userInfo.email != pantry_item.contact_email && pantry_item.user_email != userInfo.email">{{ pantry_item.contact_phone }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-primary"> Reserved By: {{ getInfoForDonator(pantry_item.donatee_id) }} </div>
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
          <q-card-section class="text-h6 text-center">
            Please leave a review for your donation!
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
    const isUserDonator = ref(null);
    const banner = ref(true);
    const selected_donation = ref([]);
    const numStars = ref(0);
    const nullRating = ref(0);
    const ratingResult = ref([]);
    const reviewedDonations = ref([]);
    const myRatingTotal = ref(0);
    const userInfo = ref({});
    const reservedInfoMap = ref(new Map());
    
    const fetchDonations = async () => {
      try {
        // get current user id
        const { data: { user } } = await supabase.auth.getUser()
        const currentUser_id = user.id;
        
        const { data, error } = await supabase.from('Accounts').select().eq('user_id', currentUser_id);
        isUserDonator.value = data[0].Donation_Status;

        if (isUserDonator.value) {
          const { data, error } = await supabase
            .from('donations')
            .select()
            .eq('donator_id', currentUser_id);
          
          fetchDonations.value = data;
        }
        else {
          const { data, error } = await supabase
            .from('donations')
            .select()
            .eq('donatee_id', currentUser_id);

          fetchDonations.value = data;
        }
          
        if (error) {
          throw new Error('Failed to fetch donations, error: ' + error.message);
        }

        // filter the items into active and expired
        // this should be moved into a seperate function
        for (let i = 0; i < fetchDonations.value.length; i++) {

          // set donatee reserved info for each donation
          fetchDonateeInfo(fetchDonations.value[i].donatee_id);

          let date_today = new Date();
          date_today.setHours(0, 0, 0, 0);
          let date_active = new Date(fetchDonations.value[i].date_active);
          date_active.setHours(0, 0, 0, 0);
          let date_expires = new Date(fetchDonations.value[i].date_expires);
          date_expires.setHours(0, 0, 0, 0);

          if (date_active <= date_today && date_today <= date_expires) {
            pantryItems_active.value.push(fetchDonations.value[i]);
          }
          else {
            pantryItems_expired.value.push(fetchDonations.value[i]);
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

      } catch (error) {
        console.error('Failed to fetch messages:', error.message);
      }

      console.log("done fetching messages")

    };

    onMounted(async () => {
      fetchDonations();
      fetchMessages();
      fetchUserInfo();
      fetchDonateeInfo();
      let todayDate = new Date();
      today.value = todayDate.toISOString().split('T')[0];
      todayDate.setHours(0, 0, 0, 0);

      // Check review status for completed donnations when the page is mounted
      await getReviewedDonations();
      await getMyRatingTotal();
    });

    const cancel = async (pantry_item) => {

     console.log('Cancel button clicked.');
     try {
        // get current user id
        const { data: { user } } = await supabase.auth.getUser()
        const currentUser_id = user.id;

        // If current user is the donatee then set reserved to false and donatee_id to null
        // Else, user is donator so cancel by setting expiration date to today
        if (currentUser_id == pantry_item.donatee_id)
        {

          const { error } = await supabase.from('donations').update([{reserved: false, donatee_id: null}]).eq('id', pantry_item.id)

          // update notifications in db for donator since donatee cancelled
          const { error: notificationError } = await supabase
            .from('Notifications')
            .insert({
              user_id: pantry_item.donator_id,
              donation_id: pantry_item.id,
              notification_type: 'New Cancellation',
              time: new Date()
            })
            .eq('donation_id', pantry_item.id);

          if (notificationError) {
            console.error('Error updating Notifications:', notificationError);
            return;
          } else {
            console.log('Notification successfully added.');
          }

        }
        else if (currentUser_id == pantry_item.donator_id)
        {

          // Update the 'reserved' column to false in Supabase and expires to today
          const { error } = await supabase
                .from('donations')
                .update([{ date_expires:new Date()
                  .toISOString()}])
                  .eq('id', pantry_item.id)

            if (error) {
              console.error('Error fetching donations:', error);
              return;
            }
            else
            {
              console.log("Donation successfully cancelled.")

             }

          // update notifications in db for the donatee since donator cancelled
          const { error: notificationError } = await supabase
            .from('Notifications')
            .insert({
              user_id: pantry_item.donatee_id,
              donation_id: pantry_item.id,
              notification_type: 'New Cancellation',
              time: new Date()
            })
            .eq('donation_id', pantry_item.id);

          if (notificationError) {
            console.error('Error updating Notifications:', notificationError);
            return;
          } else {
            console.log('Notification successfully added.');
          }

        }
        else
        {
          console.log("current user id does not match donator_id or donatee_id");
        }

        // Remove the cancelled donation from the active donations array
        window.location.reload();

     } catch (error) {
        console.error('Failed cancel donation:', error.message);
     }



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

        let totalRating = 0;

        for (let i = 0; i < data.length; i++) {
          if (data[i].rating) {
            totalRating += data[i].rating;
          }
        }

        if (data.length > 0) {
          // Divide total star rating count by the number of reviews
          myRatingTotal.value = totalRating / data.length;
          // Round to the nearest half star
          myRatingTotal.value = Math.round(myRatingTotal.value * 2) / 2;
        }
      } catch (e) {
        console.error('An unexpected error occurred:', e.message);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('Accounts')
        .select('Name, Phone, Donation_Status, Address, City, State, Zip, Organization')
        .eq('user_id', user.id);

        const role = ref();

        if (data[0].Donation_Status) {
          role.value = "Donator";
        } else {
          role.value = "Donatee";
        }

        userInfo.value = {
          role: role.value,
          name: data[0].Name,
          phone: data[0].Phone,
          email: user.email,
          address: data[0].Address,
          city: data[0].City,
          state: data[0].State,
          zip: data[0].Zip,
          organization: data[0].Organization
        };
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const completeOrder = async (pantry_item) => {

      //update pickup time in the database and set date expires to today
      const currentTime = new Date().toISOString();
      const currentDate = new Date().toLocaleDateString('en-US');

      try{
      const { error } = await supabase
        .from('donations')
        .update([
          {
            date_expires: currentDate,
            pickup_time: currentTime,
          }
        ])
        .eq('id', pantry_item.id);
      }
      catch (error) {
        console.error('Failed to complete order:', error.message);
      }

      // get current user id
      const { data: { user } } = await supabase.auth.getUser()
      const currentUser_id = user.id;

      // if current user is the donator, update the notification table for donatee
      if (currentUser_id == pantry_item.donator_id)
      {

        // update notifications in db for the donatee
        const { error: notificationError } = await supabase
          .from('Notifications')
          .insert({
            user_id: pantry_item.donatee_id,
            donation_id: pantry_item.id,
            notification_type: 'Pickup Completed',
            time: new Date()
          })
          .eq('donation_id', pantry_item.id);

        if (notificationError) {
          console.error('Error updating Notifications:', notificationError);
          return;
        } else {
          console.log('Notification successfully added.');
        }

      }
      // Else if current user is the donatee, update the notification table for the donator
      else if (currentUser_id == pantry_item.donatee_id)
      {

        // update notifications in db for the donator
        const { error: notificationError } = await supabase
          .from('Notifications')
          .insert({
            user_id: pantry_item.donator_id,
            donation_id: pantry_item.id,
            notification_type: 'Pickup Completed',
            time: new Date()
          })
          .eq('donation_id', pantry_item.id);

        if (notificationError) {
          console.error('Error updating Notifications:', notificationError);
          return;
        } else {
          console.log('Notification successfully added.');
        }

      }
      else
      {
        console.log("current user id does not match donator_id or donatee_id");
      }

      //Reload the window to move the donation to the past donations section
      window.location.reload();



    };

    const fetchDonateeInfo = async (donatee_id) => {
      if (donatee_id == null) {
        return;
      }
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('Accounts')
          .select('Name, Organization')
          .eq('user_id', donatee_id);

        if (error) {
          console.error('Error fetching user info:', error);
          return ''; // or return some default value
        }

        if (donatee_id == user.id && userInfo.value.role == "Donatee") {
          reservedInfoMap.value.set(donatee_id, "Me");
        } else {
          reservedInfoMap.value.set(donatee_id, data[0].Name + " at " + data[0].Organization);
        }

      } catch (error) {
        console.error('Unexpected error:', error);
        return ''; // or return some default value
      }
    };

    const getInfoForDonator = (donatee_id) => {
      return reservedInfoMap.value.get(donatee_id) || "Not Reserved";
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
      userInfo,
      fetchUserInfo,
      completeOrder,
      reservedInfoMap,
      fetchDonateeInfo,
      getInfoForDonator,

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

        const reviewedUserID = ref(null);
        const reviewerUserID = ref(null);

        // User Type is a Donatee, set id of user_id to review to donator
        if (userInfo.value.role == "Donatee") {
          reviewedUserID.value = selected_donation.value.donator_id;
          reviewerUserID.value = selected_donation.value.donatee_id;
        }
        // User Type is a Donator, set id of user_id to review to donatee
        else {
          reviewedUserID.value = selected_donation.value.donatee_id;
          reviewerUserID.value = selected_donation.value.donator_id;
        }

        // Send review data to SupaBase
        let { error1 } = await supabase.from('reviews').
        insert({
          user_id: reviewedUserID.value,
          rating: numStars.value,
          donation_id: selected_donation.value.id,
          reviewer_id: reviewerUserID.value
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
    height: 350px;
  }

</style>
