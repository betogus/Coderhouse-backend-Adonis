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