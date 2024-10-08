// File: lib/useAuth.ts

"use client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;

        console.log("user>>> this is ", user);
        console.log("this is the user email >>>", user?.email);
        setUser(user);
        setUserEmail(user?.email ?? null);
      } catch (error) {
        console.log("this is the error", error);
      } finally {
        console.log("this is the finally block");
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("this is the event", event);
        console.log("this is the session", session);
        setUser(session?.user ?? null);
        setUserEmail(session?.user?.email ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, userEmail, loading };
};
export default useAuth;
