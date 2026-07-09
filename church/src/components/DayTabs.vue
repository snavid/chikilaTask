<script setup>
defineProps({
  days: { type: Array, required: true },
  modelValue: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="day-tabs">
    <button
      v-for="day in days"
      :key="day.dayKey"
      class="day-tab"
      :class="{
        active: day.dayKey === modelValue,
        live: day.dayHasLive,
        past: day.dayIsFullyPast,
        today: day.dayIsToday,
      }"
      @click="emit('update:modelValue', day.dayKey)"
    >
      <span class="day-tab-weekday">{{ day.weekday }}</span>
      <span class="day-tab-date">{{ day.dateLabel.split(' ')[0] }}</span>
      <span v-if="day.label" class="day-tab-label">{{ day.label }}</span>
      <span v-if="day.dayIsToday" class="day-tab-today">LEO</span>
      <span v-if="day.dayHasLive" class="day-tab-dot" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped>
.day-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.25rem 0.125rem 0.75rem;
  scrollbar-width: thin;
}

.day-tab {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  min-width: 4.75rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e4e1f5;
  border-radius: 14px;
  background: #faf9ff;
  color: #4b4a63;
  cursor: pointer;
  font: inherit;
  transition: all 0.18s ease;
}

.day-tab:hover {
  border-color: #c9c3f0;
  transform: translateY(-1px);
}

.day-tab-weekday {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.day-tab-date {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: #24234a;
}

.day-tab-today {
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #2f9e6e;
  background: #e8f7ef;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
}

.day-tab.active .day-tab-today {
  color: #1f7a51;
  background: #d6f5e3;
}

.day-tab.today:not(.active) {
  border-color: #b7e8cd;
  box-shadow: 0 0 0 1px #b7e8cd inset;
}

.day-tab-label {
  font-size: 0.62rem;
  font-weight: 600;
  color: #8b5cf6;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.day-tab.past {
  opacity: 0.5;
}

.day-tab.active {
  background: linear-gradient(155deg, #241f4d, #4c3aa3);
  border-color: transparent;
  box-shadow: 0 8px 20px -8px rgba(76, 58, 163, 0.55);
}

.day-tab.active .day-tab-weekday,
.day-tab.active .day-tab-date {
  color: #fff;
}

.day-tab.active .day-tab-label {
  color: #ffd28a;
}

.day-tab.active.past {
  opacity: 1;
  background: linear-gradient(155deg, #3a3958, #55547a);
}

.day-tab-dot {
  position: absolute;
  top: 0.45rem;
  right: 0.5rem;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff5a4e;
  box-shadow: 0 0 0 0 rgba(255, 90, 78, 0.6);
  animation: dot-pulse 1.6s infinite;
}

@keyframes dot-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 90, 78, 0.55);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 90, 78, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 90, 78, 0);
  }
}
</style>
