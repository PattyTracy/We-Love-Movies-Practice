const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function isShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where("mt.is_showing", true)
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
    list,
    isShowing,
    read
}