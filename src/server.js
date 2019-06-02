const Path = require("path");
const hapi = require("hapi");
const inert = require("inert");
const vision = require("vision");
const Ejs = require("ejs");
const pkg = require("../package");
const routes = require("./routes");
const Crumb = require("@hapi/crumb");
const Blankie = require("blankie");
const Scooter = require("@hapi/scooter");

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
      xframe: false,
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
    { plugin: Crumb, options: { cookieOptions: { isSecure: false } } },
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
