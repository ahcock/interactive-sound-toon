// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function insertAudioInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("interactive_toon");
  // await db.collection("audioData").insertOne({ test: "테스트 도큐먼트 인풋" });

  console.log(req.body);
}
