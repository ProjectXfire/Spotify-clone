'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { type Database } from '../types';
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
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>{children}</MyUserContextProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}
export default Providers;
