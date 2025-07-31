export const fetchDONKIEvents = async (eventType, startDate, endDate, key) => {
    const url = `https://api.nasa.gov/DONKI/${eventType}?apiKey=${key}&startDate=${startDate}&endDate=${endDate}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json();
        console.log("DONKI API response:", data);
        return data;    
    } catch (error) {
        console.error("Error fetching DONKI events:", error);
        return [];
    }
}