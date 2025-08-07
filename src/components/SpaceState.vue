<template>
  <section id="space-main">
    <aside id="space-box">
      <section id="space-left" class="content-box">
        <h2>Explore the Cosmos</h2>
        <p id="space-p">Select a view to explore space imagery from NASA.</p>
      </section>

      <section id="space-right" class="content-box">
        <TabsWrapper :activeTab="activeTab" @selectTab="activeTab = $event" />
      </section>
    </aside>
>
    <main id="space-content" class="content-box">
      <TabContent :activeTab="activeTab" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabsWrapper from './TabsWrapper.vue'
import TabContent from './TabContent.vue'

const activeTab = ref('Earth')
</script>