const Path = require("path");
const hapi = require("hapi");
const inert = require("inert");
const vision = require("vision");
const Ejs = require("ejs");
const Crumb = require("@hapi/crumb");
const Blankie = require("blankie");
const Scooter = require("@hapi/scooter");
const routes = require("./routes");
const pkg = require("../package");

// Configure the server
const server = hapi.Server({
  host: "0.0.0.0",
  port: process.env.PORT || 3000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "..", "public")
    },
    state: {
      parse: true,
      failAction: "ignore"
    },
    security: {
      xframe: true,
      noOpen: false
    },
    cors: {
      origin: ["banglarelief.org"],
      headers: ["Authorization"], // an array of strings - 'Access-Control-Allow-Headers'
      exposedHeaders: ["Accept"], // an array of exposed headers - 'Access-Control-Expose-Headers',
      additionalExposedHeaders: ["Accept"], // an array of additional exposed headers
      maxAge: 60,
      credentials: true // boolean - 'Access-Control-Allow-Credentials'
    }
  }
});

server.events.on(
  { name: "request", channels: "error" },
  (request, event, tags) => {
    console.log(`Request ${event.request} failed`);
  }
);

const plugins = async () => {
  const pluginsToRegister = [
    inert,
    vision,
    require("hapi-mobile-views"),
    {
      plugin: Crumb,
      options: {
        cookieOptions: { isSecure: false },
        skip: () => {
          return true;
        }
      }
    },
    Scooter,
    {
      plugin: Blankie,
      options: {} // specify options here
    }
  ];
  await server.register(pluginsToRegister);
};

const init = async () => {
  await plugins();
  server.state("player", {
    ttl: null,
    clearInvalid: true,
    isSecure: false
  });
  server.views({
    engines: { ejs: Ejs },
    path: `${__dirname}/views`,
    layout: "layout"
  });
  await server.route(routes);
  return server;
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

// Transform non-boom errors into boom ones
server.ext("onPreResponse", (request, h) => {
  if (request.response.isBoom) {
    const err = request.response;
    const errName = err.output.payload.error;
    const { statusCode } = err.output.payload;

    return h
      .view("error", {
        message: err.output.payload.message,
        statusCode,
        errName
      })
      .code(statusCode);
  }

  return h.continue;
  /*
  // Transform only server errors 
  if (request.response.isBoom && request.response.isServer) {
    reply(boomify(request.response))
  } else {
    // Otherwise just continue with previous response
    reply.continue()
  }
*/
});

/*
function boomify(error) {
  // I'm using globals for some things (like sequelize), you should replace it with your sequelize instance
  if (error instanceof Core.db.sequelize.UniqueConstraintError) {
    const be = Boom.create(
      400,
      `child "${error.errors[0].path}" fails because ["${
        error.errors[0].path
      }" must be unique]`
    );
    be.output.payload.validation = {
      source: "payload",
      keys: error.errors.map(e => e.path)
    };
    return be;
  } 
    // If error wasn't found, return default boom internal error
    return Boom.internal("An internal server error", error);
  
}
*/

const start = async () => {
  try {
    await init();
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(
    `Server running at: ${server.info.uri}, ${process.env.HOSTNAME ||
      "localhost"}`
  );
  console.log(`Environment: ${process.env.NODE_ENV || "dev"}`);
};

module.exports = { init, start };
