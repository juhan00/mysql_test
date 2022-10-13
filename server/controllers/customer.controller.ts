import {
  create,
  getAll,
  findById,
  updateById,
  remove,
  removeAll,
} from "../models/customer.model";

//새 객체 생성
const customerCreate = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const customer = {
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
  };

  //데이터베이스에 저장
  create(customer, (err) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating th Customer.",
      });
    } else res.send({ message: `Customer create successfully!` });
  });
};

//전체 조회
const customerFindAll = (res) => {
  getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

//id로 조회
const customerFindOne = (req, res) => {
  findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id" + req.params.customerId,
        });
      }
    } else res.send(data);
  });
};

// id로 갱신
const customerUpdate = (req, res) => {
  //Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  updateById(req.params.customerId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id" + req.params.customerId,
        });
      }
    } else res.send(data);
  });
};

//id로 삭제
const customerDelete = (req, res) => {
  remove(req.params.customerId, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id" + req.params.customerId,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

//전체 삭제
const customerDeleteAll = (req, res) => {
  removeAll((err) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    } else res.send({ message: `All Customers were deleted successfully!` });
  });
};

export {
  customerCreate,
  customerFindAll,
  customerFindOne,
  customerUpdate,
  customerDelete,
  customerDeleteAll,
};
