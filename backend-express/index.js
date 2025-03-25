// Bibliotecas
const express = require('express')
const app = express()
const port = 3000

const swaggerJsDocs =require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const mysql = require('mysql2')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Definir la conexion de MySQL
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    // port:'3306',
    password:'Wi^sN7L*4SQg2q6jxwE#',
    database:'dreaming_flowers'
})

db.connect((errorDB)=>{
    if(errorDB){
        console.log("Error al conectarse al MySQL: ");
        console.log(errorDB.stack);
        
        return;
    }
    console.log('Conectado a MySQL');    
})

// Crear Primera Ruta

app.get('/', (req, res)=>{
    res.send("Bienvenidos al servidor")
    // res.send(File(indexedDB.html)) // no funciona
})

app.get('/contacto', (req, res)=>{
    res.send("Comuniquese a smalldickenergy@getalife.com")
})

/**
 * @swagger
 * /florerias:
 *  get:
 *      summary: Listado de Florerias
 *      tags: [Florerias]
 *      responses:
 *          200:
 *              description: Muestra la lista de floreria
 */
app.get('/florerias', (req, res)=>{
    db.query('select * from florerias', (err,results) => {
        if (err){
            console.log('Error al ejecutar la consulta');
            
        }
        res.json(results)
    })
})

/**
 * @swagger
 * /floreria/{id}:
 *  get:
 *      summary: Detalle de Floraria
 *      tags: [Florerias]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la floreria
 *      responses:
 *          200:
 *              description: Muestra el detalle de una floreria
 */
app.get('/floreria/:id', (req,res) => {
    const idFloreria = parseInt(req.params.id)
    db.query("SELECT * FROM florerias WHERE idfloreria = ?",
        [idFloreria], (err, resQuery) => {
            if (err) {
                res.status(400).send("Error al obtener la floreria")
                return
            }
            res.json(resQuery)
        })
})




// Procesar datos
/**
 * @swagger
 * tags:
 *    - name: Florerias
 *      description: API del catálogo de florerías
 *    - name: Categorias
 *      description: API de las categorias
 *    - name: Productos
 *      description: API de los productos
 * components:
 *      schemas:
 *          florerias:
 *              type: object
 *              required:
 *                  - nombre
 *                  - ubicacion
 *                  - telefono
 *              properties:
 *                  idFloreria:
 *                      type: integer
 *                      description: ID autoincrement de la floreria
 *                  nombre:
 *                      type: string
 *                      description: Nombre de la floreria
 *                      example: "Rosas del Atardecer"
 *                  ubicacion:
 *                      type: string
 *                      description: Lugar de la floreria
 *                      example: "Calle Primavera #123, Colonia Jardín, Ciudad Flores."
 *                  telefono:
 *                      type: string
 *                      description: Numero de telefono de la floreria
 *                      example: "5512345678"
 *  
 *          categorias:
 *              type: object
 *              required:
 *                  - nombre
 *              properties:
 *                  idCategoria:
 *                      type: integer
 *                      description: ID autoincrement de la categoria
 *                  nombre:
 *                      type: string
 *                      description: Nombre de la categoria
 *                      example: "Ramo"
 *                  descripcion:
 *                      type: string
 *                      description: Descripcion de la categoria
 *                      example: "Conjunto de flores atadas"
 *                  estatus:
 *                      type: integer
 *                      description: Estatus en el que se encuentra la categoria
 * 
 *          productos:
 *              type: object
 *              required:
 *                  - nombre
 *                  - precio
 *                  - imagen
 *                  - idFloreria
 *                  - idCategoria
 *              properties:
 *                  idProducto:
 *                      type: integer
 *                      description: ID autoincrement del producto
 *                  nombre:
 *                      type: string
 *                      description: Nombre del producto
 *                      example: "Mamá Bonita"
 *                  descripcion:
 *                      type: string
 *                      description: Descripcion del producto
 *                      example: "Bonito arreglo en base de vidrio"
 *                  precio:
 *                      type: double
 *                      description: Precio del producto
 *                      example: 100
 *                  imagen:
 *                      type: string
 *                      description: Nombre del archivo de la imagen
 *                      example: "mamaBonita.png"
 *                  idFloreria:
 *                      type: integer
 *                      description: Foreign key de la floreria en la que se encuentra el producto
 *                      example: "1"
 *                  idCategoria:
 *                      type: integer
 *                      description: Foreign key de la categoria del producto
 *                      example: "1"
 *                  estatus:
 *                      type: integer
 *                      description: Estatus en el que se encuentra el producto
 */

/**
 * @swagger
 * /guardar:
 *  post:
 *      summary: Crear florerias 
 *      tags: [Florerias]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/florerias'
 *      responses:
 *          200: 
 *              description: Guardar nueva floreria
 *          400:
 *              description: Datos incompletos
 */

app.post('/guardar',  (req, res)=>{
    const {nombre, ubicacion, telefono} = req.body // desconstruccion
    
    // Validar datos
    if(!nombre || !ubicacion || !telefono){
        return res.status(400).json({
            error:"Todos los campos son obligatorios"
        })
    }
    db.query('INSERT INTO florerias(nombre, ubicacion, telefono) VALUES (?,?,?);', [nombre, ubicacion, telefono], (err, resQuery) => {
        if (err) {
            res.status(400).send("Error al crear la floreria");
            console.log(err.stack);
            
            return;
        }

        res.status(201).send("Floraria creada")
    })
})

/**
 * @swagger
 * /florerias/{id}:
 *  put:
 *      summary: Editar florerias 
 *      tags: [Florerias]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la floreria
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/florerias'
 *      responses:
 *          200: 
 *              description: Guardar nueva floreria
 *          400:
 *              description: Datos incompletos
 */

app.put('/florerias/:id', (req, res) => {
    const { nombre, ubicacion, telefono } = req.body
    const idfloreria = parseInt(req.params.id)

    db.query("UPDATE florerias SET nombre = ?, ubicacion = ?, telefono = ? WHERE idfloreria = ?",
        [nombre, ubicacion, telefono, idfloreria],
        (err, result) => {
            if(err){
                res.status(400).send("Error al editar una floreria" + err.stack)
                return;
            }
            res.send("Floreria actualizada")
        }
    );
    
});

/**
 * @swagger
 * /florerias/{id}:
 *  delete:
 *      summary: Eliminacion de Floreria
 *      tags: [Florerias]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la floreria
 *            required: true
 *      responses:
 *          200: 
 *              description: Floreria eliminado
 */

app.delete('/florerias/:id', (req, res) => {
    const idfloreria = parseInt(req.params.id)
    db.query('DELETE FROM florerias WHERE idfloreria = ?', [idfloreria],
        (err, result) => {
            if (err) {
                res.status(400).send("Error al elminar una floreria")
                return;
            }
            res.send('Floreria eliminada correctamente');
        });
});




/**
 * @swagger
 * /productos:
 *  get:
 *      summary: Listado de Productos
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: Muestra la lista de Productos
 */
app.get('/productos', (req, res)=>{
    db.query('select * from productos', (err,results) => {
        if (err){
            console.log('Error al ejecutar la consulta');
            
        }
        res.json(results)
    })
})


/**
 * @swagger
 * /producto/{id}:
 *  get:
 *      summary: Detalle de producto
 *      tags: [Productos]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id del producto
 *      responses:
 *          200:
 *              description: Muestra el detalle de un producto
 */
app.get('/producto/:id', (req,res) => {
    const idFloreria = parseInt(req.params.id)
    db.query("SELECT * FROM productos WHERE idproducto = ?",
        [idFloreria], (err, resQuery) => {
            if (err) {
                res.status(400).send("Error al obtener la producto")
                return
            }
            res.json(resQuery)
        })
})


/**
 * @swagger
 * /crearProducto:
 *  post:
 *      summary: Crea un producto 
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/productos'
 *      responses:
 *          200: 
 *              description: Guardar nuevo producto
 *          400:
 *              description: Datos incompletos
 */

app.post('/crearProducto',  (req, res)=>{
    const {nombre, descripcion, precio, imagen, idFloreria, idCategoria} = req.body // desconstruccion
    
    // Validar datos
    if(!nombre || !descripcion || !precio || !imagen || !idFloreria || !idCategoria){
        return res.status(400).json({
            error:"Todos los campos son obligatorios"
        })
    }
    db.query('INSERT INTO productos(nombre, descripcion, precio, imagen, idFloreria, idCategoria) VALUES (?,?,?,?,?,?);', 
        [nombre, descripcion, precio, imagen, idFloreria, idCategoria], 
        (err, resQuery) => {
        if (err) {
            res.status(400).send("Error al crear el producto");
            console.log(err.stack);
            
            return;
        }

        res.status(201).send("Producto creado")
    })
})



/**
 * @swagger
 * /productos/{id}:
 *  put:
 *      summary: Editar producto
 *      tags: [Productos]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del producto
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/productos'
 *      responses:
 *          200: 
 *              description: Guardar nueva floreria
 *          400:
 *              description: Datos incompletos
 */

app.put('/productos/:id', (req, res) => {
    const { nombre, descripcion, precio, imagen, idFloreria, idCategoria } = req.body
    const idproducto = parseInt(req.params.id)

    // Validar datos
    if(!nombre || !descripcion || !precio || !imagen || !idFloreria || !idCategoria){
        return res.status(400).json({
            error:"Todos los campos son obligatorios"
        })
    }

    db.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, idFloreria = ?, idCategoria = ? WHERE idproducto = ?",
        [nombre, descripcion, precio, imagen, idFloreria, idCategoria, idproducto],
        (err, result) => {
            if(err){
                res.status(400).send("Error al editar el producto" + err.stack)
                return;
            }
            res.send("Producto actualizado")
        }
    );
    
});

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      summary: Eliminacion de producto
 *      tags: [Productos]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del producto
 *            required: true
 *      responses:
 *          200: 
 *              description: Producto eliminado
 */

app.delete('/productos/:id', (req, res) => {
    const idproducto = parseInt(req.params.id)
    db.query('DELETE FROM productos WHERE idproducto = ?', [idproducto],
        (err, result) => {
            if (err) {
                res.status(400).send("Error al elminar una floreria")
                return;
            }
            res.send('Prodcto eliminado correctamente');
        });
});

// Conf. swagger para la documentacion de las api
const swaggerOption = {
    swaggerDefinition:{
        openapi:'3.1.0',
        info:{
            title:'API de Dreaming Flowers',
            version:'1.0.0',
            description:'API de florerias'
        }
    },
    apis:['*.js']
}

const swaggerDocs = swaggerJsDocs(swaggerOption)
app.use('/apis-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// Hacer disponible servidor
app.listen(port,()=>{
    console.log("Servidor iniciado")
})



