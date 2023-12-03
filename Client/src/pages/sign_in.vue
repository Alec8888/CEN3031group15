<template>
  <q-page class="column items-center" style="background-image: url(https://preudbpdnhcigtnuiuit.supabase.co/storage/v1/object/public/images/bg.png); background-size: cover;">
    <!-- <q-btn label="test route" @click="testRoutes" /> -->

    <div class="self-center">
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
            data-cy="email-input"
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


          <q-btn label="Log In" type="submit" color="primary" style="width: 270px;"/>
          <div class="text-caption">
            Not registered? 
            <router-link 
              to="/register"
              data-cy="link_register">
              Create an account
            </router-link>
          </div>
        </q-form>

      </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>

<style>

.self-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>



<script lang="ts">
import { useQuasar } from 'quasar'
import { supabase } from 'src/lib/supabaseClient';
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const email = ref(null);
        const password = ref(null);
        const isPwd = ref(true);

        // when the user clicks the login button
        const onSubmit = async () => {

          // sign in with Supabase
          let { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
          });

          if (!error) {
            // Handle log in success
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Log in successful'
            });
            router.push('/profile');

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
