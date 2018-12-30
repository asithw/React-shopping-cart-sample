import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroups from "./ListGroups";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    displayItems: [],
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    console.log(this);
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deleteMovie = id => {
    console.log(this.state);
    console.log(id);
    const movies = this.state.movies.filter(m => m._id !== id);
    //this.setState({movies:movies});// if key and value is same.repetition can be removed
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(page);
    //const item = movies.slice(((page-1) *pageSize ) ,(page+1) *pageSize);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  render() {
    //const { length: count } = this.state.movies;
    //if (count === 0) return "there are no movies found in the database";
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    console.log("selectedGenre  ", selectedGenre);
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);

    console.log("sorted    ", sorted);
    const count = movies.length;
    if (count === 0) return "there are no movies found in the database";

    return (
      <div className="row">
        <div className="col-2">
          <ListGroups
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database.</p>
          <MoviesTable
            onDelete={this.deleteMovie}
            onSort={this.handleSort}
            movies={movies}
            sortColumn={sortColumn}
          />
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
