"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles/Home.module.css";
import useAuth from "../lib/auth"; // Ensure the import path is correct
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const { user, loading, userEmail } = useAuth(); // Correctly use the hook

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error signing out", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <header>
          <h1>Calvin's Blog</h1>
          <nav className="navLinks">
            <Link href="/" style={{ marginRight: "1rem" }}>
              Home
            </Link>
            <Link href="/bloglist" style={{ marginRight: "1rem" }}>
              Blog
            </Link>
            {userEmail === "calshtz02@gmail.com" ? (
              <>
                <Link href="/create" style={{ marginRight: "1rem" }}>
                  Create Blog
                </Link>
                <button
                  onClick={handleSignOut}
                  style={{
                    color: "#60a5fa",
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </nav>
        </header>
        <main>
          <p>
            Hey I'm Calvin Wong, a recent Computer Science graduate from
            Technological University of Shannon. Currently in the process of
            finding a job in the tech industry.
          </p>
          <br />
          <p>
            I have passion for building things and learning new technologies. In
            the mid of learning LLM model and building some RAG application. I'm
            always looking for open-minded people to connect with and learning
            from each other about.
          </p>
          <br />
          <p>Some facts about me:</p>
          <ul>
            <li>
              - Have passion in building things that would benefit others 🔧
            </li>
            <li>- I love to read books especially non-fiction 📚</li>
            <li>- I run currently training to run for a half marathon 👟</li>
            <li>- I'm a huge Manchester United Fan 👹</li>
          </ul>
          <br />
          <p>
            I'm building this blog to share my journey in tech and also in life
            in general by sharing my experience and perspective. By doing this I
            hope that it enables me to have the opportunity to better my
            perspective on certain subjects and connect with other people along
            the way. I hope you enjoy reading my blog.
          </p>
          <br />
          <p>
            Feel free to reach out to me on{" "}
            <a href="https://www.linkedin.com/in/calvinwst/">LinkedIn 🔗</a> or{" "}
            <a href="https://twitter.com/calvinwong_">Twitter Ⅹ</a>
          </p>
        </main>
      </div>
    </div>
  );
}
