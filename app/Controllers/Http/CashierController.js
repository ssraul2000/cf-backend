"use strict";
const Cashier = use("App/Models/Cashier");
class CashierController {
  async index({ auth, response }) {
    try {
      const cashiers = await Cashier.query()
        .where("user_id", auth.user.id)
        .fetch();
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

  async cashierToDay({ response, auth }) {
    try {
      const now = new Date();
      const date = `${now.getFullYear()}-${now.getDay()}-${now.getDate()} 00:00:00`;
      const cashiers = await Cashier.query()
        .where("created_at", ">", date)
        .where("user_id", auth.user.id)
        .fetch();
      return cashiers;
    } catch (err) {
      return response.status(404).send({ error: "Failed to find cashier!" });
    }
  }
}

module.exports = CashierController;
