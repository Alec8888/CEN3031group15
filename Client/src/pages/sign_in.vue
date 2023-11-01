<template>
  <q-page class="column items-center">
  <!-- <div class="column items-center"> -->

    <q-card>
      <!-- <q-card-section>
        <img
          alt="PantryPal logo"
          src="~assets/PantryPal-Logo.png"
          style="width: 300px; height:300px"
        >
      </q-card-section> -->
      <q-card-section>
        <div class="text-subtitle2">Sign in to PantryPal</div>
      </q-card-section>

      <q-card-section>
        <q-form
          action="http://localhost:8000/#/api"
          method="post"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-sm"
        >
          <q-input
            filled
            type="email"
            v-model="email"
            label="Email address*"
            lazy-rules
            color="secondary"
            :rules="[
              val => val && val.length > 0 || 'Please type something',
              val => /^.+@.+\..+$/.test(val) || 'Please type a valid email'
            ]"
          />
    
          <q-input
              filled
              v-model="password"
              label="Password*"
              lazy-rules
              color="secondary"
              :rules="[ val => val && val.length > 0 || 'Please type something',
                        val => val && val.length > 7 || 'Password must be at least 8 characters long']"
            />
    
            <q-btn label="Submit" type="submit" color="primary"/>
        </q-form>

      </q-card-section>

    </q-card>
    
    


  <!-- </div> -->
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    components: { 

     },
    setup() {
        const $q = useQuasar();
        const email = ref(null);
        const password = ref(null);

        // define methods here, if any

        return {

            email,
            password,

            async onSubmit() {
               
                  console.log(email.value);
                  console.log(password.value);

                  let response = await fetch('http://localhost:8000/#/api', {
                      method: 'POST',
                      body: JSON.stringify({
                          email: email.value,
                          password: password.value,
                      })
                  });

                  let formResponse = await response.json();

                  if (formResponse.isSuccess) {
                      // do something
                      $q.notify({
                          color: 'green-4',
                          textColor: 'white',
                          icon: 'cloud_done',
                          message: 'Log in successfull'
                      });
                  }
            },
            onReset() {

            }
        };
    }
}
</script>
