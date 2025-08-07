import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const CloudImage = ({
  publicId = "cld-sample-5",
  width = 500,
  height = 500,
  className = "",
}) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dq3r0x1am" } });

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image(publicId)
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height)); // Transform the image: auto-crop to square aspect_ratio

  return <AdvancedImage className={className} cldImg={img} />;
};

export default CloudImage;
