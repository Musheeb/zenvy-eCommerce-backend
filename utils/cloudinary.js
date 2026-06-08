const cloudinary = require("cloudinary").v2;

exports.deleteImage = async (publicId) => {
  try {
    // console.log("Deleting image from cloudinary -> ", publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    // console.log(result);
    return result;
  } catch (e) {
    throw e;
  }
};
