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
