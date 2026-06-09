import { Request, Response } from "express";
import { db } from "../db/connection";

export async function createAnketa(req: Request, res: Response) {
  const { naziv, opis } = req.body;

  const kod = Math.random().toString(36).substring(2, 12);

  try {
    await db.query(
      "INSERT INTO anketa (korisnik_id, naziv, opis, kod) VALUES (?, ?, ?, ?)",
      [1, naziv, opis, kod]
    );

    res.json({
      poruka: "Anketa sačuvana",
      kod
    });
  } catch (error) {
    res.status(500).json({
      poruka: "Greška"
    });
  }
}

export async function createPitanje(req: Request, res: Response) {
  const { anketa_id, tekst, tip, opcije } = req.body;

  try {
    await db.query(
      "INSERT INTO pitanje (anketa_id, tekst, tip, opcije) VALUES (?, ?, ?, ?)",
      [anketa_id, tekst, tip, opcije]
    );

    res.json({
      poruka: "Pitanje sačuvano"
    });
  } catch (error) {
    res.status(500).json({
      poruka: "Greška pri čuvanju pitanja"
    });
  }
}

export async function getAnketaByKod(req: Request, res: Response) {
  const { kod } = req.params;

  try {
    const [ankete]: any = await db.query(
      "SELECT * FROM anketa WHERE kod = ?",
      [kod]
    );

    if (ankete.length === 0) {
      return res.status(404).json({
        poruka: "Anketa nije pronađena"
      });
    }

    const anketa = ankete[0];

    const [pitanja]: any = await db.query(
      "SELECT * FROM pitanje WHERE anketa_id = ?",
      [anketa.id]
    );

    res.json({
      anketa,
      pitanja
    });
  } catch (error) {
    res.status(500).json({
      poruka: "Greška"
    });
  }
}

export async function submitOdgovori(req: Request, res: Response) {
  const { anketa_id, odgovori } = req.body;

  try {
    const [rezultat]: any = await db.query(
      "INSERT INTO popunjavanje (anketa_id) VALUES (?)",
      [anketa_id]
    );

    const popunjavanjeId = rezultat.insertId;

    for (const odgovor of odgovori) {
      await db.query(
        "INSERT INTO odgovor (popunjavanje_id, pitanje_id, vrednost) VALUES (?, ?, ?)",
        [popunjavanjeId, odgovor.pitanje_id, odgovor.vrednost]
      );
    }

    res.json({
      poruka: "Odgovori su sačuvani"
    });
  } catch (error) {
    res.status(500).json({
      poruka: "Greška pri čuvanju odgovora"
    });
  }
}

export async function getRezultati(req: Request, res: Response) {
  const { anketaId } = req.params;

  try {
    const [rezultati]: any = await db.query(
      `
      SELECT
        pitanje.tekst,
        odgovor.vrednost
      FROM odgovor
      JOIN pitanje
        ON odgovor.pitanje_id = pitanje.id
      JOIN popunjavanje
        ON odgovor.popunjavanje_id = popunjavanje.id
      WHERE popunjavanje.anketa_id = ?
      `,
      [anketaId]
    );

    res.json(rezultati);
  } catch (error) {
    res.status(500).json({
      poruka: "Greška pri učitavanju rezultata"
    });
  }
}

export async function exportCsv(req: Request, res: Response) {
  const { anketaId } = req.params;

  try {
    const [pitanja]: any = await db.query(
      "SELECT id, tekst FROM pitanje WHERE anketa_id = ?",
      [anketaId]
    );

    const [popunjavanja]: any = await db.query(
      "SELECT id FROM popunjavanje WHERE anketa_id = ?",
      [anketaId]
    );

    let csv =
    pitanja.map((p: any) => `"${p.tekst}"`).join(",") + "\n";

    for (const popunjavanje of popunjavanja) {
      const redovi: string[] = [];

      for (const pitanje of pitanja) {
        const [odgovori]: any = await db.query(
          "SELECT vrednost FROM odgovor WHERE popunjavanje_id = ? AND pitanje_id = ?",
          [popunjavanje.id, pitanje.id]
        );

        redovi.push(`"${odgovori[0]?.vrednost || ""}"`);
      }

      csv += redovi.join(",") + "\n";
    }

    res.setHeader(
      "Content-Type",
      "text/csv; charset=utf-8"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=rezultati_ankete.csv"
    );

    res.send(csv);
  } catch (error) {
    res.status(500).json({
      poruka: "Greška pri exportu CSV fajla"
    });
  }
}

export async function getSveAnkete(req: Request, res: Response) {
  try {
    const [ankete]: any = await db.query(
      "SELECT id, naziv, opis, kod FROM anketa ORDER BY id DESC"
    );

    res.json(ankete);
  } catch (error) {
    res.status(500).json({
      poruka: "Greška pri učitavanju anketa"
    });
  }
}