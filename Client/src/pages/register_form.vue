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
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

    <div class="text-body1 q-pa-md">
      Input binding example: {{ inputBindingExample }}
      <q-input
        v-model="inputBindingExample"
        placeholder="Edit me..."
      />
    </div>

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

    const inputBindingExample = ref('')

    return {
      name,
      age,
      accept,
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
            // route to next page or whatever
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
