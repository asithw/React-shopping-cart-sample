import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroups from "./ListGroups";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    displayItems: [],
    currentPage: 1,
    selectedGenre: null
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  deleteMovie(id) {
    console.log(id);
    const movies = this.state.movies.filter(m => m._id !== id);
    //this.setState({movies:movies});// if key and value is same.repetition can be removed
    this.setState({ movies });
  }

  handlePageChange = page => {
    console.log(page);
    //const item = movies.slice(((page-1) *pageSize ) ,(page+1) *pageSize);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
     this.setState({selectedGenre:genre});
  };
  render() {
    //const { length: count } = this.state.movies;
    //if (count === 0) return "there are no movies found in the database";
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre
    } = this.state;

    console.log("selectedGenre  ", selectedGenre);
    const filteredMovies = selectedGenre
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);
    console.log("filteredMovies  ", filteredMovies);
    const count = movies.length;
    if (count === 0) return "there are no movies found in the database";
   
    return (
      <div className="row">
        <div className="col-2">
          <ListGroups 
          items={genres} 
          onItemSelect={this.handleGenreSelect}
          selectedItem ={selectedGenre}
          />
        </div>
        <div className="col">
        <p>Showing {filteredMovies.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Genre</td>
                <td>Stock</td>
                <td>Rate</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {movies.map(m => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.numberInStock}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteMovie(m._id)}
                    >
                      delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
