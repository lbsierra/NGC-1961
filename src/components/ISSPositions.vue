<script setup>
const props = defineProps({
    location: String
})
</script>

<template>
    <section>
        <h3>Current Position</h3>
        <p v-if="location">
            Over: <strong>{{ location }}</strong>
        </p>
        <p v-else>
            Loading ISS data...
        </p>         
    </section>
</template>