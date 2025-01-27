import env from "dotenv";
import aws from "aws-sdk";
import fs from "fs";

env.config();

export const AWSBucket = "swish-demo-pics";

export const customerProfilePicKey = "customer-profile-pics";
export const businessProfilePicKey = "business-profile-pics";

export const uploadImageToS3 = async (
  uri: string,
  bucket: string,
  key: string
): Promise<Error | string> => {
  // Configure AWS S3
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "eu-central-1",
  });
  const s3 = new aws.S3();

  const filePath = uri.startsWith("file://") ? uri.replace("file://", "") : uri;
  const fileContent = fs.readFileSync(filePath);

  // Define S3 upload parameters
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  try {
    // Upload to S3
    await s3.upload(uploadParams).promise();
    const uploadedImageUrl = `https://${bucket}.s3.amazonaws.com/${key}`;
    return uploadedImageUrl;
  } catch (err) {
    return new Error(`Error uploading file: ${err}`);
  }
};
