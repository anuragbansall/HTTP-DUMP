import React from "react";

function RequestPreviewCard({
  label,
  method,
  requestPath,
  lines,
  className = "",
}) {
  return (
    <aside
      className={`overflow-hidden rounded-[1.15rem] border border-slate-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(251,253,255,0.9))] shadow-[0_16px_34px_rgba(8,28,74,0.12)] ${className}`}
      aria-label="Request preview"
    >
      <div className="flex items-center gap-2 border-b border-slate-900/10 px-[0.9rem] py-3">
        <span className="inline-block h-[0.62rem] w-[0.62rem] rounded-full bg-[#ff6f61]" />
        <span className="inline-block h-[0.62rem] w-[0.62rem] rounded-full bg-[#ffc15a]" />
        <span className="inline-block h-[0.62rem] w-[0.62rem] rounded-full bg-[#2dd881]" />
        <p className="font-mono text-xs text-slate-500">{label}</p>
      </div>

      <div className="space-y-0 px-[1.05rem] py-4 font-mono text-[0.75rem] leading-[1.75]">
        <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-emerald-600">{method}</span> {requestPath}
        </p>
        {lines.map((line, index) => (
          <p
            key={`${index}-${line.text}`}
            className={`m-0 overflow-hidden text-ellipsis whitespace-nowrap ${
              line.tone || "text-slate-700"
            } ${line.indent ? "pl-4" : ""}`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </aside>
  );
}

export default RequestPreviewCard;
