import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem(props) {
  const { hit, onClick } = props;
  return (
    <li className={s.gallery_item} id={hit.id}>
      <img
        className={s.image}
        src={hit.webformatURL}
        alt={hit.tags}
        onClick={() => onClick(hit.largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
