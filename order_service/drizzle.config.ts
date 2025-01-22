import { defineConfig } from "drizzle-kit";
import { DB_URL } from "./src/config";

console.log(DB_URL);

export default defineConfig({
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL as string,
  },
  verbose: true,
  strict: true,
});
