<script setup>
import { computed } from 'vue'
import { CATEGORIES } from '../data/schedule.js'

const props = defineProps({
  event: { type: Object, required: true },
})

const category = computed(() => CATEGORIES[props.event.kind])
const monogram = computed(() =>
  category.value.label
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <li
    class="event"
    :class="[event.status, { featured: event.featured }]"
    :style="{ '--accent': category.color }"
  >
    <div class="event-rail">
      <span class="event-dot"></span>
    </div>

    <div class="event-body">
      <div class="event-top">
        <span class="event-time">{{ event.time }}</span>
        <span class="badge" :style="{ background: category.color + '1f', color: category.color }">
          <span class="badge-mono" :style="{ background: category.color }">{{ monogram }}</span>
          {{ category.label }}
        </span>
        <span v-if="event.status === 'live'" class="live-chip">
          <span class="live-blip"></span>SASA HIVI
        </span>
        <span v-else-if="event.status === 'past'" class="done-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6" /></svg>
          Imepita
        </span>
      </div>

      <h3 class="event-title">{{ event.title }}</h3>

      <div class="event-meta">
        <span><strong>Mhusika:</strong> {{ event.lead }}</span>
        <span><strong>Mwenyekiti:</strong> {{ event.chair }}</span>
        <span class="committee"><strong>Kamati:</strong> {{ event.committee }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped>
.event {
  position: relative;
  display: flex;
  gap: 0.9rem;
  padding: 0 0 1.5rem;
}

.event-rail {
  position: relative;
  width: 1.1rem;
  display: flex;
  justify-content: center;
}

.event-rail::before {
  content: '';
  position: absolute;
  top: 0.35rem;
  bottom: -1.5rem;
  width: 2px;
  background: #ece9fb;
}

.event:last-child .event-rail::before {
  display: none;
}

.event-dot {
  position: relative;
  z-index: 1;
  margin-top: 0.3rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px #fff, 0 0 0 4px #ece9fb;
}

.event.past .event-dot {
  background: #cfcbe6;
}

.event-body {
  flex: 1;
  min-width: 0;
  background: #fff;
  border: 1px solid #eeecf9;
  border-radius: 16px;
  padding: 0.9rem 1.1rem 1rem;
  transition: all 0.25s ease;
  box-shadow: 0 1px 2px rgba(30, 20, 70, 0.04);
}

.event.past .event-body {
  opacity: 0.48;
  filter: saturate(0.7);
}

.event.live .event-body {
  border-color: var(--accent);
  box-shadow: 0 12px 30px -12px color-mix(in srgb, var(--accent) 60%, transparent), 0 0 0 1px var(--accent);
  transform: translateY(-2px) scale(1.012);
}

.event.featured .event-body {
  background: linear-gradient(180deg, #fff, #fdfbff);
}

.event-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.event-time {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #24234a;
  font-size: 0.92rem;
  letter-spacing: -0.01em;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 0.2rem 0.55rem 0.2rem 0.2rem;
  border-radius: 999px;
}

.badge-mono {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  color: #fff;
  font-size: 0.58rem;
}

.live-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #ff5a4e;
  color: #fff;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  box-shadow: 0 4px 12px -3px rgba(255, 90, 78, 0.6);
}

.live-blip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: blip 1.1s infinite;
}

@keyframes blip {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

.done-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #9490b0;
  font-size: 0.68rem;
  font-weight: 600;
}

.event-title {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #201f3d;
  line-height: 1.3;
}

.event.live .event-title {
  color: var(--accent);
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.8rem;
  color: #6b6886;
}

.event-meta strong {
  color: #504e73;
  font-weight: 600;
}

@media (max-width: 560px) {
  .event-meta .committee {
    display: none;
  }
}
</style>
