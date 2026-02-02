# Weather UI — React + Vite + Tailwind

A clean, responsive weather application built as a **UI-focused engineering exercise**.  
The goal of this project is not only to fetch and display weather data, but to demonstrate **component design, state management, API integration, and code organization** in a modern React environment.

## Project Goals

- Build a polished, production-quality UI from a visual reference
- Fetch and normalize third-party API data
- Demonstrate clean React patterns (hooks, composition, separation of concerns)
- Keep the codebase readable, maintainable, and reviewer-friendly

## Features

- Search weather by ZIP code (WeatherAPI supports additional location formats)
- Current temperature with Fahrenheit / Celsius toggle
- City + region display derived from API response
- Condition-based weather icons
- 5-day forecast
- Fast local development with Vite
- Tailwind-styled UI with consistent spacing and typography

## Tech Stack

- **React 18**
- **Vite** (dev server & bundler)
- **Tailwind CSS** (styling)
- **WeatherAPI.com** (data source)
- **React Icons** (iconography)

## Project Structure

src/
├── components/
│ ├── WeatherCard.jsx # Main UI container
│ ├── SearchInput.jsx # Controlled ZIP input + submit
│ ├── UnitToggle.jsx # °F / °C toggle
│ └── ForecastRow.jsx # 5-day forecast display
├── hooks/
│ └── useWeather.js # API fetching + request state
├── utils/
│ ├── formatters.js # Formatting & normalization helpers
│ └── weatherIcons.js # Condition → icon mapping
├── App.jsx
├── main.jsx
└── index.css

## Getting Started

### Prerequisites

- Node.js **v18+**
- npm **v9+**

### Install

## using bash
npm install

## Custom Hook for Data Fetching (useWeather)

All API logic is isolated in a dedicated hook:

Keeps components focused on rendering

Centralizes loading, error, and abort handling

Makes the data layer easy to swap or extend

This mirrors patterns commonly used in production apps.

## No UI Component Library

Tailwind CSS is used directly instead of a component library:

Ensures full control over spacing, sizing, and visual fidelity

Avoids unnecessary abstraction for a small, focused UI

Makes styling intent explicit and reviewable

## Derived State Instead of Re-Fetching

Unit toggling (°F / °C) does not trigger additional API calls:

WeatherAPI provides both units in the response

UI simply switches which values are rendered

This improves performance and reduces network usage.

## Small, Purpose-Built Components

Components are intentionally narrow in responsibility:

SearchInput → user input & submit

UnitToggle → display-only state toggle

ForecastRow → forecast visualization

WeatherCard → composition + layout

This structure favors readability and testability over clever abstractions.

## Defensive Rendering

The UI is written to handle:

Loading states

Partial or missing API data

Aborted requests

This avoids runtime crashes and reflects real-world API behavior.


## License

This project is intended as a demonstration and learning exercise.
Feel free to fork or adapt it for your own use.

## Credits

Weather data provided by WeatherAPI.com

Icons provided by React Icons

