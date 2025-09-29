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
  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (authError) {
        console.error("Supabase Auth Sign Up Error:", authError);
        throw authError;
      }

      // Create user profile in database
      if (data.user) {
        const { error: profileError } = await supabase
          .from(TABLES.USERS)
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              plan: PLAN_TYPES.STARTER,
              created_at: new Date().toISOString(),
              ...userData
            }
          ]);

        if (profileError) {
          console.error("Supabase Profile Insert Error:", profileError);
          throw profileError;
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error("Sign up function caught error:", error);
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
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  };

  // Save prediction
  const savePrediction = async (predictionData) => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from(TABLES.PREDICTIONS)
        .insert([
          {
            user_id: currentUser.id,
            ...predictionData,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Save prediction error:', error);
      return { data: null, error };
    }
  };

  // Get user predictions
  const getUserPredictions = async () => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from(TABLES.PREDICTIONS)
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get predictions error:', error);
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
        if (session?.user) {
          setCurrentUser(session.user);
          
          // Get user profile
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
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

