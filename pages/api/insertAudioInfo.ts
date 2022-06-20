// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function insertAudioInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const result = await db.collection(collection).insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.json(err);
    res.end();
  }
}
