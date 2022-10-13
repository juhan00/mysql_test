import customerRoute from "./customer.routes";

const routerSetup = (app) => {
  customerRoute(app);
};

export { routerSetup };
