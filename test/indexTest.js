const { init } = require("../src/server");

describe("GET /", () => {
  let server;

  beforeEach(async () => {
    server = init();
  });

  afterEach(async () => {
    console.log(server);
    return server.stop();
  });

  test("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/"
    });
    expect(res.statusCode).to.equal(200);
  });
});
