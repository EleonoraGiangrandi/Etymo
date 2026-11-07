import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCAL_USER_NAME_KEY = '@local_user_name';
export const LOCAL_USER_AVATAR_KEY = '@local_user_avatar';

type UserProfile = {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
};

type AuthContextType = {
  session: boolean;
  user: UserProfile;
  loading: boolean;
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ error: any }>;
  resetProfile: () => Promise<void>;
  reloadProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [fullName, setFullName] = useState('Studioso Errante');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalProfile();
  }, []);

  const loadLocalProfile = async () => {
    try {
      const [savedName, savedAvatar] = await Promise.all([
        AsyncStorage.getItem(LOCAL_USER_NAME_KEY),
        AsyncStorage.getItem(LOCAL_USER_AVATAR_KEY),
      ]);
      if (savedName) setFullName(savedName);
      if (savedAvatar) setAvatarUrl(savedAvatar);
    } catch (e) {
      console.warn('Error loading local profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    try {
      if (updates.full_name !== undefined) {
        setFullName(updates.full_name);
        await AsyncStorage.setItem(LOCAL_USER_NAME_KEY, updates.full_name);
      }
      if (updates.avatar_url !== undefined) {
        setAvatarUrl(updates.avatar_url);
        await AsyncStorage.setItem(LOCAL_USER_AVATAR_KEY, updates.avatar_url);
      }
      return { error: null };
    } catch (err) {
      console.error('Error updating local profile:', err);
      return { error: err };
    }
  };

  const resetProfile = async () => {
    setFullName('Studioso Errante');
    setAvatarUrl('');
    await AsyncStorage.removeItem(LOCAL_USER_NAME_KEY);
    await AsyncStorage.removeItem(LOCAL_USER_AVATAR_KEY);
  };

  const reloadProfile = async () => {
    await loadLocalProfile();
  };

  const user: UserProfile = {
    id: 'local_user',
    email: '',
    user_metadata: {
      full_name: fullName,
      avatar_url: avatarUrl,
    },
  };

  const value = {
    session: true, // Always true for 100% local & offline experience
    user,
    loading,
    updateProfile,
    resetProfile,
    reloadProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
