import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import {
  MapContainer,
  TileLayer,
  Circle
} from "react-leaflet";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  Activity,
  Users,
  Building2,
  Eye,
  MapPinned,
  ArrowUpRight,
  Menu,
  Info
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import "./styles.css";


/* =========================================================
   CORE STUDY RESULTS
   ========================================================= */

const DATA = {
  residents: 239,
  enterprises: 155,
  tourists: "≈320",

  tourismLivelihood: "≈49%",
  tourismDevelopment: "63.8%",
  worseningWater: "43.7%",
  pipedWater: "7.26 h",

  enterpriseShortage: "42.6%",
  enterpriseImpact: "43.1%",
  shortageOR: "6.73",

  accommodationFoodImpact: "65.5%",
  retailOtherImpact: "22.7%",

  visitorExperience: "3.78",
  cleanliness: "3.46",
  cleanlinessRho: ".485"
};


/* =========================================================
   NAVIGATION
   ========================================================= */

const NAVIGATION = [
  ["overview", "Overview", Activity],
  ["residents", "Residents", Users],
  ["enterprises", "Enterprises", Building2],
  ["visitors", "Visitors", Eye],
  ["spatial", "Spatial evidence", MapPinned],
  ["policy", "Decision support", ArrowUpRight]
];


/* =========================================================
   SPATIAL CELL RESULTS
   ========================================================= */

const SPATIAL_CELLS = [
  ["A", 0, 7],
  ["B", 14.3, 7],
  ["C", 50, 4],
  ["D", 50, 6],
  ["E", 53.8, 13],
  ["F", 80, 5],
  ["G", 100, 3]
];


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function Metric({ label, value, sub }) {
  return (
    <div className="metric">
      <small>{label}</small>
      <b>{value}</b>

      {sub && (
        <span>{sub}</span>
      )}
    </div>
  );
}


function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}


function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="head">

      <small>{eyebrow}</small>

      <h1>{title}</h1>

      {description && (
        <p>{description}</p>
      )}

    </div>
  );
}


function BarChartView({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>

      <BarChart
        data={data}
        margin={{
          top: 8,
          right: 10,
          left: -20,
          bottom: 10
        }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 10 }}
        />

        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 9 }}
          tickFormatter={(value) => `${value}%`}
        />

        <Tooltip
          formatter={(value) => `${value}%`}
        />

        <Bar
          dataKey="value"
          fill="#285b4f"
          radius={[5, 5, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>
  );
}


function Rows({ rows }) {
  return (
    <div className="rows">

      {rows.map((row, index) => (

        <div key={index}>

          <span>{row[0]}</span>

          <b>{row[1]}</b>

        </div>

      ))}

    </div>
  );
}


/* =========================================================
   OVERVIEW
   ========================================================= */

function Overview() {

  return (
    <>

      <div className="hero">

        <div>

          <small>
            FIELD BASELINE · 22 JUNE–2 JULY 2026
          </small>

          <h1>
            Does tourism pressure affect everyone equally?
          </h1>

          <p>
            Nainital's tourism system connects livelihoods,
            household resources, enterprise operations and
            visitor experience — but these dimensions do not
            move together.
          </p>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("go", {
                  detail: "spatial"
                })
              )
            }
          >
            Explore spatial evidence →
          </button>

        </div>


        <div className="heroStats">

          <div>
            <b>43.1%</b>
            <span>
              enterprise impact within 2 km
            </span>
          </div>

          <div>
            <b>OR 6.73</b>
            <span>
              shortage → operational disruption
            </span>
          </div>

        </div>

      </div>


      <div className="metrics">

        <Metric
          label="Residents"
          value={DATA.residents}
          sub="available observations"
        />

        <Metric
          label="Enterprises"
          value={DATA.enterprises}
          sub="after record removal"
        />

        <Metric
          label="Tourists"
          value={DATA.tourists}
          sub="surveyed"
        />

        <Metric
          label="Tourism livelihood"
          value={DATA.tourismLivelihood}
          sub="resident sample"
        />

      </div>


      <div className="grid">

        <Card title="Four findings">

          <div className="finding">
            <b>Economic embeddedness</b>
            <span>
              Tourism is economically important and
              positively valued by surveyed residents.
            </span>
          </div>

          <div className="finding">
            <b>Household vulnerability</b>
            <span>
              Tourism dependence does not identify
              households reporting greater water stress.
            </span>
          </div>

          <div className="finding">
            <b>Enterprise sensitivity</b>
            <span>
              Peak-season water shortage is strongly
              associated with operational disruption.
            </span>
          </div>

          <div className="finding">
            <b>Spatial exposure</b>
            <span>
              Lake proximity alone does not distinguish
              impacted enterprises.
            </span>
          </div>

        </Card>


        <Card title="Monitoring logic">

          <div className="logic">

            <span>Economic position</span>
            <i>→</i>

            <span>Resource conditions</span>
            <i>→</i>

            <span>Exposure & sensitivity</span>
            <i>→</i>

            <span>Tourism outcomes</span>

          </div>


          <div className="callout">

            <Info size={15} />

            <p>
              Baseline decision-support prototype.
              Not a validated predictive or early-warning
              system.
            </p>

          </div>

        </Card>

      </div>

    </>
  );
}


/* =========================================================
   RESIDENTS
   ========================================================= */

function Residents() {

  return (
    <>

      <PageHeader
        eyebrow="01 · RESIDENTS"
        title="Tourism is economically embedded, but dependence does not identify water stress."
        description="Resident responses separate the economic importance of tourism from household resource conditions."
      />


      <div className="metrics">

        <Metric
          label="Tourism as primary livelihood"
          value={DATA.tourismLivelihood}
        />

        <Metric
          label="Tourism contributes to development"
          value={DATA.tourismDevelopment}
          sub="143/224 valid"
        />

        <Metric
          label="Worsening water availability"
          value={DATA.worseningWater}
        />

        <Metric
          label="Mean piped-water availability"
          value={DATA.pipedWater}
          sub="per day"
        />

      </div>


      <div className="grid">

        <Card title="Perceived contribution to local development">

          <BarChartView
            data={[
              {
                name: "Dependent",
                value: 69.4
              },
              {
                name: "Non-dependent",
                value: 58
              }
            ]}
          />

          <p className="note">
            Adjusted OR = 2.10 ·
            95% CI 1.12–3.95 ·
            p = .021
          </p>

        </Card>


        <Card title="Household resource indicators">

          <Rows
            rows={[
              [
                "Rainwater harvesting",
                "14.2% (33/232)"
              ],
              [
                "Water reuse",
                "29.2% (69/236)"
              ],
              [
                "Infrastructure inadequacy → worsening availability",
                "OR 2.38 · p=.005"
              ],
              [
                "Seasonal sewage overflow → worsening availability",
                "OR 3.04 · p<.001"
              ],
              [
                "Tourism dependence → worsening availability",
                "OR .935 · p=.811"
              ]
            ]}
          />

        </Card>

      </div>

    </>
  );
}


/* =========================================================
   ENTERPRISES
   ========================================================= */

function Enterprises() {

  return (
    <>

      <PageHeader
        eyebrow="02 · ENTERPRISES"
        title="Direct water exposure is more closely tied to disruption than location."
        description="Enterprise responses show the clearest relationship between a resource constraint and an operational outcome."
      />


      <div className="metrics">

        <Metric
          label="Peak-season shortage"
          value={DATA.enterpriseShortage}
          sub="23/54 valid"
        />

        <Metric
          label="Operational impact"
          value={DATA.enterpriseImpact}
          sub="22/51 within 2 km"
        />

        <Metric
          label="Shortage → disruption"
          value={`OR ${DATA.shortageOR}`}
          sub="95% CI 1.72–26.24 · p=.006"
        />

        <Metric
          label="Accommodation/Food impact"
          value={DATA.accommodationFoodImpact}
          sub="vs 22.7% Retail/Other"
        />

      </div>


      <div className="grid">

        <Card title="Operational impact by shortage">

          <BarChartView
            data={[
              {
                name: "Shortage",
                value: 76.2
              },
              {
                name: "No shortage",
                value: 26.7
              }
            ]}
          />

        </Card>


        <Card title="Operational sensitivity by enterprise type">

          <BarChartView
            data={[
              {
                name: "Accommodation/Food",
                value: 65.5
              },
              {
                name: "Retail/Other",
                value: 22.7
              }
            ]}
          />

          <p className="note">
            Retail/Other relative to Accommodation/Food:
            adjusted OR = .21 · p=.028
          </p>

        </Card>

      </div>


      <Card title="Observed adaptation responses">

        <div className="tags">

          {[
            "Water storage",
            "Alternative supply",
            "Consumption reduction",
            "Operating changes",
            "Booking/service restrictions",
            "Rainwater harvesting"
          ].map((item) => (

            <span key={item}>
              {item}
            </span>

          ))}

        </div>

        <p className="note">
          Qualitative typology from ≈18 substantive
          responses; not a prevalence estimate.
        </p>

      </Card>

    </>
  );
}


/* =========================================================
   VISITORS
   ========================================================= */

function Visitors() {

  return (
    <>

      <PageHeader
        eyebrow="03 · VISITORS"
        title="Destination conditions show up in the visitor experience."
        description="Visitor responses provide a downstream, demand-side perspective on destination quality."
      />


      <div className="metrics">

        <Metric
          label="Overall experience"
          value={`${DATA.visitorExperience}/5`}
        />

        <Metric
          label="Perceived cleanliness"
          value={`${DATA.cleanliness}/5`}
        />

        <Metric
          label="Cleanliness ↔ experience"
          value={`ρ = ${DATA.cleanlinessRho}`}
          sub="p < .001"
        />

        <Metric
          label="Dustbin adequacy"
          value="OR 1.78"
          sub="p=.037"
        />

      </div>


      <Card title="Interpretation">

        <div className="big">
          ρ = .485
        </div>

        <p className="large">
          Cleanliness has the strongest measured
          association with overall visitor experience.
          This is a demand-side outcome, not a causal
          estimate.
        </p>

      </Card>

    </>
  );
}


/* =========================================================
   SPATIAL
   ========================================================= */

function Spatial() {

  return (
    <>

      <PageHeader
        eyebrow="04 · SPATIAL EVIDENCE"
        title="Lake proximity does not distinguish operational impact."
        description="The spatial analysis tests whether distance to the Nainital Lake boundary acts as a useful stand-alone proxy for enterprise vulnerability."
      />


      <div className="metrics">

        <Metric
          label="Primary spatial sample"
          value="51"
          sub="≤2 km from lake boundary"
        />

        <Metric
          label="Impacted"
          value="22 · 43.1%"
        />

        <Metric
          label="Impacted median distance"
          value="187.98 m"
        />

        <Metric
          label="Mann–Whitney"
          value="U = 391"
          sub="p = .174"
        />

      </div>


      <Card title="Lake context and analytical zones">

        <div className="map">

          <MapContainer
            center={[29.3915, 79.455]}
            zoom={13}
            scrollWheelZoom={true}
            style={{
              height: "520px"
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Circle
              center={[29.3915, 79.455]}
              radius={2000}
              pathOptions={{
                color: "#315d53",
                weight: 2,
                dashArray: "7 7",
                fillOpacity: 0.025
              }}
            />

            <Circle
              center={[29.3915, 79.455]}
              radius={650}
              pathOptions={{
                color: "#87958f",
                weight: 1,
                dashArray: "3 6",
                fillOpacity: 0
              }}
            />

            <Circle
              center={[29.3915, 79.455]}
              radius={90}
              pathOptions={{
                color: "#285b4f",
                weight: 2,
                fillColor: "#285b4f",
                fillOpacity: 0.75
              }}
            />

          </MapContainer>


          <div className="mapcaption">

            2 km boundary = primary analytical threshold ·
            650 m = visual reference only.

            The map deliberately does not fabricate enterprise
            coordinates; validated aggregate spatial results
            are shown below.

          </div>

        </div>


        <div className="legend">

          <span>
            <i className="dash"></i>
            2 km analytical boundary
          </span>

          <span>
            <i className="dash small"></i>
            650 m visual reference
          </span>

          <span>
            <i className="lake"></i>
            Lake reference
          </span>

        </div>

      </Card>


      <div className="grid">

        <Card title="Cell-level impact rates">

          <div className="cells">

            {SPATIAL_CELLS.map(
              ([cell, rate, n]) => (

                <div
                  className="cell"
                  key={cell}
                >

                  <b>{cell}</b>

                  <div>
                    <i
                      style={{
                        width: `${rate}%`
                      }}
                    />
                  </div>

                  <strong>
                    {rate}%
                  </strong>

                  <small>
                    n={n}
                  </small>

                </div>

              )
            )}

          </div>


          <p className="note">
            Only cells with ≥3 valid enterprise
            responses are reported. The 100% cell
            has n=3 and is not treated as a confirmed
            hotspot.
          </p>

        </Card>


        <Card title="Robustness check">

          <Rows
            rows={[
              [
                "Primary estimate",
                "22/51 · 43.1%"
              ],
              [
                "Unrestricted estimate",
                "25/57 · 43.9%"
              ],
              [
                "Unrestricted proximity test",
                "U=480 · p=.201"
              ]
            ]}
          />


          <div className="callout">

            <p>
              Including the six valid geolocated
              enterprises outside 2 km does not
              materially change the estimate.
            </p>

          </div>

        </Card>

      </div>

    </>
  );
}


/* =========================================================
   POLICY / DECISION SUPPORT
   ========================================================= */

function Policy() {

  const sections = [
    [
      "Exposure",
      "Peak-season shortage; household water conditions; infrastructure and seasonal sewage indicators."
    ],
    [
      "Sensitivity",
      "Operational disruption and enterprise type, with stronger sensitivity among Accommodation/Food businesses."
    ],
    [
      "Adaptive capacity",
      "Storage, alternative supply, consumption reduction and operating/service adjustments."
    ],
    [
      "Tourism outcomes",
      "Resident development perceptions and visitor experience, including cleanliness."
    ]
  ];

  return (
    <>

      <PageHeader
        eyebrow="05 · DECISION SUPPORT"
        title="From a field baseline to a monitoring framework."
        description="The dashboard separates dimensions that are often collapsed into a single measure of tourism pressure."
      />


      <div className="grid">

        {sections.map(
          ([title, description], index) => (

            <Card
              title={`${String(index + 1).padStart(2, "0")} · ${title}`}
              key={title}
            >

              <p className="large">
                {description}
              </p>

            </Card>

          )
        )}

      </div>


      <Card title="Suggested monitoring cycle">

        <div className="logic">

          <span>Collect</span>
          <i>→</i>

          <span>Compare</span>
          <i>→</i>

          <span>
            Identify sensitive groups
          </span>

          <i>→</i>

          <span>
            Target intervention
          </span>

          <i>→</i>

          <span>Repeat</span>

        </div>


        <p className="note">

          This is a baseline decision-support prototype,
          not a predictive or early-warning system.

        </p>

      </Card>

    </>
  );
}


/* =========================================================
   APP
   ========================================================= */

function App() {

  const [page, setPage] =
    useState("overview");

  const [menuOpen, setMenuOpen] =
    useState(false);


  useEffect(() => {

    const handler = (event) => {
      setPage(event.detail);
    };

    window.addEventListener(
      "go",
      handler
    );

    return () => {
      window.removeEventListener(
        "go",
        handler
      );
    };

  }, []);


  const pages = {
    overview: <Overview />,
    residents: <Residents />,
    enterprises: <Enterprises />,
    visitors: <Visitors />,
    spatial: <Spatial />,
    policy: <Policy />
  };


  return (

    <div className="app">

      <aside
        className={
          menuOpen
            ? "open"
            : ""
        }
      >

        <div className="brand">

          <div className="logo">
            N
          </div>

          <div>

            <b>Nainital</b>

            <small>
              Tourism & Resource Monitor
            </small>

          </div>

        </div>


        <nav>

          {NAVIGATION.map(
            ([id, label, Icon]) => (

              <button
                key={id}
                className={
                  page === id
                    ? "active"
                    : ""
                }
                onClick={() => {

                  setPage(id);
                  setMenuOpen(false);

                }}
              >

                <Icon size={16} />

                {label}

              </button>

            )
          )}

        </nav>


        <div className="side">

          <small>
            FIELD BASELINE
          </small>

          <b>
            22 Jun — 2 Jul 2026
          </b>

          <p>
            Stakeholder survey ·
            spatial analysis ·
            destination monitoring
          </p>

        </div>

      </aside>


      <button
        className="mobile"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        <Menu />
      </button>


      <div className="main">

        {pages[page]}


        <footer>

          <span>
            Nainital Sustainable Tourism
            Fieldwork · BSASS
          </span>

          <span>
            Prototype · cross-sectional
            baseline · not an early-warning
            system
          </span>

        </footer>

      </div>

    </div>

  );
}


createRoot(
  document.getElementById("root")
).render(
  <App />
);
