import clientPromise from "../../lib/mongodb";

export async function mongoFindAllImageInfo() {
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_IMAGE_COLLECTION ?? "";
  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const documents = await db
      .collection(collection)
      .find(
        {},
        { projection: { title: 1, thumbnail: 1, webtoonName: 1, episode: 1 } }
      )
      .toArray();

    return JSON.parse(JSON.stringify(documents));
  } catch (error) {
    return {
      error,
    };
  }
}
