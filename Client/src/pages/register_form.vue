<template>
  <div class="q-pa-md" style="max-width: 800px">

    <q-form
      action="http://localhost:8000/#/api"
      method="post"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
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
        v-model="street"
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

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>


  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {

  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)
    const showDialog = ref(false)
    const organization = ref(null)

    const inputBindingExample = ref('')

    return {
      name,
      age,
      accept,
      organization,
      inputBindingExample,

      async onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          
          let response = await fetch('http://localhost:8000/#/api', {
            method: 'POST',
            body: JSON.stringify({
              name: name.value,
              age: age.value
            })
          })

          let formResponse = await response.json()

          if (formResponse.isSuccess) {
            // server returns a success message or boolean
          }

          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted ' +  "name: " + name.value + ", age: " + age.value
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script>
