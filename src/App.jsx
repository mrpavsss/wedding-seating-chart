import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRR036nBOzKaJZtfkmqyvoePxTMaadKtcRwknOU-q92sLwOpHni0pn1jE8N9xMPaNZ2khnLDplipssO/pub?gid=0&single=true&output=csv";

function App() {

  const [guests, setGuests] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedGuest, setSelectedGuest] =
    useState(null);

  useEffect(() => {

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        setGuests(results.data);
      },
    });

  }, []);

  const matches = guests.filter((guest) =>
    guest["Guest Name"]
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Mr. & Mrs. Rizk</h1>

      <h2>Find Your Table</h2>

      {!selectedGuest && (
        <>
          <input
            type="text"
            placeholder="Start typing your name..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          />

          <div className="results">

            {query.length > 1 &&
              matches
                .slice(0, 10)
                .map((guest) => (

                <div
                  key={guest["Guest Name"]}
                  className="guest-card"
                  onClick={() =>
                    setSelectedGuest(guest)
                  }
                >
                  {guest["Guest Name"]}
                </div>
            ))}

          </div>
        </>
      )}

      {selectedGuest && (

        <div className="table-card">

          <p>Welcome</p>

          <h2>
            {selectedGuest["Guest Name"]}
          </h2>

          <p>Your Table</p>

          <div className="table-number">

            {selectedGuest["Table"]}

          </div>

          <button
            onClick={() => {
              setSelectedGuest(null);
              setQuery("");
            }}
          >
            Search Again
          </button>

        </div>
      )}

    </div>
  );
}

export default App;