"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import useAuth from "../../lib/auth";
export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading, userEmail } = useAuth();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error signing out", error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log("this is the error", error);
      } else {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const extractDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  console.log("this si the blogs", blogs);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <header>
            <h1>Calvin's Blog</h1>
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
              {userEmail === "calshtz02@gmail.com" ? (
                <>
                  <Link href="/create" style={{ marginRight: "1rem" }}>
                    Create Blog
                  </Link>
                  <button onClick={handleSignOut} style={{ color: "#60a5fa" }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </nav>
          </header>
          <main>
            <ul>
              {blogs.map((blog) => {
                const date = extractDate(blog.created_at);
                return (
                  <li key={blog.id}>
                    <span>{date}</span> -{" "}
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </li>
                );
              })}
            </ul>
          </main>
        </div>
      </div>
    </>
  );
}
