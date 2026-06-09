import { useState } from "react";

function Results() {
  const [anketaId, setAnketaId] = useState("");
  const [rezultati, setRezultati] = useState<any[]>([]);

  async function ucitajRezultate() {
    const odgovor = await fetch(
      `http://localhost:3000/api/rezultati/${anketaId}`
    );

    if (odgovor.ok) {
      const podaci = await odgovor.json();
      setRezultati(podaci);
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Pregled rezultata</h2>

        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder="ID ankete"
            value={anketaId}
            onChange={(e) => setAnketaId(e.target.value)}
          />

          <button className="btn btn-primary" onClick={ucitajRezultate}>
            Učitaj rezultate
          </button>
        </div>

        {rezultati.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Pitanje</th>
                  <th>Odgovor</th>
                </tr>
              </thead>
              <tbody>
                {rezultati.map((r, index) => (
                  <tr key={index}>
                    <td>{r.tekst}</td>
                    <td>{r.vrednost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {anketaId && (
          <a
            className="btn btn-success"
            href={`http://localhost:3000/api/export/${anketaId}`}
            target="_blank"
          >
            Preuzmi CSV
          </a>
        )}
      </div>
    </div>
  );
}

export default Results;