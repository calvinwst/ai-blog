"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthStateChange = async (event: string, session: any) => {
      if (event === "SIGNED_IN") {
        console.log("User is signed in");
        router.push("/");
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.log("error signing in", error);
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <header>
            <h1>Calvin&apos;s Blog</h1>
            <nav className="navLinks">
              <Link
                href="/"
                style={{
                  marginRight: "1rem",
                }}
              >
                Home
              </Link>
              <Link
                href="/bloglist"
                style={{
                  marginRight: "1rem",
                }}
              >
                Blog
              </Link>
              {/* <Link
                href="/create"
                style={{
                  marginRight: "1rem",
                }}
              >
                Create Blog
              </Link> */}
              <Link href="/login">Login</Link>
            </nav>
          </header>
          <div className={styles.loginContainer}>
            <button
              onClick={signInWithGoogle}
              style={{
                backgroundColor: "#4285F4",
                color: "white",
                padding: "1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
