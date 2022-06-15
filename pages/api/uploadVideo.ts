import type { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "../../lib/s3";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

const videoUploadHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.query.key) {
    await s3Client
      .upload(
        {
          Bucket: process.env.S3_BUCKET_NAME ?? "",
          Key: !Array.isArray(req.query.key) ? req.query.key : "",
          Body: req.body,
          ContentType: req.headers["content-type"],
        },
        (err: Error, data: SendData) => {
          if (err) console.log("error", err);
          console.log("upload result", data);
        }
      )
      .promise();
  }
};

export default videoUploadHandler;
