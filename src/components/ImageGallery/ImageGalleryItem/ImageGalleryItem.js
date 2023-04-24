import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ smallImg, largeImg, alt, onClick }) => {
  return (
    <img
      className={s.image}
      src={smallImg}
      alt={alt}
      onClick={() => onClick(largeImg, alt)}
    />
  );
};

export default ImageGalleryItem;
