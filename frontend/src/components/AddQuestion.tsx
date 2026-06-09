import { useState } from "react";

function AddQuestion() {
  const [anketaId, setAnketaId] = useState("");
  const [tekst, setTekst] = useState("");
  const [tip, setTip] = useState("kratak_tekst");
  const [opcije, setOpcije] = useState("");
  const [poruka, setPoruka] = useState("");

  async function sacuvajPitanje() {
    if (anketaId.trim() === "") {
      setPoruka("ID ankete je obavezan");
      return;
    }

    if (tekst.trim() === "") {
      setPoruka("Tekst pitanja je obavezan");
      return;
    }

    if (tip === "lista" && opcije.trim() === "") {
      setPoruka("Morate uneti opcije za listu");
      return;
    }

    const odgovor = await fetch("http://localhost:3000/api/pitanje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        anketa_id: anketaId,
        tekst,
        tip,
        opcije
      })
    });

    if (odgovor.ok) {
      setPoruka("Pitanje sačuvano");
      setTekst("");
      setOpcije("");
    } else {
      setPoruka("Greška pri čuvanju pitanja");
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Dodavanje pitanja</h2>

        <div className="mb-3">
          <label className="form-label">ID ankete</label>
          <input
            className="form-control"
            value={anketaId}
            onChange={(e) => setAnketaId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tekst pitanja</label>
          <input
            className="form-control"
            value={tekst}
            onChange={(e) => setTekst(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tip pitanja</label>
          <select
            className="form-select"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          >
            <option value="kratak_tekst">Kratak tekst</option>
            <option value="dug_tekst">Dug tekst</option>
            <option value="da_ne">Da / Ne</option>
            <option value="slaganje">Slaganje sa tvrdnjom</option>
            <option value="ocena">Ocena 1-10</option>
            <option value="lista">Lista ponuđenih odgovora</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Opcije za listu</label>
          <input
            className="form-control"
            value={opcije}
            onChange={(e) => setOpcije(e.target.value)}
            placeholder="npr. Java,Python,C#"
          />
        </div>

        <button
          className="btn btn-success"
          onClick={sacuvajPitanje}
        >
          Sačuvaj pitanje
        </button>

        {poruka && <p className="mt-3 mb-0">{poruka}</p>}
      </div>
    </div>
  );
}

export default AddQuestion;