import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination"; 

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize:4 

  };

  deleteMovie(id) {
    console.log(id);
    const movies = this.state.movies.filter(m => m._id !== id);
    //this.setState({movies:movies});// if key and value is same.repetition can be removed
    this.setState({ movies });
  }

  handlePageChange = (page) => {
    console.log(page);
  }
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return "there are no movies found in the database";

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
            {this.state.movies.map(m => (
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
        pageSize={this.state.pageSize}
        onPageChange={this.handlePageChange}
          />
      </React.Fragment>
    );
  }
}

export default Movies;
