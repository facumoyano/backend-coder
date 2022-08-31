const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");
const carritoRouter = require("./routes/carrito");
const Contenedor = require("./Contenedor");

let contenedor = new Contenedor("productos");

const app = express();

const PORT = 8080;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on("error", (error) => console.log(`error ${error}`));

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.json({
        message:
            "Bienvenido a la API de productos. Entra a /api/productos o api/carrito",
    });
});

app.use("/api/productos", productsRouter);
app.use("/api/carrito", carritoRouter);
