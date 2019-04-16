"use strict";

const Route = use("Route");
Route.resource("/user", "UserController")
  .apiOnly()
  .except("index");
Route.group(() => {}).middleware(["auth"]);
