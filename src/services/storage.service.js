import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env variables

import ImageKit from "imagekit";

console.log("Public Key:", process.env.IMAGEKIT_PUBLIC_KEY); // ✅ Debug

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
});

export const uploadfile = async (file, fileName) => {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName
  });
  return result;
};