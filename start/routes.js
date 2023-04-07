'use strict'


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
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

