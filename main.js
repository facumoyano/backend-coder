const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on("error", (error) => console.log(`error ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/productos", productsRouter);
