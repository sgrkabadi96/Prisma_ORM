const express = require("express");
const userRouter = require("./src/routers/userRouter");
const blogRouter = require("./src/routers/blogRouter");


const app = express();

app.use(express.json());
const port = 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
