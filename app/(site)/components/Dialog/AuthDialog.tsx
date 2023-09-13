'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dialog.module.css';
import { Typography } from '@mui/material';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useDialog } from '@/shared/states';

function AuthDialog(): JSX.Element {
  const supabaseClient = useSupabaseClient();
  const close = useDialog((state) => state.close);
  const { session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.refresh();
      close();
    }
  }, [session, router, close]);

  return (
    <div className={styles.dialog}>
      <Typography variant='h6' fontWeight='bold' textAlign='center'>
        Welcome back
      </Typography>
      <Typography variant='body2' textAlign='center'>
        Login to your account
      </Typography>
      <Auth
        theme='dark'
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'var(--bg-color)',
                brandAccent: 'var(--secondary-color)'
              }
            }
          }
        }}
      />
    </div>
  );
}
export default AuthDialog;
