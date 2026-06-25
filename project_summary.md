# Chessio Website Summary

**Chessio** is a landing page for an upcoming Chrome extension that serves as an AI chess companion. The extension provides real-time Stockfish 18 analysis overlaid directly onto live games on popular chess platforms like **Chess.com** and **Lichess**. 

## Key Features

- **Live Board Scraping**: Automatically reads piece positions from the webpage DOM and reconstructs the game state (FEN) without manual input.
- **100% Offline Engine**: Runs a bundled Stockfish 18 Lite engine via WebWorker and WebAssembly. It operates entirely offline, ensuring zero server latency and full privacy.
- **Adjustable Engine Strength**: Users can configure the engine's Elo from ~250 (beginner) up to 3600 (maximum power).
- **Configurable Search Depth**: Analysis depth can be adjusted between D10 to D24.
- **Visual Aids**: 
  - Top 3 move continuations shown as color-coded SVG arrows.
  - A vertical evaluation bar showing the real-time advantage.
  - A fully synchronized live mini-board overlay.
- **Smart Features**: "My Moves Only" filter, manual board flip, a draggable UI panel, and a quick keyboard shortcut (`Ctrl + Shift + A`) to toggle the interface.

## Architecture

The extension is built using Chrome Manifest V3 and consists of four main components:
1. **Content Script**: Scrapes the chess board, listens for changes using MutationObservers, and renders the UI within an isolated Shadow DOM.
2. **Background Service Worker**: Acts as the central message router to pass data between the webpage content script and the offscreen engine.
3. **Offscreen Engine**: Hosts the WebWorker and WebAssembly Stockfish engine, which processes the FEN via the UCI protocol to calculate best moves and evaluations.
4. **UI Updates**: Evaluation metrics, move text, and arrows are instantly routed back to update the isolated UI panel.

## Disclaimers
The extension is built for educational, training, and research purposes. The landing page includes a prominent disclaimer that using the engine during rated online games violates the Terms of Service of platforms like Chess.com and Lichess.
