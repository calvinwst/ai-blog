"use client";
import style from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import useAuth from "../../lib/auth";
import { text } from "stream/consumers";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const markDownIt = require("markdown-it")();

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading: authLoading, userEmail } = useAuth();
  const router = useRouter();

  const addDashInSlug = (str: string) => {
    return str.toLowerCase().replace(/\s+/g, "-");
  };

  const onChangeHandler = ({ html, text }: { html: string; text: string }) => {
    setContent(text);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error signing out", error);
    }
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("title", title);
    console.log("content", content);
    console.log("slug", addDashInSlug(title));
    const slug = addDashInSlug(title);
    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        slug,
      },
    ]);
    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
      setTitle("");
      setContent("");
      router.push("/bloglist");
    }
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.contentContainer}>
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
            {userEmail === "calshtz02@gmail.com" ? (
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
          <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="title" className={style.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={style.input}
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="content" className={style.label}>
              Content
            </label>
            {/* <textarea
              id="content"
              name="content"
              className={style.textarea}
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            /> */}
            <MdEditor
              style={{ height: "500px" }}
              value={content}
              renderHTML={(text) => markDownIt.render(text)}
              onChange={onChangeHandler}
              //   onChange={({ text }) => setContent(text)}
            />
            <button type="submit" className={style.button} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Post"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
