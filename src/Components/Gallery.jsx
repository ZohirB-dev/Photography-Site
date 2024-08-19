import React from "react";
import "../App.css";
import ResponsiveGallery from "react-responsive-gallery";

// Empty component used for custom loader
const Empty = () => null;

const Gallery = ({ images }) => {
  // Format the images array to match the format expected by ResponsiveGallery
  const formattedImages = images.map((image) => ({
    src: image.src,
  }));

  return (
    <div className="gallery flex items-center justify-center ml-48 px-4 py-8 ">
      <ResponsiveGallery media={formattedImages} customLoader={<Empty />} />
    </div>
  );
};

export default Gallery;

