import { db } from "./db/connection";

async function test() {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
}

test();