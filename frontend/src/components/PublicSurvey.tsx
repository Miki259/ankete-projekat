import { useEffect, useState } from "react";

function PublicSurvey() {
  const [kod, setKod] = useState("");
  const [anketa, setAnketa] = useState<any>(null);
  const [odgovori, setOdgovori] = useState<any>({});
  const [poruka, setPoruka] = useState("");

  useEffect(() => {
    const parametri = new URLSearchParams(window.location.search);
    const kodIzLinka = parametri.get("kod");

    if (kodIzLinka) {
      setKod(kodIzLinka);
    }
  }, []);

  useEffect(() => {
    if (kod !== "") {
      ucitajAnketu();
    }
  }, [kod]);

  async function ucitajAnketu() {
    const odgovor = await fetch(`http://localhost:3000/api/anketa/${kod}`);

    if (odgovor.ok) {
      const podaci = await odgovor.json();
      setAnketa(podaci);
      setPoruka("");
    } else {
      setPoruka("Anketa nije pronađena");
    }
  }

  function promeniOdgovor(pitanjeId: number, vrednost: string) {
    setOdgovori({
      ...odgovori,
      [pitanjeId]: vrednost
    });
  }

  async function posaljiOdgovore() {
    const listaOdgovora = anketa.pitanja.map((p: any) => ({
      pitanje_id: p.id,
      vrednost: odgovori[p.id] || ""
    }));

    const odgovor = await fetch("http://localhost:3000/api/odgovori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        anketa_id: anketa.anketa.id,
        odgovori: listaOdgovora
      })
    });

    if (odgovor.ok) {
      setPoruka("Odgovori su uspešno poslati");
      setOdgovori({});
    } else {
      setPoruka("Greška pri slanju odgovora");
    }
  }

  function prikaziPolje(p: any) {
    if (p.tip === "dug_tekst") {
      return (
        <textarea
          className="form-control"
          value={odgovori[p.id] || ""}
          onChange={(e) => promeniOdgovor(p.id, e.target.value)}
        />
      );
    }

    if (p.tip === "da_ne") {
      return (
        <select
          className="form-select"
          value={odgovori[p.id] || ""}
          onChange={(e) => promeniOdgovor(p.id, e.target.value)}
        >
          <option value="">Izaberite</option>
          <option value="Da">Da</option>
          <option value="Ne">Ne</option>
        </select>
      );
    }

    if (p.tip === "slaganje") {
      return (
        <select
          className="form-select"
          value={odgovori[p.id] || ""}
          onChange={(e) => promeniOdgovor(p.id, e.target.value)}
        >
          <option value="">Izaberite</option>
          <option value="Uopšte se ne slažem">Uopšte se ne slažem</option>
          <option value="Ne slažem se">Ne slažem se</option>
          <option value="Neutralno">Neutralno</option>
          <option value="Slažem se">Slažem se</option>
          <option value="Potpuno se slažem">Potpuno se slažem</option>
        </select>
      );
    }

    if (p.tip === "ocena") {
      return (
        <select
          className="form-select"
          value={odgovori[p.id] || ""}
          onChange={(e) => promeniOdgovor(p.id, e.target.value)}
        >
          <option value="">Izaberite ocenu</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((broj) => (
            <option key={broj} value={broj}>
              {broj}
            </option>
          ))}
        </select>
      );
    }

    if (p.tip === "lista") {
      const opcije = p.opcije ? p.opcije.split(",") : [];

      return (
        <select
          className="form-select"
          value={odgovori[p.id] || ""}
          onChange={(e) => promeniOdgovor(p.id, e.target.value)}
        >
          <option value="">Izaberite</option>
          {opcije.map((opcija: string) => (
            <option key={opcija} value={opcija}>
              {opcija}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        className="form-control"
        value={odgovori[p.id] || ""}
        onChange={(e) => promeniOdgovor(p.id, e.target.value)}
      />
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Popunjavanje ankete</h2>

        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder="Unesite kod ankete"
            value={kod}
            onChange={(e) => setKod(e.target.value)}
          />

          <button className="btn btn-primary" onClick={ucitajAnketu}>
            Učitaj anketu
          </button>
        </div>

        {anketa && (
          <div className="border rounded p-3">
            <h3 className="h5">{anketa.anketa.naziv}</h3>
            <p>{anketa.anketa.opis}</p>

            {anketa.pitanja.map((p: any) => (
              <div className="mb-3" key={p.id}>
                <label className="form-label">{p.tekst}</label>
                {prikaziPolje(p)}
              </div>
            ))}

            <button className="btn btn-success" onClick={posaljiOdgovore}>
              Pošalji odgovore
            </button>
          </div>
        )}

        {poruka && <p className="mt-3 mb-0">{poruka}</p>}
      </div>
    </div>
  );
}

export default PublicSurvey;