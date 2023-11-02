<template>
  <q-page class="bg-secondary q-pa-md">
    <q-card class="bg-white">
      <q-card-section>
        <div class="text-h6">
          Complete the form below to register for PantryPal.
        </div>
      </q-card-section>
      <q-card-section>


          <!-- I don't think I'm using the action= part of this form, just using it for validation really. -->
          <q-form
            action="http://localhost:8000/#/api"  
            method="post"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            autofocus
          >
            <q-option-group
              v-model="donate"
              :options="[
                { label: 'I want to donate food', value: true },
                { label: 'I want to receive food', value: false }
              ]"
              color="primary"
              inline
              :rules="[ val => val !== null || 'Please select an option']"
            />
            <q-input
              filled
              v-model="name"
              label="First and last name*"
              color="secondary"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
      
            <q-input
              filled
              type="email"
              v-model="email"
              label="Email address*"
              hint="This will be your username"
              lazy-rules
              color="secondary"
              :rules="[
                val => val && val.length > 0 || 'Please type something',
                val => /^.+@.+\..+$/.test(val) || 'Please type a valid email'
              ]"
            />
      
            
            <q-input
              filled
              v-model="organization"
              label="Organization or company name*"
              lazy-rules
              color="secondary"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="streetAddress"
              label="Street address*"
              lazy-rules
              color="secondary"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            /> 
      
            <q-input
              filled
              v-model="city"
              label="City*"
              lazy-rules
              color="secondary"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-select
              filled
              v-model="state" 
              :options="states" 
              label="State*"
              :rules="[ val => val !== null || 'Please select an option']"
            />
      
            <q-input
              filled
              v-model="zip"
              label="Zip code*"
              lazy-rules
              color="secondary"
              mask="#####"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
      
            <q-input
              type="tel"
              filled
              v-model="phone"
              label="Phone number*"
              lazy-rules
              color="secondary"
              mask="(###) ### - ####"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
                filled
                v-model="password"
                label="Password*"
                lazy-rules
                color="secondary"
                :type="isPwd ? 'password' : 'text'"
                :rules="[ val => val && val.length > 0 || 'Please type something',
                          val => val && val.length > 7 || 'Password must be at least 8 characters long']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
        
            <q-input
                filled
                v-model="confirm_password"
                label="Confirm Password*"
                lazy-rules
                color="secondary"
                :type="isPwd ? 'password' : 'text'"
                :rules="[ val => val && val.length > 0 || 'Please type something',
                          val => val && val.length > 7 || 'Password must be at least 8 characters long',
                          val => val && val === password || 'Passwords must match']"
              >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-chip clickable @click="read_eula = true">Read license and terms</q-chip>
      
            <div>
              <q-toggle v-model="accept" label="I accept the license and terms" />
            </div>
      
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset Form" type="reset" color="primary" flat/>
            </div>
          </q-form>

      </q-card-section>

    </q-card>
  
    <q-dialog v-model="read_eula">
        <eula_popup />
    </q-dialog>

  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import eula_popup from 'components/eula_popup.vue'

export default {
    components: { 
      eula_popup,
     },
    setup() {
        const $q = useQuasar()
        const name = ref(null)
        const email = ref(null)
        const donate = ref(null)
        const organization = ref(null)
        const streetAddress = ref(null)
        const city = ref(null)
        const state = ref(null)
        const zip = ref(null)
        const phone = ref(null)
        const password = ref(null)
        const confirm_password = ref(null)
        const read_eula = ref(false)
        const accept = ref(false)
        const isPwd = ref(true)
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

        return {
            name,
            email,
            organization,
            donate,
            streetAddress,
            city,
            state,
            zip,
            phone,
            password,
            confirm_password,
            read_eula,
            accept,
            isPwd,
            states,

            async onSubmit() {
                if (accept.value !== true) {
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'You need to accept the license and terms first'
                    });
                }
                else {
                    console.log(name.value);
                    console.log(email.value);
                    console.log(organization.value);
                    console.log(donate.value);
                    console.log(streetAddress.value);
                    console.log(city.value);
                    console.log(state.value);
                    console.log(zip.value);

                    let response = await fetch('http://localhost:8000/#/api', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: name.value,
                            email: email.value,
                            donate: donate.value,
                            organization: organization.value,
                            streetAddress: streetAddress.value,
                            city: city.value,
                            state: state.value,
                            zip: zip.value,
                            phone: phone.value,
                            password: password.value,
                        })
                    });
                    let formResponse = await response.json();
                    if (formResponse.isSuccess) {
                        // Go to the post food page
                      
                        $q.notify({
                            color: 'green-4',
                            textColor: 'white',
                            icon: 'cloud_done',
                            message: 'Form submitted successfully'
                        });
                    }
                }
            },
            onReset() {
                name.value = null;
                accept.value = false;
                //reset all form fields
                email.value = null;
                donate.value = null;
                organization.value = null;
                streetAddress.value = null;
                city.value = null;
                state.value = null;
                zip.value = null;
                phone.value = null;
                password.value = null;
                confirm_password.value = null;

            }
        };
    }
}
</script>
