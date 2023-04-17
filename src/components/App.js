import React, { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery/";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import s from './App.module.css';

class App extends Component {
  state = {
    searchQuery: "",
    modalImg: "",
    showModal: false,
    page: 1,
  };

  componentDidMount() {
    if (this.state.showModal) {
      document.body.style.overflow = "hidden";
    }
  }

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getBigImg = (url) => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  loadMoreBtn = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          onClick={this.getBigImg}
          loadMoreBtn={this.loadMoreBtn}
          page={this.state.page}
        />
        {this.state.showModal && (
          <Modal url={this.state.modalImg} onClose={this.toggleModal} />
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
}

export default App;
