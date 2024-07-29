"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "../../../lib/supabaseClient";
import style from "../../../app/styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import useAuth from "../../../lib/auth"; // Ensure the import path is correct

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  slug: string;
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth(); // Ensure the import path is correct

  const handleEdit = async () => {};

  const handleDelete = async () => {
    if (post) {
      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) {
        console.log("error deleting post", error);
      } else {
        console.log("post deleted");
        router.push("/bloglist");
      }
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error signing out", error);
    }
  };

  useEffect(() => {
    async function fetchPost() {
      if (slug) {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          console.log("this is the error", error);
        } else {
          setPost(data);
        }
      } else {
        console.log("no slug provided");
      }

      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (!post) return <div>Post not found</div>;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.contentContainer}>
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
            {user ? (
              <>
                <Link
                  href="/create"
                  style={{
                    marginRight: "1rem",
                  }}
                >
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
        <main className={style.main}>
          <h1>{post.title}</h1>
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
          <ReactMarkdown
            className={style.markdownBody}
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </main>
        {user ? (
          <>
            <div className={style.buttonContainer}>
              <button onClick={handleEdit} className={style.editButton}>
                Edit
              </button>
              <button onClick={handleDelete} className={style.deleteButton}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
