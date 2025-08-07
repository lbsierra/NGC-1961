<template>
    <section>
        <h3>Current Position:</h3>
        <p v-if="position">
            Latitude: {{ position.latitude }}, Longitude: {{ position.longitude }}
        </p>
        <p v-if="location">
            Over: <strong>{{ location }}</strong>
        </p>
        <p v-else>
            Loading ISS data...
        </p>         
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const position = ref(null);
    const location = ref('');

      async function getLocation() {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=5&addressdetails=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.address?.country || 'Unknown Location';
        } catch (err) {
            console.error('Reverse geocoding failed:', err);
            return 'Unknown Location';
        }
    }

    onMounted(async () => {
        const res = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await res.json();
        position.value = data.iss_position;
        const lat = parseFloat(position.value.latitude);
        const lon = parseFloat(position.value.longitude);

        location.value = await getLocation(lat, lon);
    });

  
</script>