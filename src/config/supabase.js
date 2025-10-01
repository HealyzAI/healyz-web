// Supabase configuration for Healyz
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rksovchtajkiiqyqydoj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc292Y2h0YWpraWlxeXF5ZG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzU5NzAsImV4cCI6MjA3NDg1MTk3MH0.IMivB2D65cvRLyUKQhUYNKldd5nSK9nAOd6yd2CC9MI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  USERS: 'users',
  PLANS: 'plans',
  SUBSCRIPTIONS: 'subscriptions',
  USER_HEALTH_DATA: 'user_health_data',
  AI_RESULTS: 'ai_results'
};

// User plan types
export const PLAN_TYPES = {
  FREE: 'free',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise'
};

