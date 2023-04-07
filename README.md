# Desafío 23 

> Frameworks - Adonis

> > Creamos un proyecto sin vistas

```
adonnis new --api-only desafio23-Adonis
```

> > Creamos el modelo Producto y su archivo migration a través del siguiente comando

```
adonis make:model Producto --migration
```

> > Modificamos el archivo .env para utilizar mysql

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=desafio23
```

> > Modificamos el modelo Producto.js


```
'use strict'

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  static get table() {
    return 'products'
  }

  static async insertData(product) {
    try {
        await Product.create(product)
        return {message: "Se agregó con éxito"}
    } catch (err) {
        return {err}
    }
  }

  static async getAll() {
    let products = await Product.all()
    if (products.length != 0) {
        return {products}
    } else {
        return {message: "No hay productos"}
    }
  }

  static async getById(id) {
    let product = await Product.find(id)
    if (!product) {
        return {message: "No hay coincidencias"}
    } else {
        return {product}
    }
  }

  static async noHayStock(id) {
    const product = await Product.find(id)
    if (!product) {
        return {message: "No hay coincidencias"}
    } else {
        product.hasStock = false
        await product.save()
        return {message: "Se modificó con éxito"}
    }
  }

  static async delete(id) {
    const product = await Product.find(id)
    if (!product) {
        return {message: "No hay coincidencias"}
    } else {
        await product.delete()
        return {message: "Se eliminó con éxito"}
    }
    
  }

}

module.exports = Product
```

> > El migration de producto tambien:

```
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('products', (table) => {
     table.increments().unique()
     table.string('name', 20).unique().notNullable();
     table.integer('price').unique().notNullable();
     table.boolean('hasStock').defaultTo(true).notNullable();
     table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductoSchema

```


> > Iniciamos mysql en XAMPP, instalamos mysql en el proyecto, desde el MySQL Workbench creamos la base de datos desafio23 y luego en la terminal corremos el migration:

```
adonis migration:run
```

> > Finalmente, creamos la ruta /products dentro de routes.js

```
const Route = use('Route')
const productModel = use('App/Models/Producto')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/products', async({ request,response} ) => {
    let result = await productModel.getAll()
    return result
})

Route.get('/products/:id', async({request, response, params}) => {
    let id = params.id
    let result = await productModel.getById(parseInt(id))
    return result
})

Route.put('/products/:id', async ({request, response, params}) => {
    let id = params.id
    let result = await productModel.noHayStock(id)
    return  result 
})

Route.post('/products', async ({ request, response }) => {
  let product = request.body
  if (product.name || product.price) {
    let newProduct = { ...product, hasStock: true }
    let result = await productModel.insertData(newProduct)
    return  result 
  } else {
    return { message: "Faltan datos" }
  }
})

Route.delete('/products/:id', async ({request, response, params}) => {
    let id = params.id
    let result = await productModel.delete(id)
    return  result 
} )

```

> > Probamos en thunderClient la ruta /products con sus 4 métodos. 