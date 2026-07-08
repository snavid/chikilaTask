<script setup>
import { ref } from 'vue'
import { COMMITTEES } from '../data/schedule.js'
import SectionHeading from './SectionHeading.vue'

const openIndex = ref(null)
function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <!-- <section id="kamati" class="section">
    <SectionHeading
      eyebrow="Maandalizi ya Kambi"
      title="Kamati za Makambi 2026"
      desc="Bonyeza kamati kuona wanachama wake."
    />
    <div class="accordion">
      <div v-for="(c, i) in COMMITTEES" :key="c.title" class="acc-item" :class="{ open: openIndex === i }">
        <button class="acc-header" @click="toggle(i)">
          <span>{{ c.title }}</span>
          <svg class="acc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
        <div v-show="openIndex === i" class="acc-body">
          <div v-for="m in c.members" :key="m" class="acc-member">
            <span class="acc-dot"></span>{{ m }}
          </div>
        </div>
      </div>
    </div>
  </section> -->
</template>

<style scoped>
.section {
  margin-top: 3rem;
  scroll-margin-top: 5rem;
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.acc-item {
  border-radius: 16px;
  background: #faf9ff;
  border: 1px solid #eeecf9;
  overflow: hidden;
}

.acc-item.open {
  border-color: #d8d1f7;
}

.acc-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  background: none;
  border: none;
  font: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  color: #201f3d;
  cursor: pointer;
  text-align: left;
}

.acc-chevron {
  flex-shrink: 0;
  color: #8b5cf6;
  transition: transform 0.2s ease;
}

.acc-item.open .acc-chevron {
  transform: rotate(180deg);
}

.acc-body {
  padding: 0 1.1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.acc-member {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #5a5779;
}

.acc-dot {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c2654a;
}
</style>
