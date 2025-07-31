<template>
    <section>
        <h3>Current Position:</h3>
        <p v-if="position">
            Latitude: {{ position.latitude }}, Longitude: {{ position.longitude }}
        </p>
        <p v-else>
            Loading ISS data...
        </p>         
    </section>
</template>

<script setup>
   /* console.log("Vite Inline Env Test:", import.meta.env.VITE_INLINE_TEST); */
    import { ref, onMounted } from 'vue';
    import '../env-test.js';

    const position = ref(null);
    onMounted(async () => {
        const res = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await res.json();
        position.value = data.iss_position;
    });
</script>