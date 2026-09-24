import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoredUserProfile, saveStoredUserProfile, removeStoredUserProfile } from '@/lib/offlineStorage';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  firebaseSignOut, 
  onAuthStateChanged,
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  handleFirestoreError,
  OperationType,
  type FirebaseUser
} from '@/lib/firebase';

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
  isFirebaseUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isFirebaseAuthenticated: boolean;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signIn: (details?: Partial<User>) => Promise<void>;
  signUp: (email: string, name: string, region?: string, district?: string, goal?: string) => Promise<void>;
  updateProfile: (details: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      if (fbUser) {
        setFirebaseUser(fbUser);
        const userDocRef = doc(db, 'users', fbUser.uid);
        const path = `users/${fbUser.uid}`;

        try {
          let userProfile: User;
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data() as Partial<User>;
            userProfile = {
              uid: fbUser.uid,
              email: fbUser.email || data.email || '',
              displayName: fbUser.displayName || data.displayName || 'Country Living Steward',
              photoURL: fbUser.photoURL || data.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fbUser.displayName || 'Steward')}`,
              region: data.region || '',
              district: data.district || '',
              familyMembers: data.familyMembers,
              householdSize: data.householdSize || '',
              landSizeAcres: data.landSizeAcres,
              currentSeason: data.currentSeason || 'Rainy Planting',
              homesteadGoal: data.homesteadGoal || '',
              budgetBand: data.budgetBand || '',
              timeline: data.timeline || '',
              onboardingCompleted: data.onboardingCompleted ?? false,
              joinedAt: data.joinedAt || new Date().toISOString(),
              isFirebaseUser: true,
            };
          } else {
            // First time sign-in: seed new user profile without invented values so onboarding triggers
            userProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || 'Country Living Steward',
              photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fbUser.displayName || 'Steward')}`,
              region: '',
              district: '',
              currentSeason: 'Rainy Planting',
              homesteadGoal: '',
              budgetBand: '',
              timeline: '',
              onboardingCompleted: false,
              joinedAt: new Date().toISOString(),
              isFirebaseUser: true,
            };

            await setDoc(userDocRef, {
              uid: userProfile.uid,
              email: userProfile.email,
              displayName: userProfile.displayName,
              photoURL: userProfile.photoURL,
              region: userProfile.region,
              district: userProfile.district,
              currentSeason: userProfile.currentSeason,
              homesteadGoal: userProfile.homesteadGoal,
              budgetBand: userProfile.budgetBand,
              timeline: userProfile.timeline,
              onboardingCompleted: userProfile.onboardingCompleted,
              createdAt: userProfile.joinedAt,
              updatedAt: new Date().toISOString()
            });
          }

          saveStoredUserProfile(userProfile);
          setUser(userProfile);
        } catch (error) {
          console.error('Error fetching or creating user profile in Firestore:', error);
          // Fallback to local profile
          const localProfile: User = {
            uid: fbUser.uid,
            email: fbUser.email || 'steward@outpostliving.mw',
            displayName: fbUser.displayName || 'Outpost Steward',
            photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=Steward`,
            isFirebaseUser: true,
          };
          setUser(localProfile);
          try {
            handleFirestoreError(error, OperationType.GET, path);
          } catch {
            // Handled for logging
          }
        }
      } else {
        setFirebaseUser(null);
        // Check offline cache or set default guest profile
        const cached = getStoredUserProfile<User>();
        if (cached && !cached.isFirebaseUser) {
          setUser(cached);
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      // Don't show error if user closed the popup
      if (err?.code !== 'auth/popup-closed-by-user') {
        setAuthError(err?.message || 'Google Sign-In could not be completed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Backwards-compatible manual sign-in / demo steward sign-in
  const signIn = async (details?: Partial<User>) => {
    setAuthError(null);
    const guestUser: User = {
      uid: user?.uid || 'user_guest_' + Math.random().toString(36).substring(2, 9),
      email: details?.email || user?.email || '',
      displayName: details?.displayName || user?.displayName || 'Guest Homesteader',
      photoURL: details?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(details?.displayName || 'Guest')}`,
      region: details?.region || user?.region || '',
      district: details?.district || user?.district || '',
      familyMembers: details?.familyMembers ?? user?.familyMembers,
      householdSize: details?.householdSize || user?.householdSize || '',
      landSizeAcres: details?.landSizeAcres ?? user?.landSizeAcres,
      currentSeason: details?.currentSeason || user?.currentSeason || 'Rainy Planting',
      homesteadGoal: details?.homesteadGoal || user?.homesteadGoal || '',
      budgetBand: details?.budgetBand || user?.budgetBand || '',
      timeline: details?.timeline || user?.timeline || '',
      onboardingCompleted: details?.onboardingCompleted ?? user?.onboardingCompleted ?? false,
      joinedAt: user?.joinedAt || new Date().toISOString(),
      isFirebaseUser: false,
    };

    saveStoredUserProfile(guestUser);
    setUser(guestUser);
  };

  const signUp = async (email: string, name: string, region?: string, district?: string, goal?: string) => {
    const newUser: User = {
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Steward')}`,
      region: region || '',
      district: district || '',
      homesteadGoal: goal || '',
      onboardingCompleted: false,
      joinedAt: new Date().toISOString(),
      isFirebaseUser: false,
    };

    saveStoredUserProfile(newUser);
    setUser(newUser);
  };

  const updateProfile = async (details: Partial<User>) => {
    if (!user) return;
    const updated: User = {
      ...user,
      ...details,
      photoURL: details.displayName 
        ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(details.displayName)}` 
        : user.photoURL,
    };

    saveStoredUserProfile(updated);
    setUser(updated);

    // If authenticated with Firebase, sync directly to Firestore!
    if (auth.currentUser && user.isFirebaseUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const path = `users/${auth.currentUser.uid}`;
      try {
        const payload: Record<string, any> = {
          updatedAt: new Date().toISOString()
        };
        if (updated.displayName !== undefined) payload.displayName = updated.displayName;
        if (updated.photoURL !== undefined) payload.photoURL = updated.photoURL;
        if (updated.region !== undefined) payload.region = updated.region;
        if (updated.district !== undefined) payload.district = updated.district;
        if (updated.familyMembers !== undefined) payload.familyMembers = updated.familyMembers;
        if (updated.householdSize !== undefined) payload.householdSize = updated.householdSize;
        if (updated.landSizeAcres !== undefined) payload.landSizeAcres = updated.landSizeAcres;
        if (updated.currentSeason !== undefined) payload.currentSeason = updated.currentSeason;
        if (updated.homesteadGoal !== undefined) payload.homesteadGoal = updated.homesteadGoal;
        if (updated.budgetBand !== undefined) payload.budgetBand = updated.budgetBand;
        if (updated.timeline !== undefined) payload.timeline = updated.timeline;
        if (updated.onboardingCompleted !== undefined) payload.onboardingCompleted = updated.onboardingCompleted;

        await updateDoc(userDocRef, payload);
      } catch (err) {
        console.error('Failed to sync profile update to Firestore:', err);
        try {
          handleFirestoreError(err, OperationType.UPDATE, path);
        } catch {
          // Handled
        }
      }
    }
  };

  const signOut = async () => {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.error('Error signing out from Firebase:', err);
    } finally {
      removeStoredUserProfile();
      setUser(null);
      setFirebaseUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      firebaseUser, 
      isFirebaseAuthenticated: !!firebaseUser,
      loading, 
      authError,
      clearAuthError,
      signInWithGoogle, 
      signIn, 
      signUp, 
      updateProfile, 
      signOut 
    }}>
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
