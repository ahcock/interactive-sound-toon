import type { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "../../lib/s3";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

const audioUploadHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.key) {
    s3Client.upload(
      {
        Bucket: process.env.S3_BUCKET_NAME ?? "",
        Key: !Array.isArray(req.query.key) ? req.query.key : "",
        Body: req.body,
        ContentType: req.headers["content-type"],
      },
      (err: Error, data: SendData) => {
        if (err) {
          res.status(500);
          res.end();
        } else {
          res.json({ location: data.Location });
        }
      }
    );
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
export default audioUploadHandler;
