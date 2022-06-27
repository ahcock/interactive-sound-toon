import clientPromise from "../../lib/mongodb";

export async function mongoFindAllSoundWebtoons() {
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const documents = await db.collection(collection).find({}).toArray();
    return JSON.parse(JSON.stringify(documents));
  } catch (error) {
    return {
      error,
    };
  }
}
