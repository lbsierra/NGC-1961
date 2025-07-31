<template>
    <div class="tab-panel">
        <EarthPanel v-if="activeTab === 'Earth'" />
        <MarsPanel v-else-if="activeTab === 'Mars'" />
        <BeyondPanel v-else-if="activeTab === 'Beyond'" />
    </div>
</template>

<script setup lang="ts">
import EarthPanel from './EarthPanel.vue';
import MarsPanel from './MarsPanel.vue';
import BeyondPanel from './BeyondPanel.vue';

defineProps<{ activeTab: string }>()
</script>