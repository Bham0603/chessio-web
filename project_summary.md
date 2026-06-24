# Chess Assistant

## 🎯 What it is
**Chessio** is a powerful Manifest V3 Chrome extension that provides real-time Stockfish analysis directly overlaid on your live chess games on **Chess.com** and **Lichess**. 

It operates entirely in your browser using a bundled WebAssembly (WASM) version of Stockfish 18 Lite. By directly reading the piece positions from the webpage's Document Object Model (DOM), it delivers lightning-fast, 100% offline analysis in an isolated, draggable panel—without the need for external APIs, servers, or screenshots.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Live Board Scraping** | Automatically reads piece positions directly from the webpage and reconstructs the game state (FEN) in real-time. |
| **100% Offline Local Engine** | Runs a bundled Stockfish 18 Lite engine via WebWorker and WebAssembly. No network latency, no servers, full privacy. |
| **Adjustable Engine Strength** | Dial the engine's strength from a beginner level (~250 Elo) up to maximum power (3600 Elo) so the suggested moves match any rating. |
| **Top 3 Moves Visualized** | Displays the top three best continuations (`MultiPV=3`) as color-coded SVG arrows directly on the board: 🟢 Best, 🟡 2nd Best, 🟠 3rd Best. |
| **Evaluation Bar** | Features an animated vertical bar showing the real-time advantage between White and Black. |
| **Live Mini-Board** | A fully synchronized miniature board overlay mirroring the real game with automatic orientation detection. |
| **"My Moves Only" Filter** | Only analyzes the position when it is *your* turn to move, keeping the opponent's best moves hidden. |
| **Manual Flip** | Easily override auto-detected board orientation with a quick toggle if the extension guesses wrong. |
| **Draggable Shadow DOM UI** | The fully isolated panel can be dragged anywhere on the screen, and its styles won't conflict with the host site. |
| **Keyboard Shortcuts** | Quickly toggle the entire panel on and off using `Ctrl + Shift + A`. |
| **Adjustable Search Depth** | Control the engine's search depth (from 10 to 24) to balance analysis speed and calculation depth. |

---

## 🏗️ How it Works (Architecture)
The extension seamlessly integrates into your browser using four main components:
1. **Content Script (DOM Scraper):** Runs directly on the chess page. It scrapes the board to build a FEN string, listens for board changes using MutationObservers, and renders the Shadow DOM UI.
2. **Background Service Worker:** Acts as a message router, reliably transmitting data between the webpage and the offscreen engine.
3. **Offscreen Document:** Hosts the WebWorker and WebAssembly Stockfish engine. It processes the FEN, communicates via UCI protocol, and calculates the best PV lines and scores.
4. **UI Updates:** The results are instantly routed back to the panel to update the evaluation bar, move text, and colored arrows.

---

## ⚖️ Disclaimer & Usage
> **For educational, training, and research purposes only.**
Using a chess engine to receive move suggestions during **rated online games** violates the Terms of Service of Chess.com, Lichess, and other platforms, and may result in account bans. This tool is designed for use against bots, analyzing unrated games, study sessions, and personal research.
