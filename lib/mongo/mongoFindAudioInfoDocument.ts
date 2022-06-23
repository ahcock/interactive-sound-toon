import clientPromise from "../../lib/mongodb";

export async function mongoFindAudioInfoDocument(
  webtoonName: string,
  episode: string
) {
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const document = await db.collection(collection).findOne({
      webtoonName,
      episode,
    });

    return JSON.parse(JSON.stringify(document));
  } catch (error) {
    return {
      error,
    };
  }
}
