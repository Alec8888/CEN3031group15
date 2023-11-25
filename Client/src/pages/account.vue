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
          <q-btn flat @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <!-- <q-card>
        <div class="text-subtitle1">
          <q-btn @click="showSettings" flat color="secondary" :icon="showAccountSettings ? 'expand_more' : 'chevron_right'" />
          Account Settings
        </div>
    </q-card> -->

  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue';
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
    const today = ref(new Date());
    const messages = ref(null);
    const banner = ref(true);
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

    onMounted(() => {
      fetchDonations();
      fetchMessages();
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
      banner
    }
  }
})
</script>
