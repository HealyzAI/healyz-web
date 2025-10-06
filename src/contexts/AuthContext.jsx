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

      // If user is created successfully, insert into our custom users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from(TABLES.USERS)
          .insert({
            id: data.user.id,
            full_name: fullName,
            username: username,
            email: email,
            created_at: data.user.created_at
          });
        if (profileError) throw profileError;
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
      // First, try to get the profile from our custom users table
      let { data: profile, error: profileError } = await supabase
        .from(TABLES.USERS)
        .select(`
          *,
          subscriptions (
            *,
            plans (
              name,
              price,
              features
            )
          )
        `)
        .eq('id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error fetching custom user profile:', profileError);
        // If there's an error other than 

        throw profileError;
      }

      if (profile) {
        // Format the profile data to match the expected structure
        return {
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name || 
                     currentUser?.user_metadata?.full_name || 
                     profile.username || 
                     currentUser?.user_metadata?.display_name || 
                     profile.email.split('@')[0],
          username: profile.username || 
                    currentUser?.user_metadata?.display_name || 
                    profile.email.split('@')[0],
          created_at: profile.created_at,
          plan: profile.subscriptions?.[0]?.plans?.name || PLAN_TYPES.FREE,
          subscription: profile.subscriptions?.[0] || null
        };
      } else {
        // If no profile in custom table, create one based on auth.user data
        const { data: { user }, error: authUserError } = await supabase.auth.getUser();
        if (authUserError) throw authUserError;

        if (user) {
          const newProfile = {
            id: user.id,
            full_name: user.user_metadata?.full_name || 
                       user.email.split('@')[0],
            username: user.user_metadata?.display_name || 
                      user.email.split('@')[0],
            email: user.email,
            created_at: user.created_at
          };

          const { error: insertError } = await supabase
            .from(TABLES.USERS)
            .insert(newProfile);

          if (insertError) {
            console.error("Error inserting new profile into custom users table:", insertError);
            // Even if insert fails, return a basic profile from auth.user
            return {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email.split('@')[0],
              username: user.user_metadata?.display_name || user.email.split('@')[0],
              created_at: user.created_at,
              plan: PLAN_TYPES.FREE,
              subscription: null
            };
          }

          // Try to fetch again after insert to get subscription info
          let { data: updatedProfile, error: updatedProfileError } = await supabase
            .from(TABLES.USERS)
            .select(`
              *,
              subscriptions (
                *,
                plans (
                  name,
                  price,
                  features
                )
              )
            `)
            .eq("id", userId)
            .single();

          if (updatedProfileError) {
            console.error("Error fetching updated profile after insert:", updatedProfileError);
            return newProfile; // Return basic profile if fetch fails
          }

          return {
            id: updatedProfile.id,
            email: updatedProfile.email,
            full_name: updatedProfile.full_name || 
                       currentUser?.user_metadata?.full_name || 
                       updatedProfile.username || 
                       currentUser?.user_metadata?.display_name || 
                       updatedProfile.email.split('@')[0],
            username: updatedProfile.username || 
                      currentUser?.user_metadata?.display_name || 
                      updatedProfile.email.split('@')[0],
            created_at: updatedProfile.created_at,
            plan: updatedProfile.subscriptions?.[0]?.plans?.name || PLAN_TYPES.FREE,
            subscription: updatedProfile.subscriptions?.[0] || null
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Get user profile error:", error);
      return null;
    }
  };

  // Save AI result
  const savePrediction = async (predictionData) => {
    try {
      if (!currentUser) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from(TABLES.AI_RESULTS)
        .insert([
          {
            user_id: currentUser.id,
            health_score: predictionData.health_score || 0,
            ai_message: predictionData.ai_message || "",
            extra_data: predictionData.extra_data || {},
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Save AI result error:", error);
      return { data: null, error };
    }
  };

  // Get user AI results
  const getUserPredictions = async () => {
    try {
      if (!currentUser) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from(TABLES.AI_RESULTS)
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Get user AI results error:", error);
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
        console.log("Auth state change:", event, session?.user);
        
        if (session?.user) {
          setCurrentUser(session.user);
          console.log("Current user set:", session.user);
          
          // Get user profile
          let profile = await getUserProfile(session.user.id);
          console.log("User profile fetched:", profile);
          
          setUserProfile(profile);
          console.log("User profile set:", profile);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          console.log("User logged out");
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

