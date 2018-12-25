import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    displayItems: [],
    currentPage: 1
  };

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

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return "there are no movies found in the database";
    const { pageSize, currentPage, movies:allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);
    console.log(allMovies);
    return (
      <React.Fragment>
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
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
