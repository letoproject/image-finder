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
  const [page, setPage] = useState(1);

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

  const loadMoreBtn = () => {
    setPage(prev => prev + 1)
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        searchQuery={searchQuery}
        onClick={getBigImg}
        loadMoreBtn={loadMoreBtn}
        page={page}
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

// class App extends Component {
//   state = {
//     searchQuery: "",
//     modalImg: "",
//     showModal: false,
//     page: 1,
//   };

//   handleFormSubmit = (searchQuery) => {
//     this.setState({ searchQuery });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   getBigImg = (url) => {
//     this.toggleModal();
//     this.setState({ modalImg: url });
//   };

//   loadMoreBtn = () => {
//     this.setState((prevState) => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery
//           searchQuery={this.state.searchQuery}
//           onClick={this.getBigImg}
//           loadMoreBtn={this.loadMoreBtn}
//           page={this.state.page}
//         />
//         {this.state.showModal && (
//           <Modal url={this.state.modalImg} onClose={this.toggleModal} />
//         )}
//         <ToastContainer
//           position={"top-center"}
//           autoClose={5000}
//           hideProgressBar={true}
//           theme={"colored"}
//         />
//       </>
//     );
//   }
// }

export default App;
