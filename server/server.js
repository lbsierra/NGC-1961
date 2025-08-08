import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/exoplanets', async (req, res) => {
    const query = `
        select pl_name, hostname, pl_rade, pl_orbper, sy_dist, discoverymethod
        from ps
        where default_flag = 1
        order by pl_name
    `;

    const encodedQuery = encodeURIComponent(query);
    const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodedQuery}&format=json`;

    console.log('Fetching data from:', url);

    try {
        const response = await fetch(url);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const text = await response.text();
            console.error('Error response:', text);
            return res.status(response.status).json({ error: 'Upstream fetch failed'});
        }
        
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching exoplanet data:', err);
        res.status(500).json({ error: 'Failed to fetch exoplanet data' });
    }
});

app.get('/api/geocode', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Missing latitude or longitude' });
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=5&addressdetails=1&accept-language=en`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'NGC-1961/1.0 (lbsierra@outlook.com)'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Geocoding error response:', text);
            return res.status(response.status).json({ error: 'Geocoding fetch failed' });
        }

        const data = await response.json();
        res.json({ location: data.display_name });
    } catch (err) {
        console.error('Error fetching geocode data:', err);
        res.status(500).json({ error: 'Failed to fetch geocode data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});