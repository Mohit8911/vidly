import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../util/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currPage: 1,
    genres: [],
    currGenre: { name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchValue: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres: genres });
  }

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("This movie was already deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index]={...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelect = (genre) => {
    this.setState({ currGenre: genre, currPage: 1, searchValue: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchValue: query,
      currGenre: { name: "All Genres" },
      currPage: 1,
    });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currPage,
      currGenre,
      sortColumn,
      searchValue,
    } = this.state;
    let filtered = allMovies;
    if (searchValue === "") {
      filtered =
        currGenre && currGenre._id
          ? allMovies.filter((movie) => movie.genre._id === currGenre._id)
          : allMovies;
    } else {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currPage, pageSize);

    return { data: movies, totalCount: filtered.length };
  };

  render() {
    const { pageSize, currPage, genres, currGenre, sortColumn, searchValue } =
      this.state;
    const { data: movies, totalCount } = this.getPagedData();
    const { user } = this.props;

    return (
      <React.Fragment>
        <div className=" row container">
          <div className="col-3">
            {user && (
              <Link
                className="btn btn-primary btn-lg mb-4"
                to="/movies/addMovie"
              >
                Add Movie
              </Link>
            )}

            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              currItem={currGenre}
            />
          </div>
          <div className="col">
            <h3 className="m-4">
              There are {totalCount || "no"} movies in the database
            </h3>
            <SearchBox value={searchValue} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currPage={currPage}
              currGenre={currGenre}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
