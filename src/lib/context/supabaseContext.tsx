"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../supabase";

interface SupabaseContextType {
  userId: string | null;
  loading: boolean;
  error: string | null;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log(token);
        if (!token) {
          throw new Error("Authentication token not provided");
        }
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: "",
        });

        if (sessionError) {
          throw new Error("Failed to set session: " + sessionError.message);
        }
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData.user) {
          throw new Error(
            "Failed to authenticate user: " +
              (userError?.message || "Unknown error")
          );
        }

        setUserId(userData.user.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <SupabaseContext.Provider value={{ userId, loading, error }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
