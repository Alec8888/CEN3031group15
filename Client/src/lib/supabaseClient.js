import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://preudbpdnhcigtnuiuit.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZXVkYnBkbmhjaWd0bnVpdWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxOTI1NzcsImV4cCI6MjAxNTc2ODU3N30.h37-_6pj-LV7zQ7mweKnM1DZ8hJN_lMIwRqJPT5FpHI')