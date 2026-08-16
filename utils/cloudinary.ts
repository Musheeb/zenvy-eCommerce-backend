import cldnry from "cloudinary";
const cloudinary = cldnry.v2;

export const deleteImage = async (publicId: string) => {
  try {
    // console.log("Deleting image from cloudinary -> ", publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    // console.log(result);
    return result;
  } catch (e) {
    throw e;
  }
};
