'use client';

import { useState } from 'react';
import { type Database } from '../types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Toaster } from 'react-hot-toast';
import { MyUserContextProvider } from '@/app/(site)/hooks';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from '@/shared/themes';

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props): JSX.Element {
  const [supabaseClient] = useState(() => createClientComponentClient<Database>());

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Toaster
        toastOptions={{
          style: { backgroundColor: 'var(--bg-color)', color: 'var(--info-color)' }
        }}
      />
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>{children}</MyUserContextProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}
export default Providers;
