import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function HomePage() {
  const navigate = useNavigate();

  const handleCreateDump = () => {
    const dumpId = uuidv4();
    navigate(`/inspect/${dumpId}`);
  };

  return (
    <main className="app-shell page-enter min-h-screen py-8 sm:py-10">
      <section className="home-hero-wrap rounded-[2rem] p-5 sm:p-8 lg:p-10">
        <div className="home-hero-grid">
          <div>
            <p className="home-kicker">HTTP request observability</p>

            <h1 className="home-title mt-4">
              Build a throwaway endpoint.
              <span className="block">See every payload instantly.</span>
            </h1>

            <p className="home-lead mt-5 max-w-xl">
              A clean request inbox for webhooks, callbacks, and local API
              tests. Generate a unique URL in one click and inspect headers,
              body, and method without any setup noise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                className="home-primary-btn focus-ring"
                onClick={handleCreateDump}
                type="button"
              >
                Create New Dump
              </button>
              <div className="home-pill mono">
                Unique URL generated per session
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="home-metric">
                <p className="home-metric-label">Setup time</p>
                <p className="home-metric-value">&lt; 5 sec</p>
              </div>
              <div className="home-metric">
                <p className="home-metric-label">Live updates</p>
                <p className="home-metric-value">Socket stream</p>
              </div>
              <div className="home-metric">
                <p className="home-metric-label">Best for</p>
                <p className="home-metric-value">Webhook debug</p>
              </div>
            </div>
          </div>

          <aside className="home-preview-card" aria-label="Request preview">
            <div className="home-preview-header">
              <span className="home-dot home-dot-red" />
              <span className="home-dot home-dot-amber" />
              <span className="home-dot home-dot-green" />
              <p className="mono text-xs text-slate-500">request-live.log</p>
            </div>

            <div className="home-preview-lines mono">
              <p>
                <span className="text-emerald-600">POST</span>{" "}
                /webhooks/order-created
              </p>
              <p className="text-slate-500">content-type: application/json</p>
              <p className="text-slate-500">x-source: stripe</p>
              <p className="text-slate-700">&#123;</p>
              <p className="pl-4 text-slate-700">
                "event": "payment.succeeded",
              </p>
              <p className="pl-4 text-slate-700">"amount": 1399,</p>
              <p className="pl-4 text-slate-700">"currency": "usd"</p>
              <p className="text-slate-700">&#125;</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
