export async function fetchExoplanets(): Promise<any[]> {
  const query = `
  select pl_name, hostname, pl_rade, pl_orbper, sy_dist, discoverymethod
  from pscomppars
  where default_flag = 1
  order by pl_name
  `;

  const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(query)}&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}