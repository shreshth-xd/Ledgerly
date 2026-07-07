import app from "./app";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  const address = server.address();

  if (address && typeof address !== "string") {
    console.log(`Server listening on port ${address.port}`);
  }
});

server.on("error", (err) => {
  console.error(err);
});