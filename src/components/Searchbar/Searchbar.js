import { useState } from 'react';
import {HiSearchCircle} from 'react-icons/hi'
import s from './Searchbar.module.css'
import { toast } from 'react-toastify';

const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('')

  const handleQueryChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase())
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      return toast.error("Input valid image query", {
        toastId: "input_error",
      });
    }

    onSubmit(query);
    setQuery('')
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <HiSearchCircle size={36} />
          <span className={s.button_label}>Search</span>
        </button>

        <input
          className={s.input}
          value={query}
          onChange={handleQueryChange}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

// class Searchbar extends Component {
//   state = {
//     query: "",
//   };

//   handleQueryChange = (e) => {
//     this.setState({ query: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     if (this.state.query.trim() === "") {
//       return toast.error("Input valid image query", {
//         toastId: 'input_error'
//       });
//     }

//     this.props.onSubmit(this.state.query);
//     this.setState({ query: "" });
//   };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form className={s.form} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.button}>
//             <HiSearchCircle size={36} />
//             <span className={s.button_label}>Search</span>
//           </button>

//           <input
//             className={s.input}
//             value={this.state.query}
//             onChange={this.handleQueryChange}
//             type="text"
//             name="query"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;