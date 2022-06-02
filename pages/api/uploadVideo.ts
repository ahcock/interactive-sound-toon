import type { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "../../lib/s3";

const videoUploadHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.query.key) {
    await s3Client
      .upload(
        {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: req.query.key,
          Body: req.body,
          ContentType: req.headers["content-type"],
        },
        (err, data) => {
          if (err) console.log("error", err);
          console.log("upload result", data);
        }
      )
      .promise();
  }
};

export default videoUploadHandler;
