import React, { Component } from 'react';   
class MoviesTable extends Component {
    state = {  }
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
          sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
     
        } else {
          sortColumn.path = path; 
          sortColumn.order = "asc";
        }
        console.log('sortColumn 2 ',sortColumn);
        this.props.onSort(sortColumn);
    }
    render() { 
        const { movies, onDelete } = this.props;
        return ( <table className="table">
        <thead>
          <tr>
             <th onClick={() => this.raiseSort( 'title' )} >Title</ th>
             <th onClick={() => this.raiseSort('genre.name')} >Genre</th>
             <th onClick={() => this.raiseSort('numberInStock')} >Stock</th>
             <th onClick={() => this.raiseSort('dailyRentalRate')} >Rate</th>
             <th    />
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
                  onClick={() => onDelete(m._id)}
                >
                  delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table> );
    }
}
 
export default MoviesTable; 
