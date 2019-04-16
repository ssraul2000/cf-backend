'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
