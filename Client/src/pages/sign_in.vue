<template>
  <q-page class="bg-secondary column items-center">

    <q-card style="width: 300px; margin-top: 25px;" >

      <q-card-section> 
        <div class="text-h6">
          Sign in to PantryPal
        </div>
      </q-card-section>
      
      <q-card-section class="q-gutter-sm">
        <q-form
          action="http://localhost:8000/#/api"
          method="post"
          @submit="onSubmit"
          @reset="onReset"
          
        >
          <q-input
            autofocus
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

    
          <q-btn label="Log In" type="submit" color="primary" style="width: 270px;"/>
          <div class="text-caption">
            Not registered? <router-link to="/register">Create an account</router-link>
          </div>
        </q-form>
        
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import TabsLayout from 'src/layouts/tabsLayout.vue';
import { ref } from 'vue'

export default {
    setup() {
        const $q = useQuasar();
        const email = ref(null);
        const password = ref(null);
        const isPwd = ref(true);
        const onSubmit = async () => {
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
                  $q.notify({
                      color: 'green-4',
                      textColor: 'white',
                      icon: 'cloud_done',
                      message: 'Log in successfull'
                  });
                  // if successfull, route to posting page for donators else route to pantry
                  // code here...
              }
        };
        // this doesn't work. I can instead fake it with JSON SERVER later
        const fakeLogin = () => {
          console.log('Fake log in button clicked.');
          TabsLayout.isLoggedIn.value = true;
        }

        return {
            email,
            password,
            isPwd,
            onSubmit,
            fakeLogin

        };
    }
}
</script>
