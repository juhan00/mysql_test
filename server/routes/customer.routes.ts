import {
  customerCreate,
  customerFindAll,
  customerFindOne,
  customerUpdate,
  customerDelete,
  customerDeleteAll,
} from "../controllers/customer.controller";

const customerRoute = (app) => {
  //튜플 생성
  app.post("/customers", customerCreate);

  //전체 조회
  app.get("/customers", customerFindAll);

  //id로 조회
  app.get("/customers/:customerID", customerFindOne);

  //id로 수정
  app.put("/customers/:customerID", customerUpdate);

  //id로 삭제
  app.delete("/customers/:customerID", customerDelete);

  //전체 삭제
  app.delete("/customers", customerDeleteAll);
};

export default customerRoute;
