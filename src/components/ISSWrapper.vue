<template>
    <section id="iss-box">
        <section id="coordinates" class="content-box">
            <ISSPositions :location="currentLocation" />
        </section>
        <section id="map" class="content-box">
            <ISSMap 
                @updateLocation="locationUpdate"
             />
        </section>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import ISSPositions from './ISSPositions.vue';
import ISSMap from './ISSMap.vue';

const currentLocation = ref('');

function locationUpdate(loc) {
    currentLocation.value = loc;
}
</script>