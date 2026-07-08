<script setup>
import { CHOIR_SCHEDULE } from '../data/schedule.js'
import SectionHeading from './SectionHeading.vue'

const days = Object.entries(CHOIR_SCHEDULE)
</script>

<template>
  <section id="kwaya" class="section">
    <SectionHeading
      eyebrow="Muziki wa Kambi"
      title="Ratiba ya Uimbaji wa Kwaya"
      desc="Orodha ya kwaya na vikundi vitakavyoshiriki kuimba kila siku."
    />
    <div class="choir-list">
      <div v-for="[day, choirs] in days" :key="day" class="choir-row">
        <span class="choir-day">{{ day }}</span>
        <div class="choir-chips">
          <span v-for="name in choirs" :key="name" class="choir-chip">{{ name }}</span>
        </div>
      </div>
    </div>
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
}

.choir-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  background: #fdf5f2;
  border: 1px solid #f6e2da;
  flex-wrap: wrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.choir-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px -18px rgba(176, 79, 52, 0.45);
}

.choir-day {
  flex: 0 0 8rem;
  font-weight: 800;
  font-size: 0.85rem;
  color: #b04f34;
  padding-top: 0.2rem;
}

.choir-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  flex: 1;
}

.choir-chip {
  font-size: 0.76rem;
  font-weight: 600;
  color: #8a4530;
  background: #fff;
  border: 1px solid #f0d9d0;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}
</style>
