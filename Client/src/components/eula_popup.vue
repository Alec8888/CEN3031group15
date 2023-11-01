<template>
   <div>
    
     <q-card>
         <q-card-section>
           <div class="text-h6">User License Agreement (ULA) for PantryPal</div>
         </q-card-section>
 
         <q-card-section>
            <div class="text-subtitle2">Introduction:</div>
            <div class="text-body2">
              This User License Agreement ("Agreement") governs the use of the PantryPal mobile application ("App") operated by PantryPal Inc. ("we", "our", or "us"). By using the App, you agree to the terms outlined herein.
            </div>
            <div class="text-subtitle2">Purpose:</div>
            <div class="text-body2">
              The App facilitates the donation and reservation of surplus food by connecting registered companies with food banks and charities.
            </div>
            <div class="text-subtitle2">Registration:</div>
            <div class="text-body2">
              Companies and charitable organizations must register to use the App. Accurate information is required for a transparent and trustworthy environment.
            </div>
            <div class="text-subtitle2">User Responsibilities:</div>
            <div class="text-body2">
              Users agree to abide by local laws and regulations regarding food safety and donations.
            </div>
            <div class="text-subtitle2">Data Privacy:</div>
            <div class="text-body2">
              We respect user privacy and adhere to data protection laws. Please refer to our Privacy Policy for more details.
            </div>
            <div class="text-subtitle2">Liability:</div>
            <div class="text-body2">
              We disclaim liability for any damages or losses incurred through the use of the App.
            </div>
            <div class="text-subtitle2">Termination:</div>
            <div class="text-body2">
              We reserve the right to terminate accounts that violate this Agreement.
            </div>
            <div class="text-subtitle2">Governing Law:</div>
            <div class="text-body2">
              This Agreement is governed by the laws of the State of Florida, USA.
            </div>
            <div class="text-subtitle2">Contact:</div>
            <div class="text-body2">
              For any inquiries or concerns, contact us at support@pantrypal.com.
            </div>
            <div class="text-subtitle2">This Agreement is subject to change. Continued use of the App signifies acceptance of updated terms.</div>
              
         </q-card-section>
 
         <q-card-actions align="right">
           <q-btn label="OK" color="primary" v-close-popup />
         </q-card-actions>
       </q-card>
   </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'eula_popup'
})
</script>
