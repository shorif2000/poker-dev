const Boom = require("boom");

const missingRoutesHandler = (req, h) => {
  const accept = req.raw.req.headers.accept;

  // take priority: check header if there’s a JSON REST request
  if (accept && accept.match(/json/)) {
    return h(Boom.notFound("This resource isn’t available."));
  }

  return h
    .view("error", { message: "This resource isn’t available." })
    .code(404);
};

module.exports = missingRoutesHandler;
