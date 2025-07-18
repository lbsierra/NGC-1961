<template>
    <div class="weather-panel">
        <h3>
            {{ title }}
        </h3>
        <div v-if="events.length === 0" class="empty-state">
            <p>No events found.</p>
        </div>

        <ul v-else>
            <li v-for="(event, index) in events" :key="index" class="event-card">
                <p><strong>Time:</strong> {{ formatDate(event.beginTime || event.startTime || event.time ) }}</p>
                <p v-if="event.classType"><strong>Class:</strong> {{ event.classType }}</p>
                <p v-if="event.sourceLocation"><strong>Location:</strong> {{ event.sourceLocation }}</p>
                <p v-if="event.cmeAnalyses?.[0]?.speed"><strong>Speed:</strong> {{ event.cmeAnalyses[0].speed }} km/s</p>
                <p v-if="event.kpIndex?.[0].kpIndex"><strong>KP Index:</strong> {{ event.kpIndex[0].kpIndex }}</p>
            </li>       
        </ul>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    events: {
        type: Array,
        required: true
    }
});

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleString();
}

</script>

<style scoped>
    .weather-panel {
        background: #111;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(255, 200, 50, 0.2);
    }

    h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #ffcc00;
    }

    .event-card {
        background: #222;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-left: 3px solid #ffcc00;
        transition: transform 0.3s ease;
    }

    .event-card:hover {
        transform: translateX(5px);
    }

    .empty-state {
        color: #888;
        font-style: italic;
    }
</style>
