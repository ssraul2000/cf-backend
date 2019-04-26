"use strict";

const Route = use("Route");
Route.post("/user", "UserController.store");
Route.post("/auth", "AuthController.store");
Route.group(() => {
  //User
  Route.get("/user/:id", "UserController.show");
  Route.put("/user/:id", "UserController.update");
  Route.delete("/user/:id", "UserController.delete");
  Route.get("/user/:id/cashier", "UserController.showUserForCashier");

  //Cashier
  Route.resource("/cashier", "CashierController").apiOnly();
  Route.get("/cashiers/day", "CashierController.cashierToDay");
}).middleware(["auth"]);
