import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;
const new1 = ENV + "";
const client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: new1.match("test") === null ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASS,
});
export default client;
