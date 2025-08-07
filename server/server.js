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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});