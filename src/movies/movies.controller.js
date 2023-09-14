const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const data = await moviesService.list();
    res.json({ data });
}

async function isShowing(req, res) {
    const data = await moviesService.isShowing();
    res.json({ data })
}

async function movieExists(req, res) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404, message: "Movie cannot be found."
    });
}

async function read(req, res) {
    const { data } = res.locals.movie;
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    isShowing: asyncErrorBoundary(isShowing),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)]
}