import mysql from "mysql2";
import dbConfig from "../config/db.config";

console.log(dbConfig);
//데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// MySQL connection 실행
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
