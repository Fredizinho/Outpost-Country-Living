import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredUserProfile, saveStoredUserProfile, removeStoredUserProfile } from '@/lib/offlineStorage';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  region?: string;
  district?: string;
  familyMembers?: number;
  householdSize?: string;
  landSizeAcres?: number;
  currentSeason?: string;
  homesteadGoal?: string;
  budgetBand?: string;
  timeline?: string;
  onboardingCompleted?: boolean;
  joinedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (details?: Partial<User>) => Promise<void>;
  signUp: (email: string, name: string, region?: string, district?: string, goal?: string) => Promise<void>;
  updateProfile: (details: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = getStoredUserProfile<User>();
      if (savedUser) {
        setUser(savedUser);
      } else {
        // Initialize default steward profile so app has instant context
        const initialUser: User = {
          uid: 'user_default',
          email: 'steward@outpostliving.mw',
          displayName: 'Outpost Steward',
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=Steward`,
          region: 'Central',
          district: 'Dedza',
          familyMembers: 4,
          householdSize: '3-5 Members',
          landSizeAcres: 2.5,
          currentSeason: 'Rainy Planting',
          homesteadGoal: 'Self-Sufficient Organic Homestead',
          budgetBand: 'Standard Off-Grid (MWK 500k - 2.5M)',
          timeline: 'This Season (3-6 Months)',
          onboardingCompleted: false,
          joinedAt: new Date().toISOString(),
        };
        setUser(initialUser);
      }
    } catch (e) {
      console.error('Failed to load user profile:', e);
    }
    setLoading(false);
  }, []);

  const signIn = async (details?: Partial<User>) => {
    const defaultUser: User = {
      uid: user?.uid || 'user_' + Math.random().toString(36).substring(2, 9),
      email: details?.email || user?.email || 'steward@outpostliving.mw',
      displayName: details?.displayName || user?.displayName || 'Guest Steward',
      photoURL: details?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(details?.displayName || 'Guest')}`,
      region: details?.region || user?.region || 'Central',
      district: details?.district || user?.district || 'Dedza',
      familyMembers: details?.familyMembers ?? user?.familyMembers ?? 4,
      householdSize: details?.householdSize || user?.householdSize || '3-5 Members',
      landSizeAcres: details?.landSizeAcres ?? user?.landSizeAcres ?? 2.5,
      currentSeason: details?.currentSeason || user?.currentSeason || 'Rainy Planting',
      homesteadGoal: details?.homesteadGoal || user?.homesteadGoal || 'Self-Sufficient Organic Homestead',
      budgetBand: details?.budgetBand || user?.budgetBand || 'Standard Off-Grid (MWK 500k - 2.5M)',
      timeline: details?.timeline || user?.timeline || 'This Season (3-6 Months)',
      onboardingCompleted: details?.onboardingCompleted ?? user?.onboardingCompleted ?? true,
      joinedAt: user?.joinedAt || new Date().toISOString(),
    };

    saveStoredUserProfile(defaultUser);
    setUser(defaultUser);
  };

  const signUp = async (email: string, name: string, region?: string, district?: string, goal?: string) => {
    const newUser: User = {
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Steward')}`,
      region: region || 'Central',
      district: district || 'Dedza',
      homesteadGoal: goal || 'Self-Sustaining Country Outpost',
      joinedAt: new Date().toISOString(),
    };

    saveStoredUserProfile(newUser);
    setUser(newUser);
  };

  const updateProfile = async (details: Partial<User>) => {
    if (!user) return;
    const updated = {
      ...user,
      ...details,
      photoURL: details.displayName 
        ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(details.displayName)}` 
        : user.photoURL,
    };
    saveStoredUserProfile(updated);
    setUser(updated);
  };

  const signOut = async () => {
    removeStoredUserProfile();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, updateProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

