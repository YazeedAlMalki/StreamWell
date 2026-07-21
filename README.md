# channel-mirrors

Reconstructed **`channel_mirrors.jsx`** — the mirror-switching UI for the multi-source
streaming project. Rebuilt from project notes on **2026-07-12**, because the original
was a Claude.ai artifact and was never saved to disk. Treat this as a fresh starting
point; if you find the original, swap it in.

## What it does

Some channels are available from more than one source (for example, the same channel
on YouTube and on its own website). Each channel lists its sources inline as
**Mirror 1, Mirror 2, …**, and each mirror has a simple **Switch / Active** toggle.
Exactly one mirror is live per channel at a time — clicking a mirror makes it the
active source.

## Usage

Only depends on React (no UI library, no separate CSS).

```jsx
import ChannelMirrors from "./channel_mirrors.jsx";

// With built-in sample channels:
<ChannelMirrors />

// With your own data + a switch handler:
<ChannelMirrors
  initialChannels={myChannels}
  onSwitch={(channelId, mirrorId) => playMirror(channelId, mirrorId)}
/>
```

### Channel shape

```js
{
  id: "aje",
  name: "Al Jazeera English",
  activeMirrorId: "aje-yt",          // which mirror is currently live
  mirrors: [
    { id: "aje-yt",  source: "YouTube",       url: "https://…" },
    { id: "aje-web", source: "aljazeera.com", url: "https://…" },
  ],
}
```

`onSwitch(channelId, mirrorId)` fires whenever the active mirror changes — wire it to
your player to actually swap the stream.
