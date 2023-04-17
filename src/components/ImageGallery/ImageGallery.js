import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import Loader from "../Loader";
import Button from "../Button";
import s from "./ImageGallery.module.css";
import imageAPI from "../../services/ImageFinderApi";

class ImageGallery extends Component {
  state = {
    hits: [],
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevQuery !== nextQuery) {
      this.setState({ status: "pending" });

      imageAPI
        .fetchImages(nextQuery)
        .then((data) => {
          if (!data.total) {
            return Promise.reject(
              new Error(`Search error on request with query ${nextQuery}`)
            );
          }

          this.setState({
            hits: data.hits,
            status: "resolved",
          });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }

    if (prevPage !== nextPage && nextPage > 1) {
      imageAPI
        .fetchImages(nextQuery, this.props.page)
        .then((data) => {
          this.setState((prevState) => ({
            hits: [...prevState.hits, ...data.hits],
            status: "resolved",
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  render() {
    const { hits, error, status } = this.state;

    if (status === "idle") {
      return <h2 className={s.text}>Input your image search query</h2>;
    }

    if (status === "pending") {
      return <Loader />;
    }

    if (status === "rejected") {
      return <h1>{error.message}</h1>;
    }

    if (status === "resolved") {
      return (
        <>
          <ul className={s.imageGallery}>
            {hits.map((hit) => (
              <ImageGalleryItem
                key={hit.id}
                hit={hit}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          {this.state.hits.length !== 0 ? (
            <Button onClick={this.props.loadMoreBtn} />
          ) : (
            alert("No results")
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
