<script setup>
import { CHOIR_LIST } from '../data/schedule.js'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="kwaya" class="section" v-reveal>
    <SectionHeading
      eyebrow="Muziki wa Kambi"
      title="Ratiba ya Uimbaji wa Kwaya"
      desc="Orodha ya kwaya na vikundi vitakavyoshiriki kuimba kila siku."
    />
    <ol class="choir-list">
      <li v-for="(choir, i) in CHOIR_LIST" :key="choir.name" class="choir-row">
        <span class="choir-num">{{ i + 1 }}</span>
        <span class="choir-name">{{ choir.name }}</span>
        <span v-if="choir.location" class="choir-location">({{ choir.location }})</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.section {
  margin-top: 3rem;
  scroll-margin-top: 5rem;
}

.choir-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.choir-row {
  display: flex;
  gap: 0.7rem;
  align-items: baseline;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  background: #fdf5f2;
  border: 1px solid #f6e2da;
  flex-wrap: wrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-transform: uppercase;
}

.choir-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px -18px rgba(176, 79, 52, 0.45);
}

.choir-num {
  flex: 0 0 1.6rem;
  font-weight: 800;
  font-size: 0.85rem;
  color: #b04f34;
}

.choir-name {
  font-weight: 700;
  font-size: 0.85rem;
  color: #8a4530;
}

.choir-location {
  font-weight: 600;
  font-size: 0.8rem;
  color: #b0715a;
}
</style>
