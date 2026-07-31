import React, { useState } from "react";

/**
 * channel_mirrors.jsx
 * Mirror-switching UI for the multi-source streaming project.
 *
 * Reconstructed from project notes on 2026-07-12 — the original was a
 * Claude.ai artifact and was never saved to disk. Behaviour per the notes:
 * each channel exposes several "mirror" sources (e.g. the same channel on
 * YouTube and on its own website); mirrors are listed inline as Mirror 1,
 * Mirror 2, … and each carries a simple Switch / Active toggle. Exactly one
 * mirror is live per channel at a time.
 *
 * Self-contained: needs only React (no UI library, no CSS file). Default
 * export ships with sample channels; pass `initialChannels` to supply your
 * own, and `onSwitch(channelId, mirrorId)` to hook switching into real
 * playback.
 */

const DEFAULT_CHANNELS = [
  {
    id: "aje",
    name: "Al Jazeera English",
    activeMirrorId: "aje-yt",
    mirrors: [
      { id: "aje-yt", source: "YouTube", url: "https://www.youtube.com/@aljazeeraenglish/live" },
      { id: "aje-web", source: "aljazeera.com", url: "https://www.aljazeera.com/live/" },
      { id: "aje-rumble", source: "Rumble", url: "https://rumble.com/c/aljazeeraenglish" },
    ],
  },
  {
    id: "f24",
    name: "France 24 English",
    activeMirrorId: "f24-web",
    mirrors: [
      { id: "f24-yt", source: "YouTube", url: "https://www.youtube.com/@FRANCE24English/live" },
      { id: "f24-web", source: "france24.com", url: "https://www.france24.com/en/live" },
    ],
  },
  {
    id: "dw",
    name: "DW News",
    activeMirrorId: "dw-yt",
    mirrors: [
      { id: "dw-yt", source: "YouTube", url: "https://www.youtube.com/@dwnews/live" },
      { id: "dw-web", source: "dw.com", url: "https://www.dw.com/en/live-tv/channel-english" },
    ],
  },
  {
    id: "trt",
    name: "TRT World",
    activeMirrorId: "trt-yt",
    mirrors: [
      { id: "trt-yt", source: "YouTube", url: "https://www.youtube.com/@trtworld/live" },
      { id: "trt-web", source: "trtworld.com", url: "https://www.trtworld.com/live" },
    ],
  },
];

const CSS = `
.cm-root{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;max-width:720px;margin:0 auto;padding:24px;color:#111827;}
.cm-head{margin-bottom:20px;}
.cm-title{font-size:20px;font-weight:650;margin:0 0 4px;}
.cm-sub{font-size:13px;color:#6b7280;margin:0;}
.cm-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}
.cm-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;flex-wrap:wrap;}
.cm-name{font-weight:600;font-size:15px;}
.cm-mirrors{display:flex;gap:8px;flex-wrap:wrap;}
.cm-mirror{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-width:96px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;cursor:pointer;font:inherit;text-align:left;transition:border-color .15s ease,background .15s ease;}
.cm-mirror:hover{border-color:#d1d5db;background:#f3f4f6;}
.cm-mirror:focus-visible{outline:2px solid #2563eb;outline-offset:2px;}
.cm-mirror-n{font-size:13px;font-weight:600;color:#111827;}
.cm-mirror-src{font-size:11px;color:#6b7280;}
.cm-state{margin-top:4px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.03em;}
.cm-mirror.is-active{border-color:#16a34a;background:#f0fdf4;cursor:default;}
.cm-mirror.is-active .cm-mirror-n{color:#166534;}
.cm-mirror.is-active .cm-state{color:#16a34a;}
`;

export default function ChannelMirrors({ initialChannels = DEFAULT_CHANNELS, onSwitch }) {
  const [channels, setChannels] = useState(initialChannels);

  const setActiveMirror = (channelId, mirrorId) => {
    setChannels((prev) =>
      prev.map((c) =>
        c.id === channelId ? { ...c, activeMirrorId: mirrorId } : c
      )
    );
    if (typeof onSwitch === "function") onSwitch(channelId, mirrorId);
  };

  return (
    <div className="cm-root">
      <style>{CSS}</style>

      <div className="cm-head">
        <h2 className="cm-title">Channel Mirrors</h2>
        <p className="cm-sub">
          Some channels stream from more than one source. Pick which mirror is live.
        </p>
      </div>

      <ul className="cm-list">
        {channels.map((channel) => (
          <li key={channel.id} className="cm-row">
            <span className="cm-name">{channel.name}</span>

            <div
              className="cm-mirrors"
              role="group"
              aria-label={`Mirrors for ${channel.name}`}
            >
              {channel.mirrors.map((mirror, index) => {
                const isActive = mirror.id === channel.activeMirrorId;
                return (
                  <button
                    key={mirror.id}
                    type="button"
                    className={`cm-mirror${isActive ? " is-active" : ""}`}
                    onClick={() => !isActive && setActiveMirror(channel.id, mirror.id)}
                    aria-pressed={isActive}
                    title={mirror.url || mirror.source}
                  >
                    <span className="cm-mirror-n">Mirror {index + 1}</span>
                    <span className="cm-mirror-src">{mirror.source}</span>
                    <span className="cm-state">{isActive ? "Active" : "Switch"}</span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
