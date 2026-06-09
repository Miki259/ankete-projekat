import { Request, Response } from "express";
import { db } from "../db/connection";

export async function login(req: Request, res: Response) {
  const { email, lozinka } = req.body;

  try {
    const [korisnici]: any = await db.query(
      "SELECT * FROM korisnik WHERE email = ? AND lozinka = ?",
      [email, lozinka]
    );

    if (korisnici.length > 0) {
      res.json(korisnici[0]);
    } else {
      res.status(401).json({ poruka: "Pogrešan email ili lozinka" });
    }
  } catch (greska) {
    res.status(500).json({ poruka: "Greška" });
  }
}