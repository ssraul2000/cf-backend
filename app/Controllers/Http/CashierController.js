"use strict";

const Cashier = use("App/Models/Cashier");
class CashierController {
  async index({ request, response, view }) {
    try {
      const cashiers = await Cashier.all();
      return cashiers;
    } catch (err) {
      return response.status(404).send({ error: "Failed to find cashiers!" });
    }
  }

  async store({ response, auth }) {
    try {
      const cashier = await Cashier.create({ user_id: auth.user.id });
      return cashier;
    } catch (err) {
      return response.status(404).send({ error: "Failed to create cashier!" });
    }
  }

  async show({ params, response }) {
    try {
      const cashier = await Cashier.find(params.id);
      return cashier;
    } catch (err) {
      return response.status(404).send({ error: "Cashier not found!" });
    }
  }
  async update({ params, request, response }) {
    try {
      const cashier = await Cashier.find(params.id);
      if (auth.user.id !== cashier.id) {
        return response.status(401).send({ error: "You not permission!" });
      }
      const data = request.only(["user_id"]);
      cashier.merge(data);
      await cashier.save();
      return cashier;
    } catch (err) {
      return response.status(404).send({ error: "Failed to update cashier!" });
    }
  }
  async destroy({ params, response }) {
    try {
      const cashier = await Cashier.find(params.id);
      if (auth.user.id !== cashier.id) {
        return response.status(401).send({ error: "You not permission!" });
      }
      await cashier.delete();
    } catch (err) {
      return response.status(404).send({ error: "Failed to delete cashier!" });
    }
  }
}

module.exports = CashierController;
