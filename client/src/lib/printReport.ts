type ReportMetric = {
  label: string;
  value: string;
};

type ReportColumn = {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
};

export type PrintReportPayload = {
  title: string;
  subtitle?: string;
  generatedAt?: Date;
  metrics?: ReportMetric[];
  columns: ReportColumn[];
  rows: Array<Record<string, string | number | null | undefined>>;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function openPrintableReport(payload: PrintReportPayload) {
  if (typeof window === "undefined") return;

  const generatedAt = payload.generatedAt ?? new Date();
  const subtitle = payload.subtitle ? escapeHtml(payload.subtitle) : "";

  const metricsHtml =
    payload.metrics && payload.metrics.length
      ? `
        <div class="metrics">
          ${payload.metrics
            .map(
              (m) => `
              <div class="metric">
                <div class="metricLabel">${escapeHtml(m.label)}</div>
                <div class="metricValue">${escapeHtml(m.value)}</div>
              </div>
            `
            )
            .join("")}
        </div>
      `
      : "";

  const thead = `
    <tr>
      ${payload.columns
        .map((c) => `<th class="${c.align ?? "left"}">${escapeHtml(c.label)}</th>`)
        .join("")}
    </tr>
  `;

  const tbody = payload.rows
    .map((row) => {
      const tds = payload.columns
        .map((c) => {
          const raw = row[c.key];
          const val = raw === null || raw === undefined ? "" : String(raw);
          return `<td class="${c.align ?? "left"}">${escapeHtml(val)}</td>`;
        })
        .join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");

  const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(payload.title)}</title>
    <style>
      :root { color-scheme: light; }
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; color: #111827; }
      .top { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
      h1 { font-size: 18px; margin: 0; }
      .sub { margin-top: 6px; font-size: 12px; color: #6b7280; }
      .meta { font-size: 12px; color: #6b7280; text-align: right; white-space: nowrap; }
      .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 16px 0 18px; }
      .metric { border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; }
      .metricLabel { font-size: 11px; color: #6b7280; }
      .metricValue { margin-top: 6px; font-size: 14px; font-weight: 700; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border-bottom: 1px solid #e5e7eb; padding: 10px 8px; font-size: 12px; }
      th { text-align: left; font-weight: 700; color: #374151; background: #f9fafb; }
      td.right, th.right { text-align: right; }
      td.center, th.center { text-align: center; }
      .footer { margin-top: 16px; font-size: 11px; color: #9ca3af; }
      @media print {
        body { padding: 0; }
        .metric { break-inside: avoid; }
        table { page-break-inside: auto; }
        tr { page-break-inside: avoid; page-break-after: auto; }
      }
    </style>
  </head>
  <body>
    <div class="top">
      <div>
        <h1>${escapeHtml(payload.title)}</h1>
        ${subtitle ? `<div class="sub">${subtitle}</div>` : ""}
      </div>
      <div class="meta">
        Generated: ${escapeHtml(generatedAt.toLocaleString())}
      </div>
    </div>

    ${metricsHtml}

    <table>
      <thead>${thead}</thead>
      <tbody>${tbody}</tbody>
    </table>

    <div class="footer">
      Tip: in the print dialog, choose “Save as PDF”.
    </div>
  </body>
</html>
  `.trim();

  // Use Blob URL to avoid popup blockers - more reliable than window.open("")
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank', 'noopener,noreferrer');
  
  if (!w) {
    // If popup still blocked, fallback to opening in current window
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
      newWindow.addEventListener('load', () => {
        setTimeout(() => newWindow.print(), 300);
      }, { once: true });
    } else {
      alert("Unable to open print dialog. Please check your browser's popup settings.");
    }
    URL.revokeObjectURL(url);
    return;
  }

  // Clean up blob URL after a delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  // Wait for the new window to load before triggering print
  w.addEventListener('load', () => {
    setTimeout(() => {
      w.focus();
      w.print();
    }, 300);
  }, { once: true });
}


