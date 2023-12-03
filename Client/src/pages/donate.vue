<!-- This file contains the form to donate food and updates notifications for all donatees
when a donation is processed. -->
<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <q-card class="bg-white">
        <!-- <q-img
          alt="PantryPal logo"
          src="~assets/PantryPal_Logo_noBG.png"
          fit="contain"
        /> -->
        <q-card-section>
          <div class="text-h6" >
            Complete the form below to donate food to the pantry.

          </div>
          <div class="text-subtitle2">
            Then track your donation status on your profile page.
           </div> 
        </q-card-section>
        <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              autofocus
            >
              <q-input
                  data-cy="input-food"
                  type="textarea"
                  filled
                  v-model="food"
                  label="In a few words describe the food donation*"
                  color="secondary"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                data-cy="input-orgName"
                filled
                v-model="orgDisplayName"
                label="Organization Display Name*"
                color="secondary"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                data-cy="input-dateActive"
                type="date"
                filled
                v-model="date_active"
                label="Date when available*"
                color="primary"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                data-cy="input-dateExpires"
                type="date"
                filled
                v-model="date_expires"
                label="Date you want this donation posting to expire*"
                color="primary"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                  data-cy="input-contactName"
                  filled
                  v-model="contactName"
                  label="Contact Name*"
                  color="secondary"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                  data-cy="input-contactEmail"
                  type="email"
                  filled
                  v-model="contactEmail"
                  label="Contact Email*"
                  color="secondary"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something',
                            val => val && /.+@.+\..+/.test(val) || 'Please enter a valid email address']"
              />
              <q-input
                  data-cy="input-contactPhone"
                  type="tel"
                  filled
                  v-model="contactPhone"
                  label="Contact Phone*"
                  color="secondary"
                  lazy-rules
                  mask="(###) ### - ####"
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                  data-cy="input-pickupStreetAddress"
                  filled
                  v-model="pickup_streetAddress"
                  label="Street Address of pickup location*"
                  color="secondary"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                  data-cy="input-pickupCity"
                  filled
                  v-model="pickup_city"
                  label="City of pickup location*"
                  color="secondary"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-select
                data-cy="input-pickupState"
                filled
                v-model="pickup_state"
                :options="states"
                label="State of pickup location*"
                :rules="[ val => val !== null || 'Please select an option']"
              />
              <q-input
                  data-cy="input-pickupZip"
                  filled
                  v-model="pickup_zip"
                  label="Zip Code of pickup location*"
                  color="secondary"
                  lazy-rules
                  mask="#####"
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <div>
                <q-btn label="Submit" type="submit" color="primary" data-cy="submit-donation"/>
                <q-btn label="Reset Form" type="reset" color="primary" flat/>
              </div>
            </q-form>

        </q-card-section>
      </q-card>
    </div>


  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

export default defineComponent({
  name: 'PantryPage',
  setup () {
    const $q = useQuasar() // used for notifications
    const donatees = ref([]) // array of donatees to notify
    const currentUserEmail = ref(null) 
    const currentUserId = ref(null) // used to store current user's email and id
    // used to store donation dates for active, expiration, and pickup
    const date_active = ref(null) 
    const date_expires = ref(null)
    const date_pickup = ref(null)
    const router = useRouter(); // used to redirect to other pages
    // used to store donation food description, organization name, contact name, email, phone, and pickup location
    const food = ref(null) 
    const orgDisplayName = ref(null)
    const contactName = ref(null)
    const contactEmail = ref(null)
    const contactPhone = ref(null)
    const pickup_streetAddress = ref(null)
    const pickup_city = ref(null)
    const pickup_zip = ref(null)
    const pickup_state = ref(null)
    const donationID = ref(0) // used to store most recent donation ID as an int for the supabase table
    // Array of states for q-select
    const states = ref([
          { label: 'Alabama', value: 'AL' },
          { label: 'Alaska', value: 'AK' },
          { label: 'Arizona', value: 'AZ' },
          { label: 'Arkansas', value: 'AR' },
          { label: 'California', value: 'CA' },
          { label: 'Colorado', value: 'CO' },
          { label: 'Connecticut', value: 'CT' },
          { label: 'Delaware', value: 'DE' },
          { label: 'Florida', value: 'FL' },
          { label: 'Georgia', value: 'GA' },
          { label: 'Hawaii', value: 'HI' },
          { label: 'Idaho', value: 'ID' },
          { label: 'Illinois', value: 'IL' },
          { label: 'Indiana', value: 'IN' },
          { label: 'Iowa', value: 'IA' },
          { label: 'Kansas', value: 'KS' },
          { label: 'Kentucky', value: 'KY' },
          { label: 'Louisiana', value: 'LA' },
          { label: 'Maine', value: 'ME' },
          { label: 'Maryland', value: 'MD' },
          { label: 'Massachusetts', value: 'MA' },
          { label: 'Michigan', value: 'MI' },
          { label: 'Minnesota', value: 'MN' },
          { label: 'Mississippi', value: 'MS' },
          { label: 'Missouri', value: 'MO' },
          { label: 'Montana', value: 'MT' },
          { label: 'Nebraska', value: 'NE' },
          { label: 'Nevada', value: 'NV' },
          { label: 'New Hampshire', value: 'NH' },
          { label: 'New Jersey', value: 'NJ' },
          { label: 'New Mexico', value: 'NM' },
          { label: 'New York', value: 'NY' },
          { label: 'North Carolina', value: 'NC' },
          { label: 'North Dakota', value: 'ND' },
          { label: 'Ohio', value: 'OH' },
          { label: 'Oklahoma', value: 'OK' },
          { label: 'Oregon', value: 'OR' },
          { label: 'Pennsylvania', value: 'PA' },
          { label: 'Rhode Island', value: 'RI' },
          { label: 'South Carolina', value: 'SC' },
          { label: 'South Dakota', value: 'SD' },
          { label: 'Tennessee', value: 'TN' },
          { label: 'Texas', value: 'TX' },
          { label: 'Utah', value: 'UT' },
          { label: 'Vermont', value: 'VT' },
          { label: 'Virginia', value: 'VA' },
          { label: 'Washington', value: 'WA' },
          { label: 'West Virginia', value: 'WV' },
          { label: 'Wisconsin', value: 'WI' },
          { label: 'Wyoming', value: 'WY' },
        ])

      // Get current user from Supabase session
      const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        currentUserEmail.value  = user.email;
        currentUserId.value = user.id;
        } catch (error) {
          console.error('Failed to fetch user id and email from supa session', error);
        }
      };

      // Get array of donatees from Supabase
      const getDonatees = async () => {
        try{
          const {data, error} = await supabase
            .from('Accounts')
            .select('user_id')
            .filter('Donation_Status', 'eq', false)
          if (error){
            throw error;
          }

        return donatees.value = data;
        
        } catch (error) {
          console.error('Failed to fetch donatees', error);
          return [];
        }
      }
      // Get most recent donation ID from Supabase
      const getDonationID = async () => {
        try{
          const {data, error} = await supabase
            .from('donations')
            .select('id')
            .order('id', { ascending: false })
            .limit(1)
          if (error){
            throw error;
          }
          
          return donationID.value = data[0].id;
          
        } catch (error) {
          console.error('Failed to fetch donation ID', error);
          return [];
        }
      }
      // Notify all donatees of new donation
      const notifyDonatees = async () => {
        // Get donatees from Supabase and store in donatees array and recent donationID
        // To prevent duplicate notifications, use Set to remove duplicates
        donatees.value = Array.from(new Set(await getDonatees()));
        donationID.value = await getDonationID();
        donationID.value = parseInt(donationID.value);
        // Send notification to each donatee
        for (let i = 0; i < donatees.value.length; i++) {
          try {
            let { error } = await supabase
              .from('Notifications')
              .insert(
                {
                  user_id: donatees.value[i].user_id,
                  notification_type: 'A new donation has been posted!',
                  dismissed: false,
                  donation_id: donationID.value,
                  time: new Date(),
                },
              )
            if (error) {
              console.error('Error inserting notification:', error);
            } 
          } catch (error) {
            console.error('Error inserting notification:', error);
          }
         
        }
      }

    onMounted(() => {
      
    });

    return {
      food,
      orgDisplayName,
      contactName,
      contactEmail,
      contactPhone,
      pickup_streetAddress,
      pickup_city,
      pickup_state,
      states,
      pickup_zip,
      date_active,
      date_expires,
      date_pickup,
      currentUserId,
      currentUserEmail,
      getCurrentUser,
      donatees,
      getDonatees,
      getDonationID,
      donationID,
      notifyDonatees,
 


      async onSubmit () {
        // Get current user email and id
        await getCurrentUser();
        // Access donations table and insert new donation
        try {
          let { error } = await supabase
            .from('donations')
            .insert(
              {
                date_active: date_active.value,
                date_expires: date_expires.value,
                food: food.value,
                org_displayname: orgDisplayName.value,
                contact_name: contactName.value,
                contact_email: contactEmail.value,
                contact_phone: contactPhone.value,
                pickup_streetaddress: pickup_streetAddress.value,
                pickup_city: pickup_city.value,
                pickup_zip: pickup_zip.value,
                pickup_state: pickup_state.value.value,
                donator_id: currentUserId.value,
                user_email: currentUserEmail.value,
                reserved: false,
                donatee_id: null,
              },
            )



          if (error) {
            console.error('Error inserting donation:', error);
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Donation submission failed'
            });

          } else {
            // Notify all donatees of new donation
            await notifyDonatees();
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Donation added to pantry'
            });
            // Redirect to profile page to see active donations
            router.push('/profile')
          }
        } catch (error) {
          console.error('Error inserting donation:', error);
        }
       

      },
      onReset () {
        // Reset all form fields
        orgDisplayName.value = null
        contactName.value = null
        contactEmail.value = null
        contactPhone.value = null
        pickup_streetAddress.value = null
        pickup_city.value = null
        pickup_zip.value = null
        pickup_state.value = null

      }
    }
  }
})
</script>
