module.exports = (app) => {
  const customers = require("../controllers/customer.controller.ts");

  //튜플 생성
  app.post("/customers", customers.create);

  //전체 조회
  app.get("/customers", customers.findAll);

  //id로 조회
  app.get("/customers/:customerID", customers.findOne);

  //id로 수정
  app.put("/customers/:customerID", customers.update);

  //id로 삭제
  app.delete("/customers/:customerID", customers.delete);

  //전체 삭제
  app.delete("/customers", customers.deleteAll);
};
