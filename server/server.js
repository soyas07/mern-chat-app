import express from 'express';
import dotenv from 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

connectDB();
const app = express();

// middleware
app.use(express.json());

// routes api
app.get("/", (req, res) => {
    res.send("Api is running");
});

app.use('/api/user', userRoutes);
// error handling for invalid routes
app.use(notFound);
app.use(errorHandler);


// routes ends
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running at port ${PORT}`));