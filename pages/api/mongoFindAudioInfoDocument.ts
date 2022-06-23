import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function mongoFindAudioInfoDocument(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const client = await clientPromise;
  const db = client.db(dbName);

  const { webtoonName, episode } = req.query;

  try {
    const document = await db.collection(collection).findOne({
      webtoonName,
      episode,
    });

    res.status(200).json(document);
  } catch (err) {
    res.json(err);
    res.end();
  }
}
