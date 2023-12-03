<template>
  <q-page padding>

      <div class="row justify-center">
        <!-- Welcome Card -->
        <q-card class="bg-white" style="margin-bottom: 20px; max-width: 1220px;">
          <div class="q-pa-md q-gutter-md text-h6 q-items-center">
            <div class="row justify-center">
              <q-img
                alt="PantryPal logo"
                src="https://preudbpdnhcigtnuiuit.supabase.co/storage/v1/object/public/images/PantryPal_Logo_noBG.png?t=2023-11-19T00%3A53%3A32.290Z"
                fit="contain"
                style="width: 30%;"
              />
              </div>
              <div class="row justify-center">
                <div class="q-px-lg q-py-md text-h5 text-center">
                  Welcome to PantryPal! Connect with donators or food charities to make a difference in your community.
                </div>
                <div class="row justify-center"><div class="q-px-lg q-py-md text-body1 text-center">
                  Created by four students at the University of Florida, PantryPal seeks to impact communites across the US.  
                  For restaurants, fast food chains, hotels, grocery stores, and more who have excess food or food waste, 
                  PantryPal is an app that allows for businesses to easily donate their leftovers to local shelters and community 
                  organizations. Unlike complicated, larger scale food donation operations PantryPal has a local and 
                  community-centric focus, making food donation a simple and seamless experience between community organizations and establishments. 
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>

    <div class="row justify-center">

      <q-card class="bg-white" style="max-width: 600px; margin-right: 20px;">
        <div class="q-px-lg q-py-md">
          <q-timeline color="secondary">
            <q-timeline-entry heading>
              Donators:
            </q-timeline-entry>
    
            <q-timeline-entry
              title="Register"
              subtitle="Step 1"
              icon="app_registration"
            >
              <div>
                Click on the register tab to set up your buisness and start donating pantry items today!
              </div>
            </q-timeline-entry>
    
            <q-timeline-entry
              title="Sign In"
              subtitle="Step 2"
              icon="login"
            >
              <div>
                After your register, you'll be redirected to the sign in page to enter your credentials.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Add to Pantry"
              subtitle="Step 3"
              icon="add"
            >
              <div>
                On the donate tab, you can create listings for the food you want to donate. Simply fill out the form with the food and pick up information.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
                title="Wait for Pick Up"
                subtitle="Step 4"
                icon="handshake"
              >
                <div>
                  Once reserved, you'll receive a notification that a pick up party is on their way to grab your donation!
                </div>
              </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card>

      <q-card class="bg-white" style="max-width: 600px;">
        <div class="q-px-lg q-py-md">
          <q-timeline color="secondary">
              <q-timeline-entry heading>
                Food Charities:
              </q-timeline-entry>
      
              <q-timeline-entry
                title="Register"
                subtitle="Step 1"
                icon="app_registration"
              >
                <div>
                  Click on the register tab to set up your buisness and start receiving donations today!
                </div>
              </q-timeline-entry>
      
              <q-timeline-entry
                title="Sign In"
                subtitle="Step 2"
                icon="login"
              >
                <div>
                  After your register, you'll be redirected to the sign in page to enter your credentials.
                </div>
              </q-timeline-entry>
      
              <q-timeline-entry
                title="Reserve a Donation"
                subtitle="Step 3"
                icon="done_all"
              >
                <div>
                  Navigate the pantry page to find listings that suit what you're looking for.  Then, simply reserve a pick up and it will appear in your profile's active donations.
                </div>
              </q-timeline-entry>
      
              <q-timeline-entry
                title="Pick Up Your Food"
                subtitle="Step 4"
                icon="local_shipping"
              >
                <div>
                  Contact or notify your donator that your on the way, and grab your donation!
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </q-card>
    </div>
  </q-page>
</template>

    

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      // dataFromOracle: []

    }
  }
})
</script>
