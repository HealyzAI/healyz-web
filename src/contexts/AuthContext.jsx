import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, TABLES, PLAN_TYPES } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signUp = async (email, password, fullName, username) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || '',
            display_name: username || ''
          }
        }
      });

      if (error) throw error;

      // If user is created successfully, update their profile in the users table
      if (data.user && !data.user.email_confirmed_at) {
        // For new signups, we'll handle profile creation in the auth state change listener
        // This avoids the password_hash constraint issue
        console.log('User signed up successfully, profile will be created on email confirmation');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setCurrentUser(null);
      setUserProfile(null);
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  };

  // Google sign in function
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { data: null, error };
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from(TABLES.USERS)
        .update(updates)
        .eq('id', currentUser.id)
        .select()
        .single();

      if (error) throw error;

      setUserProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error };
    }
  };

  // Get user profile
  const getUserProfile = async (userId) => {
    try {
      // Since the new schema requires password_hash in users table,
      // we'll use the auth.users data instead of custom users table
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      // Return user data from auth.users with plan info from subscriptions
      if (user) {
        // Get subscription info
        const { data: subscription } = await supabase
          .from(TABLES.SUBSCRIPTIONS)
          .select(`
            *,
            plans (
              name,
              price,
              features
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        return {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          username: user.user_metadata?.display_name || '',
          created_at: user.created_at,
          plan: subscription?.plans?.name || 'free',
          subscription: subscription
        };
      }
      
      return null;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  };

  // Save AI result
  const savePrediction = async (predictionData) => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from(TABLES.AI_RESULTS)
        .insert([
          {
            user_id: currentUser.id,
            health_score: predictionData.health_score || 0,
            ai_message: predictionData.ai_message || '',
            extra_data: predictionData.extra_data || {},
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Save AI result error:', error);
      return { data: null, error };
    }
  };

  // Get user AI results
  const getUserPredictions = async () => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from(TABLES.AI_RESULTS)
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get user AI results error:', error);
      return { data: null, error };
    }
  };

  // Check if user has premium access
  const hasPremiumAccess = () => {
    return userProfile?.plan === PLAN_TYPES.PLUS || 
           userProfile?.plan === PLAN_TYPES.PREMIUM || 
           userProfile?.plan === PLAN_TYPES.ENTERPRISE;
  };

  // Check if user has enterprise access
  const hasEnterpriseAccess = () => {
    return userProfile?.plan === PLAN_TYPES.ENTERPRISE;
  };

  // Check if user has advanced features (Premium and Enterprise)
  const hasAdvancedAccess = () => {
    return userProfile?.plan === PLAN_TYPES.PREMIUM || 
           userProfile?.plan === PLAN_TYPES.ENTERPRISE;
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user);
        
        if (session?.user) {
          setCurrentUser(session.user);
          console.log('Current user set:', session.user);
          
          // Get user profile
          let profile = await getUserProfile(session.user.id);
          console.log('User profile fetched:', profile);
          
          // If no profile exists, create one (for new signups)
          if (!profile && session.user.user_metadata) {
            console.log('Creating new profile for user:', session.user.id);
            try {
              // Note: In the new schema, users table requires password_hash
              // Since we're using Supabase Auth, we'll skip creating profile in users table
              // and rely on auth.users table instead
              console.log('Skipping profile creation - using auth.users table');
            } catch (error) {
              console.error('Error creating user profile:', error);
            }
          }
          
          setUserProfile(profile);
          console.log('User profile set:', profile);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          console.log('User logged out');
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    updateUserProfile,
    getUserProfile,
    savePrediction,
    getUserPredictions,
    hasPremiumAccess,
    hasEnterpriseAccess,
    hasAdvancedAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

