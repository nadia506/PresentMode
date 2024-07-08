// import React, { useEffect, useState } from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css"; // Import the default styles

// const ProductImage = ({ product }) => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (product?.images?.length > 0) {
//       let images = [];

//       product.images.map((imageName) => {
//         return images.push({
//           original: `${process.env.REACT_APP_SERVER_URL}/${imageName}`,
//           thumbnail: `${process.env.REACT_APP_SERVER_URL}/${imageName}`,
//         });
//       });

//       setImages(images);
//     }
//   }, [product]);

//   return (
//     <div className="image-gallery-container mx-auto max-w-lg">
//       <ImageGallery
//         items={images}
//         showPlayButton={false}
//         showThumbnails={true}
//         renderItem={(item) => (
//           <img
//             src={item.original}
//             alt=""
//             className="w-full h-[500px] object-cover"
//           />
//         )}
//         renderThumbInner={(item) => (
//           <img
//             src={item.thumbnail}
//             alt=""
//             className="w-20 h-20 object-cover border-2 border-transparent hover:border-gray-400"
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default ProductImage;

import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import the default styles
import { CustomLeftNav, CustomRightNav } from "./CustomNav"; // Adjust the import path as needed

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      let images = [];

      product.images.map((imageName) => {
        return images.push({
          original: `${process.env.REACT_APP_SERVER_URL}/${imageName}`,
          thumbnail: `${process.env.REACT_APP_SERVER_URL}/${imageName}`,
        });
      });

      setImages(images);
    }
  }, [product]);

  return (
    <div className="image-gallery-container mx-auto max-w-lg">
      <ImageGallery
        items={images}
        showPlayButton={false}
        showThumbnails={true}
        renderLeftNav={CustomLeftNav}
        renderRightNav={CustomRightNav}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        renderItem={(item) => (
          <img src={item.original} alt="" className="w-[400px] h-[500px] " />
        )}
        renderThumbInner={(item) => (
          <img
            src={item.thumbnail}
            alt=""
            className="w-20 h-20 object-cover border-2 border-transparent hover:border-gray-400"
          />
        )}
      />
    </div>
  );
};

export default ProductImage;
