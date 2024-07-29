import { supabase } from "../../lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    const { data, error } = await supabase.from("posts").delete().match({ id });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ message: "Post deleted" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
