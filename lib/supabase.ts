import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL || "https://zftckamxjfnlimupnapg.supabase.co";
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmdGNrYW14amZubGltdXBuYXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTA1MDcsImV4cCI6MjA5Mjg4NjUwN30.UFURS1h7Eevz_wk2Wfgt9E_i434U5YTGf1YOc2lLkYA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
