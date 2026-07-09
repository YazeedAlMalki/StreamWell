# StreamWell

A multistream viewer. Paste links from YouTube, Twitch, Kick, Rumble or any HLS/m3u8 source and watch them side by side in one grid — up to 12 streams.

## Features

- **Auto platform detection** — paste any supported URL, the player type is detected automatically
- **Channel-pinned live tiles** — add a YouTube channel (not just a video) and the tile follows whatever that channel streams; when a stream ends it shows OFF AIR and auto-resumes when the next one starts
- **News directory** — 30 curated news channels across 13 countries, one tap to add
- **Duplicate chooser** — adding a stream already on the wall prompts keep / replace / add anyway
- **Layouts** — auto grid (1×1 up to 4×3), fixed columns, or Focus mode (one big + rest small)
- **Shareable walls** — the Share button copies a link that rebuilds your exact grid
- **HLS playback** via hls.js, mobile-responsive

## Hosting

This is a single static file — no build step. It must be served from a real domain
(YouTube live embeds and Twitch's `parent` check refuse `file://`). GitHub Pages,
Netlify, and Cloudflare Pages all work.

## Notes

- Twitch/Kick tiles start muted (autoplay policy); unmute inside each player
- Rumble requires the embed link (rumble.com/embed/…) from the video's Share menu
- YouTube `@handle` links can't be channel-pinned — use the `youtube.com/channel/UC…` link
