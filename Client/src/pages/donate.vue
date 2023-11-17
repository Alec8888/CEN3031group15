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
            Then track your donation status on your home page.
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
    const $q = useQuasar()
    const currentUserEmail = ref(null)
    const currentUserId = ref(null)
    const token = ref(null)
    const payload = ref(null)
    

    const date_active = ref(null)
    const date_expires = ref(null)
    const date_pickup = ref(null)
    const router = useRouter();
    const food = ref(null)
    const orgDisplayName = ref(null)
    const contactName = ref(null)
    const contactEmail = ref(null)
    const contactPhone = ref(null)
    const pickup_streetAddress = ref(null)
    const pickup_city = ref(null)
    const pickup_zip = ref(null)
    const pickup_state = ref(null)
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
    onMounted(() => {
      console.log('Donate page mounted!')
      try {
          // token = $q.localStorage.getItem('token');
          // console.log('token from local storage: ' + token);
          // console.log('email from token: ' + JSON.parse(atob(token.split('.')[1])).email);
          // console.log('user id from token: ' + JSON.parse(atob(token.split('.')[1])).sub);
        } catch (error) {
          console.error('Failed to fetch user id and email from local storage token:', error);
        }

        try {
          token.value = $q.localStorage.getItem('token');
          if (!token.value) throw new Error('No token found');

          payload.value = JSON.parse(atob(token.value.split('.')[1]));

          currentUserEmail.value  = payload.value.email;
          currentUserId.value = payload.value.sub;

          // Use currentUserEmail and currentUserId here
          console.log('Current user email and id: ' + currentUserEmail.value, currentUserId.value);
        } catch (error) {
          console.error('Failed to parse token: ', error);
        }

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
      token,
      payload,
      currentUserId,
      currentUserEmail,

      
      async onSubmit () {
        console.log('Submitted!')
        console.log('Current user email and id: ' + currentUserEmail.value, currentUserId.value);
        console.log(food.value)
        console.log(orgDisplayName.value)
        console.log(contactName.value)
        console.log(contactEmail.value)
        console.log(contactPhone.value)
        console.log(pickup_streetAddress.value)
        console.log(pickup_city.value)
        console.log(pickup_zip.value)
        console.log(pickup_state.value.value)

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
                user_id: currentUserId.value,
                user_email: currentUserEmail.value,
              },
            )

          if (error) {
            console.error('Error inserting donation:', error);
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Doneation submission failed'
            });

          } else {
            console.log('Donation added to pantry');
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Donation added to panry'
            });
            router.push('/home')
          }
        } catch (error) {
          console.error('Error inserting donation:', error);
        }

      },
      onReset () {
        console.log('Resetted!')
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
