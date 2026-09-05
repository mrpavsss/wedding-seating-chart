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
  const [showLayout, setShowLayout] = useState(false);

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

  // Search guests using the "Guest Name" column
  const matches = guests.filter((guest) =>
    guest["Guest Name"]
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="page">

      {/* ==============================
          DECORATIVE PAGE BORDER
          ============================== */}

      <div className="gold-border">

        <div className="inner-border">

          <main className="container">

            {/* ==============================
                WEDDING LOGO
                ============================== */}

            <div className="logo-container">

              <img
                src={`${import.meta.env.BASE_URL}wedding-logo.jfif`}
                alt="Mariam and Pavly"
                className="wedding-logo"
              />

            </div>


            {/* ==============================
                COUPLE NAMES
                ============================== */}

            <h1 className="couple-names">
              MARIAM <span>&</span> PAVLY
            </h1>


            {/* ==============================
                SMALL DIVIDER
                ============================== */}

            <div className="small-divider">

              <span></span>

              <div className="diamond">
                ◆
              </div>

              <span></span>

            </div>


            {/* ==============================
                WEDDING DATE
                ============================== */}

            <div className="wedding-date">
              SEPTEMBER 7, 2026
            </div>


            {/* ==============================
                MAIN HEADING
                ============================== */}

            <h2 className="find-seat">
              PLEASE FIND YOUR SEAT
            </h2>


            {/* ==============================
                SCRIPT TEXT
                ============================== */}

            <div className="script-text">
              our favorite people
            </div>


            {/* ==============================
                ORNAMENTAL DIVIDER
                ============================== */}

            <div className="ornamental-divider">

              <span></span>

              <div className="heart">
                ♥
              </div>

              <span></span>

            </div>


            {/* ==============================
                SEARCH SCREEN
                ============================== */}

            {!selectedGuest && (

              <section className="search-section">

                <p className="search-instruction">
                  Please enter your name below
                </p>


                {/* Search box */}

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


                {/* Loading message */}

                {loading && (

                  <p className="loading">
                    Loading seating information...
                  </p>

                )}


                {/* Search results */}

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


            {/* ==============================
                SELECTED GUEST / TABLE
                ============================== */}

            {selectedGuest && (

              <section className="table-card">

                <p className="welcome-text">
                  WELCOME
                </p>


                <h2 className="guest-name"
                  style={{
                    fontSize:
                      selectedGuest["Guest Name"].length > 30
                        ? "22px"
                        : selectedGuest["Guest Name"].length > 24
                        ? "25px"
                        : selectedGuest["Guest Name"].length > 18
                        ? "29px"
                        : "36px",
                  }}
                >
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


                {/* ==============================
                    BALLROOM LAYOUT BUTTON
                    ============================== */}

                <button
                  className="layout-button"
                  onClick={() =>
                    setShowLayout(true)
                  }
                >
                  VIEW BALLROOM LAYOUT
                </button>


                {/* ==============================
                    SEARCH AGAIN BUTTON
                    ============================== */}

                <button
                  className="search-again"
                  onClick={() => {

                    setSelectedGuest(null);

                    setQuery("");

                    setShowLayout(false);

                  }}
                >
                  SEARCH AGAIN
                </button>

              </section>

            )}


            {/* ==============================
                BOTTOM DECORATION
                ============================== */}

            <div className="bottom-decoration">

              <span>
                ❧
              </span>

              <span>
                ✦
              </span>

              <span>
                ❧
              </span>

            </div>

          </main>

        </div>

      </div>


      {/* ==============================
          BALLROOM LAYOUT POPUP
          ============================== */}

      {showLayout && (

        <div
          className="layout-overlay"
          onClick={() =>
            setShowLayout(false)
          }
        >

          <div
            className="layout-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Close button */}

            <button
              className="close-layout"
              onClick={() =>
                setShowLayout(false)
              }
              aria-label="Close ballroom layout"
            >
              ×
            </button>


            {/* Popup title */}

            <h2 className="layout-title">
              BALLROOM LAYOUT
            </h2>


            {/* Divider */}

            <div className="layout-divider">

              <span></span>

              <div>
                ◆
              </div>

              <span></span>

            </div>


            {/* Ballroom image */}

            <img
              src={`${import.meta.env.BASE_URL}ballroom layout.png`}
              alt="Ballroom table layout"
              className="ballroom-image"
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default App;