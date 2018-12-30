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

  deleteMovie = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
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

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

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
    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    //const { length: count } = this.state.movies;
    //if (count === 0) return "there are no movies found in the database";
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const { totalCount, data } = this.getPagedData();

    if (totalCount === 0) return "there are no movies found in the database";

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
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            onDelete={this.deleteMovie}
            onSort={this.handleSort}
            movies={data}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={totalCount}
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
