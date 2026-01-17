import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface UserCredits {
  credits: number;
  lastResetDate: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
  credits: UserCredits | null;
  refreshCredits: () => Promise<void>;
  useCredit: () => Promise<boolean>;
  earnCredit: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [credits, setCredits] = useState<UserCredits | null>(null);

  const fetchUserData = async (userId: string) => {
    // Fetch premium status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium, premium_expires_at')
      .eq('user_id', userId)
      .single();

    if (profile) {
      const premiumValid = profile.is_premium && 
        (!profile.premium_expires_at || new Date(profile.premium_expires_at) > new Date());
      setIsPremium(premiumValid);
    }

    // Fetch credits
    await refreshCredits();
  };

  const refreshCredits = async () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    // First try to get existing credits
    let { data: creditsData, error } = await supabase
      .from('user_credits')
      .select('credits, last_reset_date')
      .eq('user_id', user.id)
      .single();

    if (error || !creditsData) {
      // Create credits row if doesn't exist
      const { data: newCredits } = await supabase
        .from('user_credits')
        .insert({ user_id: user.id, credits: 5, last_reset_date: today })
        .select()
        .single();
      
      if (newCredits) {
        setCredits({ credits: newCredits.credits, lastResetDate: newCredits.last_reset_date });
      }
      return;
    }

    // Reset credits if it's a new day
    if (creditsData.last_reset_date < today) {
      const { data: updatedCredits } = await supabase
        .from('user_credits')
        .update({ credits: 5, last_reset_date: today })
        .eq('user_id', user.id)
        .select()
        .single();

      if (updatedCredits) {
        setCredits({ credits: updatedCredits.credits, lastResetDate: updatedCredits.last_reset_date });
      }
    } else {
      setCredits({ credits: creditsData.credits, lastResetDate: creditsData.last_reset_date });
    }
  };

  const useCredit = async (): Promise<boolean> => {
    if (!user) return false;
    if (isPremium) return true; // Premium users have unlimited
    
    if (!credits || credits.credits <= 0) return false;

    const { error } = await supabase
      .from('user_credits')
      .update({ credits: credits.credits - 1 })
      .eq('user_id', user.id);

    if (error) return false;
    
    setCredits(prev => prev ? { ...prev, credits: prev.credits - 1 } : null);
    return true;
  };

  const earnCredit = async (): Promise<boolean> => {
    if (!user || isPremium) return false;
    
    const { data, error } = await supabase
      .from('user_credits')
      .update({ 
        credits: (credits?.credits || 0) + 1,
        total_earned_from_ads: supabase.rpc ? undefined : (credits?.credits || 0) + 1
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) return false;
    
    if (data) {
      setCredits({ credits: data.credits, lastResetDate: data.last_reset_date });
    }
    return true;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsPremium(false);
    setCredits(null);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Defer Supabase calls
        if (session?.user) {
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setIsPremium(false);
          setCredits(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        fetchUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isPremium,
      credits,
      refreshCredits,
      useCredit,
      earnCredit,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
