<script setup lang="ts">
import { placements } from 'astro/runtime/client/dev-toolbar/ui-library/window.js';
    defineProps<{
        planet: {
            pl_name: string;
            hostname: string;
            distance?: number;
            pl_orbper?: number;
            pl_rade?: number;
            pl_discoverymethod?: string;
        }
    }>();

</script>

<template>
    <div class="planet-card">
        <div class="planet-header">
            <h4>{{ planet.pl_name }}</h4>
            <img src="/icons/ring-planet.svg" alt="Exoplanet Icon" class="exoplanet-icon" />
        </div>
        <p><strong>Host Star:</strong> {{ planet.hostname }}</p>
        <p><strong>Distance:</strong> {{ planet.distance }}</p>
        <p><strong>Orbital Period:</strong> {{ planet.pl_orbper }} days</p>
        <p><strong>Planet Radius:</strong> {{ planet.pl_rade }} R🜨</p>
        <p><strong>Discovery Method:</strong> {{ planet.pl_discoverymethod }}</p>
    </div>
</template>

<style scoped>
    .planet-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        background-color: #0b0e15;
        color: #eee;
        box-shadow: 0 0 5px rgba(100, 255, 255, 0.1);
    }

    .planet-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .planet-icon {
        width: 24px;
        height: 24px;
        opacity: 0.85;
    }
</style>