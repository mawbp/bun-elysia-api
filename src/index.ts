import { Elysia } from "elysia";
import postsApi from "./routes";

const app = new Elysia()

app.get("/", () => "Hello Elysia");
app.group("/api", (app) => app.use(postsApi));

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
