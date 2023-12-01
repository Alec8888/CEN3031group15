<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">

      <q-card class="bg-white">
        <q-card-section>
          <div class="text-h6">
            Complete the form below to register for PantryPal.
          </div>
        </q-card-section>
        <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              autofocus
            >
              <q-option-group
                data-cy="donate-input"
                v-model="donate"
                :options="[
                  { label: 'I want to donate food.', value: true },
                  { label: 'I want to receive food.', value: false }
                ]"
                color="primary"
                inline
                :rules="[ val => val !== null || 'Please select an option']"
              />
              <q-input
                data-cy="name-input"
                filled
                v-model="name"
                label="First and last name*"
                color="secondary"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                data-cy="email-input"
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
                data-cy="orgName-input"
                filled
                v-model="organization"
                label="Organization or company name*"
                lazy-rules
                color="secondary"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                data-cy="streetAddress-input"
                filled
                v-model="streetAddress"
                label="Street address*"
                lazy-rules
                color="secondary"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                data-cy="city-input"
                filled
                v-model="city"
                label="City*"
                lazy-rules
                color="secondary"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-select
                data-cy="state-input"
                filled
                v-model="state"
                :options="states"
                label="State*"
                :rules="[ val => val !== null || 'Please select an option']"
              />

              <q-input
                data-cy="zip-input"
                filled
                v-model="zip"
                label="Zip code*"
                lazy-rules
                color="secondary"
                mask="#####"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                data-cy="phone-input"
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
                  data-cy="password-input"
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
                  data-cy="confirm-password-input"
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
              <q-chip
                clickable
                @click="read_eula = true"
                data-cy="eula-link"
                >
                Read license and terms
              </q-chip>

              <div>
                <q-toggle data-cy="eula-accept" v-model="accept" label="I accept the license and terms" />
              </div>

              <div>
                <q-btn data-cy="submit-register" label="Submit" type="submit" color="primary"/>
                <q-btn data-cy="reset-btn" label="Reset Form" type="reset" color="primary" flat/>
              </div>
            </q-form>

        </q-card-section>

      </q-card>
    </div>

    <q-dialog v-model="read_eula">
        <eula_popup />
    </q-dialog>

      </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import eula_popup from 'components/eula_popup.vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/lib/supabaseClient'

export default {
    components: {
      eula_popup,
     },
    setup() {
        const router = useRouter();
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
                // else if donate is null then error
                else if (donate.value === null) {
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'You need to select an option'
                    });
                }
                else {
                    // Register user with Supabase
                    let { data, error } = await supabase.auth.signUp({
                        email: email.value,
                        password: password.value,
                    })

                    const { data: { user } } = await supabase.auth.getUser()
                    console.log(user.id);

                    // Store user data that is not part of the auth table
                      let { error1 } = await supabase.from('Accounts').
                      insert({
                        Name: name.value,
                        Phone: phone.value,
                        Donation_Status: donate.value,
                        Address: streetAddress.value,
                        City: city.value,
                        State: state.value.value,
                        Zip: zip.value,
                        Organization: organization.value,
                        user_id: user.id,
                        Email: email.value,
                        },
                        )

                    // error notifications for user
                    if (error) {
                        $q.notify({
                            color: 'red-5',
                            textColor: 'white',
                            icon: 'warning',
                            message: 'Form submission failed authorization'
                        });
                    }
                    else if (error1) {
                      console.log(error1)
                        $q.notify({
                            color: 'red-5',
                            textColor: 'white',
                            icon: 'warning',
                            message: 'Form submission failed database'
                        });

                      }
                      // success notification for user
                      else {
                          $q.notify({
                              color: 'green-4',
                              textColor: 'white',
                              icon: 'cloud_done',
                              message: 'Registration successful!'
                          });
                          router.push('/signin')
                      }
              }
            },
            onReset() {
                name.value = null;
                accept.value = false;
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
