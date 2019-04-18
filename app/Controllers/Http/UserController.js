"use strict";
const User = use("App/Models/User.js");
class UserController {
  async store({ response, request }) {
    try {
      const data = request.only(["name", "username", "password", "email"]);
      const user = await User.create(data);
      return user;
    } catch (err) {
      return response.status(404).send({ error: "Failed to creare user!" });
    }
  }
  async show({ response, params }) {
    try {
      const user = await User.findOrFail(params.id);
      return user;
    } catch (err) {
      return response.status(404).send({ error: "User not found!" });
    }
  }
  async update({ request, response, auth, params }) {
    try {
      const user = await User.findOrFail(params.id);
      console.log(auth.user);
      if (user.id !== auth.user.id) {
        return response.status(401).send({ error: "You not permission!" });
      }
      const data = request.only(["name", "username", "password", "email"]);
      user.merge(data);
      await user.save();
      return user;
    } catch (err) {
      return response.status(404).send({ error: "Failed to update user!" });
    }
  }
  async destroy({ params }) {
    try {
      const user = await User.findOrFail(params.id);
      if (params.id !== auth.user.id) {
        return response.status(401);
      }
      await user.delete();
    } catch (err) {
      return response.status(404).send({ error: "Failed to delete user" });
    }
  }
  async showUserForCashier({ response, params }) {
    try {
      const user = await User.query()
        .with("cashiers")
        .where({ id: params.id })
        .fetch();
      return user;
    } catch (err) {
      return response.status(404).send({ error: "User not found!" });
    }
  }
}

module.exports = UserController;
