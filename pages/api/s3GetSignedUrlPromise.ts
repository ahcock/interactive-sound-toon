import type { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "../../lib/s3";

const s3GetSignedUrlPromise = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const fileParams = {
    Bucket: process.env.S3_BUCKET_NAME ?? "",
    Key: !Array.isArray(req.query.key) ? req.query.key : "",
    ContentType: req.headers["content-type"],
  };

  try {
    const url = await s3Client.getSignedUrlPromise("putObject", fileParams);
    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
export default s3GetSignedUrlPromise;
