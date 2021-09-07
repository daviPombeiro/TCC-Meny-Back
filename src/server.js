const express = require('express');
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv/config");

const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGOOSE_STRING_CONNECTION, { useNewUrlParser: true });

const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"))

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 5000, () => console.log("Server started"))
