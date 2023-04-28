import { useState } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery/";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import s from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImg, setModalImg] = useState({src: '', alt: ''});
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery)
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getBigImg = (src, alt) => {
    toggleModal();
    setModalImg({src, alt});
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        searchQuery={searchQuery}
        onClick={getBigImg}
      />
      {showModal && (
        <Modal modalImg={modalImg} onClose={toggleModal} />
      )}
      <ToastContainer
        position={"top-center"}
        autoClose={5000}
        hideProgressBar={true}
        theme={"colored"}
      />
    </>
  );
}

export default App;
