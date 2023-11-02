<template>
  <div class="q-pa-md" style="max-width: 800px">

    <q-form
      action="http://localhost:8000/#/api"
      method="post"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      autofocus
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="First and last name"
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
        v-model="organization"
        label="Organization or company name*"
        hint="Name of entity donating or receiving food"
        lazy-rules
        color="secondary"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="streetAddress"
        label="Street address*"
        hint="Street address of organization or company"
        lazy-rules
        color="secondary"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      /> 

      <q-input
        filled
        v-model="city"
        label="City*"
        hint="City in which organization or company is located"
        lazy-rules
        color="secondary"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="state"
        label="State*"
        hint="State in which organization or company is located"
        lazy-rules
        color="secondary"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="zip"
        label="Zip code*"
        hint="Zip code of organization or company"
        lazy-rules
        color="secondary"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="phone"
        label="Phone number*"
        hint="Phone number of organization or company"
        lazy-rules
        color="secondary"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="password"
          label="Password*"
          hint="Password"
          lazy-rules
          color="secondary"
          :rules="[ val => val && val.length > 0 || 'Please type something',
                    val => val && val.length > 7 || 'Password must be at least 8 characters long']"
        />
  
      <q-input
          filled
          v-model="confirm_password"
          label="Confirm Password*"
          hint="Confirm Password"
          lazy-rules
          color="secondary"
          :rules="[ val => val && val.length > 0 || 'Please type something',
                    val => val && val.length > 7 || 'Password must be at least 8 characters long',
                    val => val && val === password || 'Passwords must match']"
        />
      <q-chip clickable @click="read_eula = true">Read license and terms</q-chip>

      <div>
        <q-toggle v-model="accept" label="I accept the license and terms" />
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset Form" type="reset" color="primary" flat/>
      </div>
    </q-form>

  </div>

  <q-dialog v-model="read_eula">
      <eula_popup />
  </q-dialog>
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
        const $q = useQuasar();
        const name = ref(null);
        const email = ref(null);
        const donate = ref(null);
        const organization = ref(null);
        const streetAddress = ref(null);
        const city = ref(null);
        const state = ref(null);
        const zip = ref(null);
        const phone = ref(null);
        const password = ref(null);
        const confirm_password = ref(null);
        const read_eula = ref(false);
        const accept = ref(false);

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
