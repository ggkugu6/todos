require('dotenv').config();
const express = require('express');
const UserRouter = require('./routes/userRoutes');
const TaskRouter = require('./routes/taskRoutes');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT = 8082;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));

// Маршруты
app.use('/api', UserRouter);
app.use('/api', TaskRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const { filterUsersMiddleware, filterTasksMiddleware } = require('./middleware/authMiddleware.js');
console.log(filterUsersMiddleware)