const express = require("express");

const Contenedor = require("../Contenedor");

const router = express.Router();

let contenedor = new Contenedor("carrito");

let isAdmin = true;

router.get("/", (req, res) => {
    (async () => {
        await contenedor.getAll().then((response) => {
            res.json(response);
        });
    })();
});

router.get("/:id/productos", (req, res) => {
    const { id } = req.params;
    const idParse = parseInt(id);

    (async () => {
        await contenedor.getById(idParse).then((response) => {
            if (!response) {
                res.send({ error: "producto no encontrado" });
            }
            res.json(response.productos);
        });
    })();
});

router.post(
    "/",

    (req, res, next) => {
        const { body } = req;
        (async () => {
            await contenedor.createCart().then((response) => {
                res.json(response);
            });
        })();
    }
);

router.post(
    "/:id/productos",

    (req, res, next) => {
        const { body } = req;
        const { id } = req.params;
        const idParse = parseInt(id);

        (async () => {
            await contenedor
                .addProductToCart(idParse, body)
                .then((response) => {
                    res.json(response);
                });
        })();
    }
);

router.delete(
    "/:id",

    (req, res, next) => {
        const { id } = req.params;
        const idParse = parseInt(id);

        (async () => {
            await contenedor.deleteById(idParse).then((response) => {
                res.json(response);
            });
        })();
    }
);

router.delete(
    "/:id/productos/:idProducto",

    (req, res, next) => {
        const { id, idProducto } = req.params;
        const idParse = parseInt(id);
        const idProductoParse = parseInt(idProducto);

        (async () => {
            await contenedor
                .deleteByIdProductCart(idParse, idProductoParse)
                .then((response) => {
                    res.json(response);
                });
        })();
    }
);

module.exports = router;
