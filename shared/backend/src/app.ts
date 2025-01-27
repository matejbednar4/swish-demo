import express from "express";
import authRouter from "./routes/auth.js";
// import auth from "./middleware/auth.js";
import customersRouter from "./routes/customers.js";
import businessesRouter from "./routes/businesses.js";
import postsRouter from "./routes/posts.js";
import * as errors from "./middleware/errors.js";
import * as auth from "./middleware/auth.js";
import notFound from "./middleware/notFound.js";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use(auth.verifyJwt);

app.use("/customers", customersRouter);
app.use("/businesses", businessesRouter);
// app.use("/posts", postsRouter);

app.use(errors.errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}.`);
});
