const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const data = knex("theaters").select("*");

const addMovies = reduceProperties("theater_id", {
  theater_id: ["theater", "theater_id"],
  name: ["theater", "name"],
  address_line_1: ["theater", "address_line_1"],
  address_line_2: ["theater", "address_line_2"],
  city: ["theater", "city"],
  state: ["theater", "state"],
  zip: ["theater", "zip"],
  created_at: ["theater", "created_at"],
  updated_at: ["theater", "created_at"],
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  m_created_at: ["movies", null, "movie.created_at"],
  m_updated_at: ["movies", null, "movie.updated_at"],
  is_showing: ["movies_theaters", null, "is_showing"],
  mt_theater_id: ["movies_theaters", null, "movies_theaters.updated_at"],
})

function list() {
  return knex("theaters as t")
  .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
  .join("movies as m", "mt.movie_id", "m.movie_id")
  .select(
    "t.theater_id",
    "t.name",
    "t.address_line_1",
    "t.address_line_2",
    "t.city",
    "t.state",
    "t.zip",
    "t.created_at",
    "t.updated_at",
    "m.movie_id",
    "m.title",
    "m.runtime_in_minutes",
    "m.rating",
    "m.description",
    "m.image_url",
    "m.created_at as m_created_at",
    "m.updated_at as m_updated_at",
    "mt.is_showing",
    "mt.theater_id as mt_theater_id",
    )
    .then(addMovies);
}

module.exports = {
  list,
};