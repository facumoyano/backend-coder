const socket = io();
socket.on("connect", () => {
    console.log("me conecte");
});

socket.on("msg", (data) => {
    console.log(data);
});

socket.on("products", (data) => {
    console.log(data);
});

socket.on("mensajes", (data) => {
    const html = data.reduce(
        (acc, item) => `${acc} <div class='chat-item'> ${item} </div>`,
        ""
    );
    document.getElementById("chat").innerHTML = html;
});

let prod = [];
socket.on("products", (data) => {
    let html = data.map((prod) => {
        return `
        <tr>
            <td>${prod.nombre}</td>
            <td>${prod.precio}</td>
            <td>
                <img src=${prod.imgUrl} />
            </td>
        </tr>`;
    });

    document.querySelector("#productos").innerHTML = html;
});

function enviar() {
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const fecha = new Date().toLocaleString();
    socket.emit(
        "msg",
        `<p class='email'>${email} </p> <p class='fecha'>${fecha} </p> <p class='mensaje'>${mensaje}</p>`
    );
}

function addProduct(addProduct) {
    let product = {
        nombre: addProduct.nombre.value,
        precio: addProduct.precio.value,
        imgUrl: addProduct.imgUrl.value,
    };

    socket.emit("addProduct", product);
}
