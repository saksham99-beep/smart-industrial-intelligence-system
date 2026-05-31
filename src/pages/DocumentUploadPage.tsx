import { useState } from "react";

export default function DocumentUploadPage() {
  const [message, setMessage] = useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload-document",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessage(
        `${data.message} | Chunks Added: ${data.chunks_added}`
      );
    } catch (error) {
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-8 shadow-lg shadow-cyan-500/10">
      <h2 className="text-2xl font-bold text-white">
        Industrial Document Upload
      </h2>

      <p className="mt-2 text-slate-400">
        Upload SOPs, maintenance manuals, safety
        procedures, and industrial PDFs for AI ingestion.
      </p>

      <div className="mt-6">
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="rounded-xl border border-cyan-400/10 bg-black/30 p-3 text-white"
        />
      </div>

      {message && (
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
          {message}
        </div>
      )}
    </div>
  );
}