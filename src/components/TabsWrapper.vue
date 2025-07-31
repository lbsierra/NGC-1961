<template>
    <div>
        <NavPanel :activeTab="props.activeTab" @selectTab="emit('selectTab', $event)" />
    </div>
</template>

<script setup lang="ts">
import NavPanel from './NavPanel.vue';

import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ activeTab: string }>();
const emit = defineEmits<{
  (e: 'selectTab', tab: string): void;
}>();
</script>