<template>
  <q-page class="column items-center">
    <!-- <q-btn label="test route" @click="testRoutes" /> -->

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
        >
          <q-input
            name="email"
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
              name="password"
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

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const $q = useQuasar();
        const email = ref(null);
        const password = ref(null);

        const isPwd = ref(true);
        const onSubmit = async () => {
          console.log('log in clicked: ' + email.value + ' ' + password.value)

          let response = await fetch('http://localhost:8000/home/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requestType: "login",
              email: email.value,
              password: password.value,
            }),
          });

          let data = await response.json();
          console.log(data.accessToken);
          if (response.status == 200) {

            // Store the JWT in localStorage
            localStorage.setItem('token', data.accessToken);
            console.log('token: ' + data.accessToken);

            // Notify the user
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Log in successful'
            });

            // setCurrentUser();
            console.log('email in setCurrentUser: ' + email.value);
            let resp = await fetch('http://localhost:3000/currentUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.value,
                isLogged: true
              }),
            });

            // Redirect the user to the home page
            router.push('/home')

          } else {
            // Handle login failure...
            $q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Log in failed'
            });
          }
        };
        const router = useRouter();
        // const testRoutes = () => {
        //   router.push('/home')
        // };

        return {
            email,
            password,
            isPwd,
            onSubmit,
            router

        };
    }
})
</script>
