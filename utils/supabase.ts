import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://podyhkevztlgeushefwk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvZHloa2V2enRsZ2V1c2hlZndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NDIzMDgsImV4cCI6MjA1MDMxODMwOH0.kQaGbdj8GaNhQUkNOvadI-eoJKOUA4ae6rj9GjWJNDY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
