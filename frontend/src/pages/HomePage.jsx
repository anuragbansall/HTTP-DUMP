import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import RequestPreviewCard from "../components/RequestPreviewCard";

function HomePage() {
  const navigate = useNavigate();

  const handleCreateDump = () => {
    const dumpId = uuidv4();
    navigate(`/inspect/${dumpId}`);
  };

  return (
    <main className="min-h-screen overflow-x-hidden py-8 sm:py-10">
      <section className="relative mx-auto w-[min(1200px,calc(100%-2rem))] overflow-hidden rounded-4xl border border-white/80 bg-[linear-gradient(140deg,rgba(255,255,255,0.94)_0%,rgba(246,250,255,0.92)_100%)] p-5 shadow-[0_24px_46px_rgba(6,20,54,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(16,32,61,0.05)_1px,transparent_1px)] before:bg-size-[38px_100%] before:content-[''] sm:p-8 lg:p-10">
        <div className="relative grid items-end gap-7 lg:grid-cols-[1.05fr_0.82fr] lg:gap-9">
          <div>
            <p className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-blue-700">
              HTTP request observability
            </p>

            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,5vw,4.1rem)] font-medium leading-[1.05] tracking-[-0.028em] text-slate-950 text-balance">
              Build a throwaway endpoint.
              <span className="block text-[#0a66db]">
                See every payload instantly.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-slate-600">
              A clean request inbox for webhooks, callbacks, and local API
              tests. Generate a unique URL in one click and inspect headers,
              body, and method without any setup noise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                className="primary-btn"
                onClick={handleCreateDump}
                type="button"
              >
                Create New Dump
              </button>
              <div className="rounded-lg border border-slate-900/10 bg-white/70 px-4 py-3 font-mono text-[0.74rem] text-slate-700 backdrop-blur-sm">
                Unique URL generated per session
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="min-w-[9.3rem] rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 backdrop-blur-sm max-sm:w-full">
                <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Setup time
                </p>
                <p className="mt-1.5 m-0 text-[0.9rem] font-bold text-slate-900">
                  &lt; 5 sec
                </p>
              </div>
              <div className="min-w-[9.3rem] rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 backdrop-blur-sm max-sm:w-full">
                <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Live updates
                </p>
                <p className="mt-1.5 m-0 text-[0.9rem] font-bold text-slate-900">
                  Socket stream
                </p>
              </div>
              <div className="min-w-[9.3rem] rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 backdrop-blur-sm max-sm:w-full">
                <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Best for
                </p>
                <p className="mt-1.5 m-0 text-[0.9rem] font-bold text-slate-900">
                  Webhook debug
                </p>
              </div>
            </div>
          </div>

          <RequestPreviewCard
            label="incoming-request.log"
            method="POST"
            requestPath="/dumps/stripe-payment-webhook"
            lines={[
              {
                text: "content-type: application/json",
                tone: "text-slate-500",
              },
              {
                text: "user-agent: Stripe/1.0 (+https://stripe.com)",
                tone: "text-slate-500",
              },
              { text: "x-request-id: req_8f2c91d4", tone: "text-slate-500" },
              { text: "{" },
              {
                text: '"event": "payment_intent.succeeded",',
                indent: true,
              },
              { text: '"method": "POST",', indent: true },
              { text: '"route": "/api/webhooks/stripe",', indent: true },
              { text: '"amount": 1399,', indent: true },
              { text: '"currency": "usd",', indent: true },
              { text: '"receivedAt": "2026-04-19T14:22:31Z"', indent: true },
              { text: "}" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
