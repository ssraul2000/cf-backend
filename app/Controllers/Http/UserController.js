"use strict";
const User = use("App/Models/User.js");
class UserController {
  async store({ response, request }) {
    const data = request.only(["name", "username", "password", "email"]);
    if (!data) {
      return response.status(404);
    }
    const user = await User.create(data);
    return user;
  }
  async show({ response, params }) {
    const user = await User.findOrFail(params.id);
    return user;
  }
  async update({ request, response, auth, params }) {
    const user = await User.findOrFail(params.id);
    if (user.id !== auth.id) {
      return response.status(401);
    }
    const data = request.all();
    user.merge(data);
    await user.saveOrFail();
    return user;
  }
  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    if (params.id !== auth.id) {
      return response.status(401);
    }
    await user.delete();
  }
}

module.exports = UserController;
