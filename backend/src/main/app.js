const express = require("express");
const bodyParser = require("body-parser");

const DebugControl = require('./utils/debug.js');
const corsMiddleware = require("./middlewares/cors.middleware");
const connectDatabase = require("./mongo/mongo");
const userRoutes = require("./routes/user.route");
const lessonRoutes = require("./routes/password.route");
const authRoutes = require("./routes/auth.route");

const app = express();

function setupMiddleware(application) {
    application.use(corsMiddleware);
    // Parses request data
    application.use(bodyParser.json());
    application.use(bodyParser.urlencoded({extended: true}));
    // Logs request debug information
    application.use(DebugControl.log.request());
}

setupMiddleware(app);

// Setup routes
app.use("/v1/user", userRoutes);
app.use("/v1/lesson", lessonRoutes);
app.use("/v1/auth", authRoutes);

// Connect to database
connectDatabase().then(r => console.log(r));

module.exports = app;