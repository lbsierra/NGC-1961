<template>
    <div class="tab-buttons">
        <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="$emit('selectTab', tab)"
        >
        {{ tab }}
    </button>
    </div>
</template>

<script setup lang="ts">
const tabs = ['Earth', 'Mars', 'Beyond']
import { defineProps } from 'vue';
defineProps<{
    activeTab: string;
}>();
</script>

<style scoped>
.tab-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background: #1c1f2a;
    color: #eee;
    border: 1px solid #555;
    border-radius: 4px;
}

button.active {
    background: #4aa3df;
    border-color: #4aa3df;
    color: #fff;
}
</style>