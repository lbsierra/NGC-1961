
# NGC-1961

NGC-1961 is a space-themed web app built using Astro and Vue. The project includes real time ISS tracking using a map and coordinates that update every five seconds, NASA imagery of Earth, Mars, and the Astronomy Picture of the Day, and filtered exoplanet data in a catalog. 

## Features

The project includes the following features from the Capstone requirements list:

1. **Analyze data stored in arrays and objects**  
   - The exoplanet catalog processes an array of planet objects, filters them by host star, and displays the results.

2. **Create a function that accepts two or more input parameters and returns a calculated value**  
   - The `getTopHostStars(planets, limit)` function analyzes the data and returns the most common host stars.

3. **Visualize data in a user-friendly way**  
   - The ISS tracker uses Leaflet to render a real time map with coordinates, and the exoplanet panel displays cards for each planet.

4. **Make a fetch request to an API and use the response meaningfully**  
   - The app fetches data from several APIs, including NASA imagery, Open Notify for ISS tracking, Open Street Map for the ISS Map, Nominatim to get location data from the coordinates, and NASA's exoplanet API.

5. **Create a Node.js web server using Express.js**  
   - A `server.js` file handles API calls.

---

## Tech Stack

- **Astro** – Static site and routing
- **Vue + TypeScript** – Interactive components
- **Vite** – Dev server and bundling
- **Leaflet** – ISS map visualization
- **Node.js + Express** – Custom server
- **NASA, Open Notify, Open Street Map, Nominatim APIs** – Imagery and data sources

## Installation

Make sure you have Node.js v16+ installed.

# Clone the repository
`git clone https://github.com/lbsierra/ngc-1961.git`
`cd ngc-1961`

# Install dependencies
`npm install`

##  Running the Project

`cd server`
`node server.js`

In a new terminal:

`npm run dev`

The project runs in the browser at http://localhost:4321/

## Notes

- Vue components are located in `src/components/`
- Pages and layouts are in `src/pages/`
- Styles are  in `src/styles/`
-  A NASA API key can be generated at https://api.nasa.gov/ and added to a `.env` file in the root of the project:

`VITE_NASA_API_KEY=your_key_here`

Or the fallback demo key will be used (lower rate limit).