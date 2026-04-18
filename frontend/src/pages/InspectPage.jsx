import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

function InspectPage() {
  const { dumpId } = useParams();
  const url = `${import.meta.env.VITE_BACKEND_URL}/dumps/${dumpId}`;
  const socketRef = useRef(null);

  const [dumpData, setDumpData] = useState([]);
  const [currentSelectedDump, setCurrentSelectedDump] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const getDumpData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/dumps/api/${dumpId}`,
      );

      const requests = response.data.dump ?? [];
      setDumpData(requests);
      setCurrentSelectedDump((previousSelection) => {
        if (!requests.length) {
          return null;
        }

        if (!previousSelection) {
          return requests[requests.length - 1];
        }

        const selectedById = requests.find(
          (request) => request._id && request._id === previousSelection._id,
        );

        return selectedById ?? requests[requests.length - 1];
      });
    } catch (error) {
      console.error("Error fetching dump data:", error);
    } finally {
      setLoading(false);
    }
  }, [dumpId]);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BACKEND_URL}`);
    socketRef.current.on("new_dump_created", () => {
      getDumpData();
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [getDumpData]);

  useEffect(() => {
    getDumpData();
  }, [dumpId]);

  const methodTone = (method = "GET") => {
    const value = method.toUpperCase();
    if (value === "GET") {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }

    if (value === "POST") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }

    if (value === "PUT" || value === "PATCH") {
      return "bg-amber-100 text-amber-800 border-amber-200";
    }

    if (value === "DELETE") {
      return "bg-rose-100 text-rose-800 border-rose-200";
    }

    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const formatJson = useCallback((value) => {
    if (value === undefined || value === null || value === "") {
      return "No data";
    }

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }, []);

  const requestCountLabel = useMemo(() => {
    const count = dumpData.length;
    return `${count} request${count === 1 ? "" : "s"} captured`;
  }, [dumpData]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Could not copy URL:", error);
    }
  };

  if (loading) {
    return (
      <div className="app-shell min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl px-6 py-4">
          <p className="text-slate-600">Loading captured requests...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="app-shell page-enter min-h-screen">
      <header className="glass-card rounded-3xl px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Live Endpoint
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Request Inspector
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="outline-btn focus-ring rounded-xl px-4 py-2 text-sm font-medium text-slate-700"
              to="/"
            >
              Create Another
            </Link>
            <button
              className="focus-ring rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              onClick={handleCopyUrl}
              type="button"
            >
              {copied ? "Copied" : "Copy URL"}
            </button>
          </div>
        </div>

        <p className="mono mt-4 break-all rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-xs text-slate-700 sm:text-sm">
          {url}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 sm:text-sm">
          <span>{requestCountLabel}</span>
          <a
            href={url}
            className="font-medium text-blue-700 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open endpoint
          </a>
        </div>
      </header>

      {dumpData.length > 0 ? (
        <section className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="surface-card rounded-2xl p-3">
            <h2 className="px-2 py-2 text-sm font-semibold text-slate-700">
              Captured Requests
            </h2>
            <div className="max-h-[64vh] space-y-2 overflow-y-auto pr-1">
              {dumpData.map((item, index) => {
                const isSelected = currentSelectedDump === item;
                return (
                  <button
                    key={`${item._id || item.url || "req"}-${index}`}
                    className={`stagger-enter focus-ring w-full rounded-xl border px-3 py-3 text-left transition-all ${
                      isSelected
                        ? "border-blue-200 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                    }`}
                    onClick={() => setCurrentSelectedDump(item)}
                    style={{ animationDelay: `${index * 60}ms` }}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${methodTone(
                          item.method,
                        )}`}
                      >
                        {item.method || "GET"}
                      </span>
                      <span className="mono text-[11px] text-slate-400">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 truncate text-sm font-medium text-slate-800">
                      {item.url || "/"}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          {currentSelectedDump ? (
            <article className="surface-card min-w-0 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
                <span
                  className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${methodTone(
                    currentSelectedDump.method,
                  )}`}
                >
                  {currentSelectedDump.method || "GET"}
                </span>
                <h2 className="mono min-w-0 truncate text-sm text-slate-700 sm:text-base">
                  {currentSelectedDump.url || "/"}
                </h2>
              </div>

              <div className="mt-5 grid gap-4 overflow-x-auto">
                <section>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Headers
                  </h3>
                  <pre className="mono mt-2 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
                    {formatJson(currentSelectedDump.headers)}
                  </pre>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Request Body
                  </h3>
                  <pre className="mono mt-2 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
                    {formatJson(currentSelectedDump.body)}
                  </pre>
                </section>
              </div>
            </article>
          ) : (
            <div className="surface-card rounded-2xl p-8 text-center">
              <p className="text-slate-500">
                Select a request to inspect full details.
              </p>
            </div>
          )}
        </section>
      ) : (
        <section className="glass-card mt-6 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            No requests captured yet
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
            Send an HTTP request to your endpoint and this dashboard will update
            automatically.
          </p>
        </section>
      )}
    </main>
  );
}

export default InspectPage;
