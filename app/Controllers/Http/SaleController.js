"use strict";
const Sale = use("App/Models/Sale");
class SaleController {
  async index({ response }) {
    try {
      const sales = await Sale.all();
      return sales;
    } catch (err) {
      return response.status(404).send({ error: "Not exists sales!" });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only([""]);
      const sale = await Sale.create(data);
      return sale;
    } catch (err) {
      return response.status(404).send({ error: "Failed to create sale!" });
    }
  }
  async show({ params, response }) {
    try {
      const sale = await Sale.findOrFail(params.id);
      return sale;
    } catch (err) {
      return response.status(404).send({ error: "Sale not found!" });
    }
  }

  async update({ params, request, response, auth }) {
    try {
      const sale = await Sale.findOrFail(params.id);
      if (auth.user.id !== Sale.user_id) {
        return response.status(401).send({ error: "You not permission!" });
      }
      const data = request.only([""]);
      sale.merge(data);
      await sale.save();
      return sale;
    } catch (err) {
      return response.status(404).send({ error: "Failed to update sale!" });
    }
  }

  async destroy({ params, response, auth }) {
    try {
      const sale = await Sale.findOrFail(params.id);
      if (auth.user.id !== sale.user_id) {
        return response.status(401).send({ error: "You not permission!" });
      }
      await sale.delete();
    } catch (err) {
      return response.status(404).send({ error: "Failed to delete sale!" });
    }
  }
}

module.exports = SaleController;
