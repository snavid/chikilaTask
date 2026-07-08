<script setup>
import { OPENING_ORDER } from '../data/schedule.js'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="ufunguzi" class="section">
    <SectionHeading eyebrow="Kiambatisho" :title="OPENING_ORDER.title" :desc="OPENING_ORDER.when" />
    <ol class="order-list">
      <li v-for="(s, i) in OPENING_ORDER.steps" :key="s.step" class="order-item">
        <span class="order-num">{{ i + 1 }}</span>
        <div class="order-body">
          <h4 class="order-step">{{ s.step }}</h4>
          <p class="order-who">{{ s.who }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.section {
  margin-top: 3rem;
  scroll-margin-top: 5rem;
}

.order-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #faf9ff;
  border: 1px solid #eeecf9;
  border-radius: 18px;
  padding: 0.4rem 1.1rem;
}

.order-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.75rem 0.5rem;
  margin: 0 -0.5rem;
  border-radius: 12px;
  border-bottom: 1px solid #eeecf9;
  transition: background 0.18s ease;
}

.order-item:hover {
  background: #f6f4ff;
}

.order-item:last-child {
  border-bottom: none;
}

.order-num {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: #4c3aa3;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
}

.order-step {
  margin: 0 0 0.15rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #201f3d;
}

.order-who {
  margin: 0;
  font-size: 0.78rem;
  color: #837fa0;
}
</style>
