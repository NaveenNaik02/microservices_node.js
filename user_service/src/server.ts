import expressAap from "./expressApp";

const PORT = process.env.APP_PORT || 8003;

const StartServer = async () => {
  expressAap.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error("uncaught exception: ", err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is running");
});

export default StartServer;
