const Boom = require("boom");

const missingRoutesHandler = (req, h) => {
  const { accept } = req.raw.req.headers;

  // take priority: check header if there’s a JSON REST request
  if (accept && accept.match(/json/)) {
    return h(Boom.notFound("This resource isn’t available."));
  }

  // const err = req.response;
  // const errName = err.output.payload.error;
  // const {statusCode} = err.output.payload;
  // const {message} = err.output.payload;
  // console.log(err);
  return h
    .view("error", { message: "This resource isn’t available." })
    .code(404);
};

module.exports = missingRoutesHandler;
