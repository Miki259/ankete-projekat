import { useState } from "react";

function MySurveys() {
  const [ankete, setAnkete] = useState<any[]>([]);

  async function ucitajAnkete() {
    const odgovor = await fetch("http://localhost:3000/api/ankete");

    if (odgovor.ok) {
      const podaci = await odgovor.json();
      setAnkete(podaci);
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Moje ankete</h2>

        <button className="btn btn-primary mb-3" onClick={ucitajAnkete}>
          Učitaj ankete
        </button>

        {ankete.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Naziv</th>
                  <th>Kod</th>
                  <th>Link za kopiranje</th>
                  <th>Otvori</th>
                </tr>
              </thead>

              <tbody>
                {ankete.map((a) => {
                  const link = `http://localhost:3000/?kod=${a.kod}`;

                  return (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.naziv}</td>
                      <td>{a.kod}</td>
                      <td>{link}</td>
                      <td>
                        <a href={link} target="_blank">
                          Otvori anketu
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MySurveys;