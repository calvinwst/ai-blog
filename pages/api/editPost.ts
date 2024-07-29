import { supabase } from "../../lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, title, content, slug } = req.body;
    const { data, error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        slug,
      })
      .match({ id });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
