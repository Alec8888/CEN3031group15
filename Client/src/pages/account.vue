<template>
  <q-page padding class="q-gutter-md">
    <q-card>
        <div class="text-subtitle1">
          <q-btn flat color="secondary" :icon="showActivePanryItems ? 'expand_more' : 'chevron_right'" @click="showActive" />
          Active Donations
        </div>
    </q-card>

    
    <div v-if="showActivePanryItems" class="row q-gutter-md" style="margin-top: 5px;">
      <q-card class="donationCards bg-secondary text-white" v-for="(pantry_item, index) in pantryItems" :key="index">
        <q-card-section>
          <div class="text-h6">{{ pantry_item.org }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.food }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">{{ pantry_item.pickup_streetAddress }}</div>
          <div class="text-subtitle2">{{ pantry_item.pickup_city }} , {{ pantry_item.pickup_state.value }} {{ pantry_item.pickup_zip }}</div>
        </q-card-section>
        <q-separator dark />
        <q-card-actions class="justify-around">
          <q-btn flat @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    
    <q-card>
        <div class="text-subtitle1">
          <q-btn flat color="secondary" icon="expand_more" />
          Past Donations
        </div>
    </q-card>
    
    <q-card>
        <div class="text-subtitle1">
          <q-btn flat color="secondary" icon="expand_more" />
          Account Settings
        </div>
    </q-card>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref, watch, onMounted } from 'vue';

export default defineComponent({
  name: 'AccountPage',
  setup () {
    const pantryItems = ref([]);
    const showActivePanryItems = ref(true);
    
    const fetchOrganization = async () => {
      const response = await fetch('http://localhost:3000/pantry', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      pantryItems.value = data;
    }
    onMounted(fetchOrganization)

    const cancel = () => {
     console.log('Cancel button clicked.');
    }
    const showActive = () => {
      console.log('Show Active button clicked.');
      showActivePanryItems.value = !showActivePanryItems.value;
    }
    return {
      pantryItems,
      fetchOrganization,
      cancel,
      showActivePanryItems,
      showActive
      
    }
  }
})
</script>
