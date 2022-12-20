import express from 'express';
import cors from 'cors';
import path from 'path'
import {fileURLToPath} from 'url';
import userRouter from './routes/users-routes.mjs';
import postRouter from './routes/posts-routes.mjs';
import commentRouter from './routes/comment-routes.mjs';
import categoryRouter from './routes/category-routes.mjs';
import authRouter from './routes/auth-routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());

// error handler

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comment", commentRouter)
app.use("/category", categoryRouter)
app.use("/auth", authRouter)

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    console.log(err)
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err
    });
  });
  export default app