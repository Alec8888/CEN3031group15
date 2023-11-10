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
          action="http://localhost:8000/home/"
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

                  let response = await fetch('http://localhost:8000/home/', {
                      method: 'POST',
                      body: JSON.stringify({
                          requestType: "login",
                          email: email.value,
                          password: password.value,
                      })
                  });

                  //collect returned user data
                  let formResponse = await response;
                  let formData = await formResponse.text()

                  //variables for parsing data
                  let nextAttribute = ""
                  var userAttributes = []
                  var currentPosition = 0

                  //parse data
                  for(let i = 0; i < formData.length; ++i)
                  {
                      if(formData.at(i) == '(' || formData.at(i) == ',' || formData.at(i) == '\'' || formData.at(i) == ')')
                      {
                        continue
                      }
                      else if(formData.at(i) == ' ')
                      {
                        userAttributes[currentPosition] = nextAttribute
                        nextAttribute = ""
                        currentPosition += 1
                      }
                      else
                      {
                         nextAttribute += formData.at(i)
                      }
                  }

                  console.log(userAttributes)

                  if (formResponse.ok) {
                      console.log("success");
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
