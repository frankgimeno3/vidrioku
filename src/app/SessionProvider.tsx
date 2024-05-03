"use client"
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';  
import { store } from "@/redux/store"

type Props = {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  return (
    <NextAuthSessionProvider>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </NextAuthSessionProvider>
  );
}
