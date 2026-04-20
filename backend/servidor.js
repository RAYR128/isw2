const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("funciona!");
});

app.listen(3000, () => {
	console.log("backend corriendo en http://localhost:3000");
});