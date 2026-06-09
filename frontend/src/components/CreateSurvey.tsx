import { useState } from "react";

function CreateSurvey() {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [poruka, setPoruka] = useState("");
  const [kod, setKod] = useState("");

  async function sacuvajAnketu() {
    if (naziv.trim() === "") {
      setPoruka("Naziv ankete je obavezan");
      return;
    }

    if (opis.trim() === "") {
      setPoruka("Opis ankete je obavezan");
      return;
    }

    const odgovor = await fetch("http://localhost:3000/api/anketa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ naziv, opis })
    });

    const podaci = await odgovor.json();

    if (odgovor.ok) {
      setPoruka(podaci.poruka);
      setKod(podaci.kod);
      setNaziv("");
      setOpis("");
    } else {
      setPoruka("Greška pri čuvanju ankete");
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Kreiranje ankete</h2>

        <div className="mb-3">
          <label className="form-label">Naziv ankete</label>
          <input
            className="form-control"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Opis</label>
          <textarea
            className="form-control"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />
        </div>

        <button className="btn btn-success" onClick={sacuvajAnketu}>
          Sačuvaj anketu
        </button>

        {poruka && <p className="mt-3 mb-0">{poruka}</p>}

        {kod && (
          <div className="alert alert-info mt-3 mb-0">
            <p className="mb-1">
              Kod ankete: <b>{kod}</b>
            </p>

            <p className="mb-0">
              Link za popunjavanje:{" "}
              <b>{`http://localhost:3000/?kod=${kod}`}</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSurvey;