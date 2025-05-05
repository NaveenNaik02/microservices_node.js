import expressApp from "./expressApp";

const PORT = process.env.APP_PORT || 8004;

const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error(err);
    process.exit(1);
  });
};

StartServer();
