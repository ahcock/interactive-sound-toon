import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function mongoUpsertAudioInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const client = await clientPromise;
  const db = client.db(dbName);

  const filter = {
    webtoonName: req.body.webtoonName,
    episode: req.body.episode,
  };

  console.log("soundInfo", req.body);
  try {
    const result = await db
      .collection(collection)
      .updateOne(filter, { $set: req.body }, { upsert: true });

    res.json(result);
  } catch (err) {
    res.json(err);
    res.end();
  }
}
