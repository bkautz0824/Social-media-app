import express from 'express';
import cors from 'cors';
import path from 'path'
import {fileURLToPath} from 'url';
import userRouter from './routes/users-routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());

// error handler

app.use("/users", userRouter)

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