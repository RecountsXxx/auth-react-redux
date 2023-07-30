const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const User = require("./models/User");
const AuthRoutes = require("./routes/auth.routes");
const middleware = require("./middleware/cors.middleware");
const app = express();
const PORT = config.get("serverPort");

mongoose.connect(config.get("dbUrl"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(middleware);
app.use(express.json());
app.use("/api/auth",AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
