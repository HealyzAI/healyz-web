// Supabase configuration for Healyz
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://feymmqbqbhkkmiflkrbr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleW1tcWJxYmhra21pZmxrcmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDI2MjcsImV4cCI6MjA2NzI3ODYyN30.wzum1x17ugRUJDP0oo2CC1W4TonsQLFQkjVbVkrsCPI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  USERS: 'users',
  PREDICTIONS: 'predictions',
  SUBSCRIPTIONS: 'subscriptions'
};

// User plan types
export const PLAN_TYPES = {
  STARTER: 'starter',
  PLUS: 'plus',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise'
};

