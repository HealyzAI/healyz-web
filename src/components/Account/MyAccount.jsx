import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Settings, CreditCard, History, LogOut, Edit, Save, X, Crown, Calendar, Mail } from 'lucide-react';

const MyAccount = () => {
  const { currentUser, userProfile, signOut, getUserPredictions } = useAuth();
  const navigate = useNavigate();
  const [aiResults, setAiResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    full_name: '',
    username: ''
  });

  console.log('MyAccount render - currentUser:', currentUser);
  console.log('MyAccount render - userProfile:', userProfile);
  console.log('MyAccount render - loading:', loading);

  useEffect(() => {
    console.log('MyAccount useEffect - currentUser changed:', currentUser);
    if (currentUser) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const loadUserData = async () => {
    try {
      console.log('Loading user data...');
      setLoading(true);
      
      // Load AI results
      try {
        const { data: results } = await getUserPredictions();
        console.log('AI results loaded:', results);
        setAiResults(results || []);
      } catch (error) {
        console.error('Error loading AI results:', error);
        setAiResults([]);
      }
      
      // Set initial edit values
      setEditedProfile({
        full_name: userProfile?.full_name || currentUser?.user_metadata?.full_name || '',
        username: userProfile?.username || currentUser?.user_metadata?.display_name || ''
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      console.log('User data loading completed');
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Reset to original values if canceling
      setEditedProfile({
        full_name: userProfile?.full_name || currentUser?.user_metadata?.full_name || '',
        username: userProfile?.username || currentUser?.user_metadata?.display_name || ''
      });
    }
    setEditMode(!editMode);
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Implement profile update functionality
      console.log('Saving profile:', editedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to view your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                <p className="text-gray-600">Manage your profile and preferences</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={editMode ? handleSaveProfile : handleEditToggle}
                    className="flex items-center space-x-2 px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {editMode ? (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                  {editMode && (
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedProfile.full_name}
                      onChange={(e) => setEditedProfile({...editedProfile, full_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {userProfile?.full_name || currentUser?.user_metadata?.full_name || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedProfile.username}
                      onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {userProfile?.username || currentUser?.user_metadata?.display_name || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900 py-2">{currentUser.email}</p>
                  <p className="text-xs text-gray-500">Email cannot be changed from this page</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <p className="text-gray-900 py-2">
                    {new Date(currentUser.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Results History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <History className="w-5 h-5 mr-2" />
                AI Results History
              </h2>
              
              {aiResults.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No AI results yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Start using our AI tools to see your results here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiResults.map((result, index) => (
                    <div key={result.id || index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {result.health_score || 'N/A'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            Health Score: {result.health_score || 'N/A'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(result.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {result.ai_message || 'No message available'}
                      </p>
                      {result.extra_data && Object.keys(result.extra_data).length > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          <details>
                            <summary className="cursor-pointer">View Details</summary>
                            <pre className="mt-2 bg-gray-50 p-2 rounded text-xs overflow-auto">
                              {JSON.stringify(result.extra_data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Current Plan
              </h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 capitalize">
                  {userProfile?.plan || 'Free'} Plan
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {userProfile?.plan === 'free' ? 'Basic features included' : 'Premium features unlocked'}
                </p>
                {userProfile?.subscription && (
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Status: {userProfile.subscription.status}</p>
                    {userProfile.subscription.end_date && (
                      <p>Expires: {new Date(userProfile.subscription.end_date).toLocaleDateString()}</p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => navigate('/pricing')}
                  className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {userProfile?.plan === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Results</span>
                  <span className="font-medium">{aiResults.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium capitalize">{userProfile?.plan || 'Free'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <History className="w-4 h-4" />
                    <span>View History</span>
                  </div>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </div>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Contact Support</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

