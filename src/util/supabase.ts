import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  // import.meta.env.VITE_SUPABASE_URL,
  // import.meta.env.VITE_SUPABASE_ANON_KEY
  'https://oclfwraptcrsxxyjhqgd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbGZ3cmFwdGNyc3h4eWpocWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2MjAyODAsImV4cCI6MjAwMTE5NjI4MH0.9ePo-xGG8uomO6LB8TETlDUQ5KcmRSCm7OIuH7qoxrs'
)
