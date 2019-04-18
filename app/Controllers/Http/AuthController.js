"use strict";

class AuthController {
  async store({ auth, request, response }) {
    try {
      const { username, password } = request.only(["username", "password"]);
      const token = await auth.attempt(username, password);
      return token;
    } catch (err) {
      return response.status(404).send({ error: "Failed to login!" });
    }
  }
}

module.exports = AuthController;
