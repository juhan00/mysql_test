import sql from "./db";

// 생성자
// const newCustomer = (customer) => {
//   const email = customer.email;
//   const name = customer.name;
//   const active = customer.active;
// };

// customer 튜플 추가
const create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res: any) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

//customer id로 조회
const findById = (customerID, result) => {
  sql.query(
    "SELECT * FROM customers WHERE id=?",
    customerID,
    (err, res: any) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customer:", res[0]);
        result(null, res[0]);
        return;
      }

      //결과가 없을 시
      result({ kind: "not_found" }, null);
    }
  );
};

//customer 전체 조회
const getAll = (result) => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    console.log("customer:", res);
    result(null, res);
  });
};

//customer id로 수정
const updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email=?, name=?, active=?WHERE id=?",
    [customer.email, customer.name, customer.active, id],
    (err, res: any) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        //id 결과가 없을 시
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("update customer:", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

//customer id로 삭제
const remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id=?", id, (err, res: any) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      //id 결과가 없을 시
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id:", id);
    result(null, res);
  });
};

//customer 전체 삭제
const removeAll = (result) => {
  sql.query("DELETE FROM customers", (err, res: any) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      //id 결과가 없을 시
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};
export { create, findById, getAll, updateById, remove, removeAll };
