export async function fetchExoplanets() {
  try {
    const response = await fetch('http://localhost:5000/api/exoplanets');
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return []; 
  }
}