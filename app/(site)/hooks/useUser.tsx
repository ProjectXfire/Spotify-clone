import { createContext, useContext, useEffect, useState } from 'react';
import { type User } from '@supabase/auth-helpers-nextjs';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';
import { type ISubscription, type IUserDetails } from '../types';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: IUserDetails | null;
  isLoading: boolean;
  subscription: ISubscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);

  const { session, isLoading: isLoadingUser, supabaseClient } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;

  const getUserDetails = () => supabaseClient.from('users').select('*').single();
  const getSubscription = () =>
    supabaseClient
      .from('subcriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trailing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then((result) => {
        const userDetailsResult = result[0];
        const subscriptionResult = result[1];
        if (userDetailsResult.status === 'fulfilled') setUserDetails(userDetailsResult.value.data);
        if (subscriptionResult.status === 'fulfilled')
          setSubscription(subscriptionResult.value.data);
        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a MyUserContextProvider');
  return context;
};
