import { useState } from "react";
import CreateSurvey from "./components/CreateSurvey";
import AddQuestion from "./components/AddQuestion";
import PublicSurvey from "./components/PublicSurvey";
import Results from "./components/Results";
import MySurveys from "./components/MySurveys";

function App() {
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [poruka, setPoruka] = useState("");
  const [prijavljen, setPrijavljen] = useState(false);
  const [stranica, setStranica] = useState("popunjavanje");

  async function prijava(e: React.FormEvent) {
    e.preventDefault();

    const odgovor = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, lozinka })
    });

    if (odgovor.ok) {
      setPrijavljen(true);
      setPoruka("Uspešna prijava");
      setStranica("kreiranje");
    } else {
      setPoruka("Pogrešan email ili lozinka");
    }
  }

  function odjava() {
    setPrijavljen(false);
    setPoruka("");
    setStranica("popunjavanje");
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Sistem za ankete</h1>

      {!prijavljen && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3">Prijava korisnika</h2>

              <form onSubmit={prijava}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lozinka</label>
                  <input
                    className="form-control"
                    type="password"
                    value={lozinka}
                    onChange={(e) => setLozinka(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  Prijavi se
                </button>
              </form>

              {poruka && <p className="mt-3 mb-0">{poruka}</p>}
            </div>
          </div>

          <PublicSurvey />
        </>
      )}

      {prijavljen && (
        <>
          <div className="mb-4 d-flex gap-2 flex-wrap">
            <button
              className="btn btn-outline-primary"
              onClick={() => setStranica("kreiranje")}
            >
              Kreiranje ankete
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => setStranica("pitanja")}
            >
              Dodavanje pitanja
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => setStranica("ankete")}
            >
              Moje ankete
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => setStranica("rezultati")}
            >
              Pregled rezultata
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={odjava}
            >
              Odjavi se
            </button>
          </div>

          {stranica === "kreiranje" && <CreateSurvey />}
          {stranica === "pitanja" && <AddQuestion />}
          {stranica === "ankete" && <MySurveys />}
          {stranica === "rezultati" && <Results />}
        </>
      )}
    </div>
  );
}

export default App;