import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRR036nBOzKaJZtfkmqyvoePxTMaadKtcRwknOU-q92sLwOpHni0pn1jE8N9xMPaNZ2khnLDplipssO/pub?gid=0&single=true&output=csv";

function App() {
  const [guests, setGuests] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setGuests(results.data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });
  }, []);

  const matches = guests.filter((guest) =>
    guest["Guest Name"]
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="page">

      {/* Decorative border */}
      <div className="gold-border">
        <div className="inner-border">

          <main className="container">

            {/* Logo / Crest */}
            <div className="logo-container">
              <img
                src={`${import.meta.env.BASE_URL}wedding-logo.jfif`}
                alt="Mariam and Pavly"
                className="wedding-logo"
              />
            </div>

            {/* Names */}
            <h1 className="couple-names">
              MARIAM <span>&</span> PAVLY
            </h1>

            {/* Small gold divider */}
            <div className="small-divider">
              <span></span>
              <div className="diamond">◆</div>
              <span></span>
            </div>

            {/* Date */}
            <div className="wedding-date">
              SEPTEMBER 7, 2026
            </div>

            {/* Main heading */}
            <h2 className="find-seat">
              PLEASE FIND YOUR SEAT
            </h2>

            {/* Script text */}
            <div className="script-text">
              our favorite people
            </div>

            {/* Decorative divider */}
            <div className="ornamental-divider">
              <span></span>
              <div className="heart">♥</div>
              <span></span>
            </div>

            {!selectedGuest && (
              <section className="search-section">

                <p className="search-instruction">
                  Please enter your name below
                </p>

                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Start typing your name..."
                    value={query}
                    onChange={(e) =>
                      setQuery(e.target.value)
                    }
                    className="search-input"
                  />
                </div>

                {loading && (
                  <p className="loading">
                    Loading seating information...
                  </p>
                )}

                {query.length > 1 && !loading && (
                  <div className="results">

                    {matches.length === 0 ? (
                      <div className="no-results">
                        No guest found. Please check your spelling.
                      </div>
                    ) : (
                      matches
                        .slice(0, 10)
                        .map((guest, index) => (
                          <button
                            key={`${guest["Guest Name"]}-${index}`}
                            className="guest-card"
                            onClick={() =>
                              setSelectedGuest(guest)
                            }
                          >
                            <span>
                              {guest["Guest Name"]}
                            </span>

                            <span className="arrow">
                              →
                            </span>
                          </button>
                        ))
                    )}

                  </div>
                )}

              </section>
            )}

            {/* Selected guest */}
            {selectedGuest && (
              <section className="table-card">

                <p className="welcome-text">
                  WELCOME
                </p>

                <h2 className="guest-name">
                  {selectedGuest["Guest Name"]}
                </h2>

                <div className="gold-divider"></div>

                <p className="your-table">
                  YOUR TABLE
                </p>

                <div className="table-number">
                  {selectedGuest["Table"]}
                </div>

                <p className="enjoy-message">
                  We are so happy to celebrate
                  <br />
                  with you!
                </p>

                <button
                  className="search-again"
                  onClick={() => {
                    setSelectedGuest(null);
                    setQuery("");
                  }}
                >
                  SEARCH AGAIN
                </button>

              </section>
            )}

            {/* Bottom decorative element */}
            <div className="bottom-decoration">
              <span>❧</span>
              <span>✦</span>
              <span>❧</span>
            </div>

          </main>

        </div>
      </div>

    </div>
  );
}

export default App;