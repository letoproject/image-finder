import { useState, useEffect } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "../Loader";
import Button from "../Button";
import s from "./ImageGallery.module.css";
import imageAPI from "../../services/ImageFinderApi";

const ImageGallery = ({ searchQuery, onClick }) => {
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [prevQuery, setPrevQuery] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    if (searchQuery !== prevQuery) {
      setPage(1);
      setHits([]);
      setError(null);
      setStatus("pending");
    }

    if (page === 1) {
      imageAPI
        .fetchImages(searchQuery, page)
        .then((data) => {
          if (!data.total) {
            return Promise.reject(
              new Error(`Search error on request with query ${searchQuery}`)
            );
          }
          setHits(data.hits);
          setPrevQuery(searchQuery);
          setStatus("resolved");
        })
        .catch((error) => {
          setError(error);
          setHits([]);
          setPage(1);
          setStatus("rejected");
        });
    }

    if (page > 1) {
      imageAPI
        .fetchImages(searchQuery, page)
        .then((data) => {
          setHits((prev) => [...prev, ...data.hits]);
          setStatus("resolved");
        })
        .catch((error) => {
          setStatus("rejected");
          setError(error);
          setHits([]);
          setPage(1);
          
        });
    }
  }, [page, prevQuery, searchQuery]);

  const loadMoreBtn = () => {
    setPage((prev) => prev + 1);
  };

  if (status === "idle") {
    return <h2 className={s.text}>Input your image search query</h2>;
  }

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "rejected") {
    return <h2 className={s.text}>{error.message}</h2>;
  }

  if (status === "resolved") {
    return (
      <>
        <ul className={s.imageGallery}>
          {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li className={s.gallery_item} key={id}>
              <ImageGalleryItem
                smallImg={webformatURL}
                largeImg={largeImageURL}
                alt={tags}
                onClick={onClick}
              />
            </li>
          ))}
        </ul>
        {hits && <Button onClick={loadMoreBtn} />}
      </>
    );
  }
};

export default ImageGallery;
