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
  mt_is_showing: ["movies", null, "is_showing"],
  mt_theater_id: ["movies", null, "theater_id"],
})

function list() {
  return knex("theaters as t")
  .select("theater_id", "name as theater_name")
  .leftJoin("movies_theaters as mt", "t.theater_id", "mt.theater_id")
  .leftJoin("movies as m", "mt.movie_id", "m.movie_id")
  .groupBy("t.theater_id", "t.name")
  .orderBy("t.theater_id")
  .groupByRaw("json_agg(json_build_object(\'id\', movies.id, \'title\', movies.title, \'release_date\', movies.release_date, \'genre\', movies.genre)) as movies")


//   return knex("theaters as t")
//   .leftJoin("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//   .rightJoin("movies as m", "mt.movie_id", "m.movie_id")
//   .select(
//     "t.*",
//     "m.movie_id",
//     "m.title",
//     "m.runtime_in_minutes",
//     "m.rating",
//     "m.description",
//     "m.image_url",
//     "m.created_at as m_created_at",
//     "m.updated_at as m_updated_at",
//     "mt.is_showing as mt_is_showing",
//     "mt.theater_id as mt_theater_id",
//     )
//     // 
//     .groupBy('t.theater_id')
//     .then(addMovies);
}

module.exports = {
  list,
};