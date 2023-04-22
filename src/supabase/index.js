
import { createClient } from '@supabase/supabase-js'

const supabaseURL = 'https://szjouninnxykwhzmaihd.supabase.co'
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6am91bmlubnh5a3doem1haWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjk4MzMsImV4cCI6MTk5NjgwNTgzM30.iyvI1SOYUZNMuerGzquziKTtUKamKOtyCRkRfdej2jg'

// Create a single supabase client for interacting with your database
export default createClient(supabaseURL, supabaseAPIKey)
