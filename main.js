const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");
const Contenedor = require("./Contenedor");

let contenedor = new Contenedor("contenedor");

const app = express();

const PORT = 8080;

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(process.env.PORT || PORT, () => console.log("SERVER ON"));

// const server = app.listen(PORT, () => {
//     console.log(
//         `Servidor http escuchando en el puerto ${server.address().port}`
//     );
// });
// server.on("error", (error) => console.log(`error ${error}`));

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("pages/form");
});

// app.post("/api/productos", (req, res) => {
//     const { body } = req;

//     (async () => {
//         await contenedor.save(body).then((response) => {
//             res.json(response);
//         });
//     })();
//     res.redirect("/productos");
// });

// app.get("/productos", (req, res) => {
//     (async () => {
//         await contenedor.getAll().then((response) => {
//             if (response) {
//                 res.render("pages/productslist", {
//                     products: response,
//                     productsExist: true,
//                 });
//             } else {
//                 res.render("pages/error", {
//                     message: "No hay productos",
//                 });
//             }
//         });
//     })();
// });

app.use("/api/productos", productsRouter);

let chat = [];
let products = [
    {
        nombre: "Celular",
        precio: 500,
        imgUrl: "https://images.fravega.com/f300/5d01c9d51a16dcbd97566d776b64152d.jpg.webp",
        id: 1,
    },
    {
        nombre: "TV",
        precio: 1000,
        imgUrl: "https://images.fravega.com/f300/f5d647127053614f51056fff718ca224.jpg.webp",
        id: 2,
    },
    {
        nombre: "PC",
        precio: 1500,
        imgUrl: "https://images.fravega.com/f300/e46a96ef81b05d78e49a35367a822a86.jpg.webp",
        id: 3,
    },
    {
        nombre: "Silla",
        precio: 500,
        imgUrl: "https://images.fravega.com/f300/8147ed46666da4f598d1ee6c4e2ba71b.jpg.webp",
        id: 4,
    },
    {
        nombre: "notebook",
        precio: "1000",
        imgUrl: "https://images.fravega.com/f300/2fbbcdef9cdaa3e12dd715c27f9db7a4.jpg.webp",
        id: 5,
    },
];

io.on("connection", (socket) => {
    console.log("Usuario conectado " + socket.id);

    socket.emit("msg", "mensaje del servidor");
    socket.emit("products", products);

    socket.on("msg", (data) => {
        chat.push(data);
        io.sockets.emit("mensajes", chat);
    });

    socket.on("addProduct", (data) => {
        products.push(data);
        io.sockets.emit("products", products);
    });
});
