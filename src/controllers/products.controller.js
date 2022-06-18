const { conexion } = require("../db");
const { Product } = require("../models/Product");

const getProducts = async (request, response) => {
    console.log("Request received from the client");
    console.log("URL: ", request.url);
    console.log("METODO: ", request.method);
    console.log("USER AGENT: ", request.headers["user-agent"]);

    let respuesta = null;

    let sql = "SELECT * FROM scraping.products WHERE source='dia';";

    try {
        conexion.query(sql, function (error, resultado) {
            if (error) {
                console.log(error);
                respuesta = {
                    error: true,
                    codigo: 500,
                    mensaje: "No se pudo acceder a la base de datos",
                    datos: null,
                };
                response.status(400).send(respuesta);
            } else {
                console.log(resultado.length, "productos encontrados");
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: `${resultado.length} productos encontrados en la BBDD`,
                    datos: resultado,
                };
                response.status(200).send(respuesta);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const putProduct = async (request, response) => {
    console.log("Request received from the client");
    console.log("URL: ", request.url);
    console.log("METODO: ", request.method);
    console.log("USER AGENT: ", request.headers["user-agent"]);

    let producto = new Product(
        request.body.id,
        request.body.description,
        request.body.source,
        request.body.image,
        request.body.url,
        request.body.category,
        request.body.subcategory,
        request.body.type,
        request.body.outOfStock ? 1 : 0
    );
    console.log(producto);
    let respuesta = null;
    console.log("Producto modificado por el usuario", producto);

    let sql = `UPDATE products SET description= ?, image = ?, outOfStock = ? WHERE idproduct=?;`;
    let params = [
        producto.description,
        producto.image,
        producto.outOfStock,
        producto.id,
    ];
    try {
        conexion.query(sql, params, function (error, resultado) {
            if (error) {
                console.log(error);
                respuesta = {
                    error: true,
                    codigo: 500,
                    mensaje:
                        "No se pudo actualizar el producto en la base de datos",
                    datos: null,
                };
                response.status(400).send(respuesta);
            } else {
                console.log(resultado);
                if (resultado.affectedRows === 0) {
                    respuesta = {
                        error: true,
                        codigo: 404,
                        mensaje: `No se ha hallado ningún producto con id ${id}`,
                        datos: { producto: producto },
                    };
                    response.status(200).send(respuesta);
                } else {
                    console.log(
                        "Producto actualizado en la base de datos",
                        producto.id
                    );
                    respuesta = {
                        error: false,
                        codigo: 200,
                        mensaje: `Producto con id ${producto.id} actualizado`,
                        datos: { producto: producto },
                    };
                    response.status(200).send(respuesta);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (request, response) => {
    console.log("Request received from the client");
    console.log("URL: ", request.url);
    console.log("METODO: ", request.method);
    console.log("USER AGENT: ", request.headers["user-agent"]);

    let id = request.query.id;
    let respuesta = null;
    console.log("Solicitud de borrado de producto", id);

    let sql = `DELETE FROM products WHERE idproduct=?;`;
    let params = [id];

    try {
        conexion.query(sql, params, function (error, resultado) {
            if (error) {
                console.log(error);
                respuesta = {
                    error: true,
                    codigo: 500,
                    mensaje: "No se pudo eliminar el product",
                    datos: null,
                };
                response.status(400).send(respuesta);
            } else {
                console.log(resultado);
                if (resultado.affectedRows === 0) {
                    respuesta = {
                        error: true,
                        codigo: 404,
                        mensaje: `No se ha hallado ningún producto con id ${id}`,
                        datos: { id: id },
                    };
                    response.status(200).send(respuesta);
                } else {
                    respuesta = {
                        error: false,
                        codigo: 200,
                        mensaje: `Producto con id ${id} eliminado`,
                        datos: { id: id },
                    };
                    response.status(200).send(respuesta);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getProducts, putProduct, deleteProduct };
