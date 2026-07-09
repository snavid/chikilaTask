<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  simulatedAt: { type: [Date, null], default: null },
})
const emit = defineEmits(['update:simulatedAt'])

const open = ref(false)

function pad(n) {
  return String(n).padStart(2, '0')
}
function toLocalInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const inputValue = computed({
  get: () => (props.simulatedAt ? toLocalInputValue(props.simulatedAt) : ''),
  set: (val) => emit('update:simulatedAt', val ? new Date(val) : null),
})

const presets = [
  { label: 'Kuwasili · Jmos 18/7, 16:00', value: '2026-07-18T16:00' },
  { label: 'Ufunguzi wa Kambi · Jpil 19/7, 17:00', value: '2026-07-19T17:00' },
  { label: 'Mafundisho Makuu · Jtat 20/7, 08:45', value: '2026-07-20T08:45' },
  { label: 'Usiku wa Kulala · Jne 21/7, 23:00', value: '2026-07-21T23:00' },
  { label: 'Ubatizo · Ijm 24/7, 14:20', value: '2026-07-24T14:20' },
  { label: 'Kufunga Kambi · Sbt 25/7, 18:10', value: '2026-07-25T18:10' },
]

function useReal() {
  emit('update:simulatedAt', null)
}
</script>

<template>
  <div class="time-control" :class="{ open }">
    <button class="tc-toggle" :class="{ active: !!simulatedAt }" @click="open = !open">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
      {{ simulatedAt ? 'Hali ya Jaribio' : 'Ratiba ya Sasa' }}
    </button>

    <div v-if="open" class="tc-panel">
      <p class="tc-title">Onyesha ratiba wakati wowote</p>
      <p class="tc-hint">Tumia hii kuona jinsi ukurasa unavyobadilika kadri muda unavyosonga.</p>

      <input type="datetime-local" v-model="inputValue" class="tc-input" />

      <div class="tc-presets">
        <button v-for="p in presets" :key="p.value" class="tc-preset" @click="inputValue = p.value">
          {{ p.label }}
        </button>
      </div>

      <button class="tc-reset" :disabled="!simulatedAt" @click="useReal">
        Rudisha Saa Halisi ya Kifaa
      </button>
    </div>
  </div>
</template>

<style scoped>
.time-control {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
}

.tc-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  color: #4c3aa3;
  background: #fff;
  border: 1px solid #ddd7f7;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 8px 24px -10px rgba(35, 20, 90, 0.35);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.tc-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -10px rgba(35, 20, 90, 0.45);
}

.tc-toggle.active {
  background: #4c3aa3;
  color: #fff;
  border-color: transparent;
}

.tc-panel {
  width: 17.5rem;
  max-width: calc(100vw - 2.5rem);
  background: #fff;
  border: 1px solid #eeecf9;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 20px 45px -18px rgba(30, 20, 70, 0.35);
}

.tc-title {
  margin: 0 0 0.15rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #201f3d;
}

.tc-hint {
  margin: 0 0 0.65rem;
  font-size: 0.72rem;
  color: #837fa0;
  line-height: 1.35;
}

.tc-input {
  width: 100%;
  font: inherit;
  font-size: 0.82rem;
  padding: 0.5rem 0.6rem;
  border-radius: 10px;
  border: 1px solid #ded9f2;
  margin-bottom: 0.65rem;
  color: #201f3d;
}

.tc-presets {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.7rem;
  max-height: 9.5rem;
  overflow-y: auto;
}

.tc-preset {
  text-align: left;
  font: inherit;
  font-size: 0.7rem;
  padding: 0.4rem 0.55rem;
  border-radius: 8px;
  border: 1px solid #f0eefb;
  background: #faf9ff;
  color: #55527a;
  cursor: pointer;
}

.tc-preset:hover {
  border-color: #c9c3f0;
  background: #f3f0ff;
}

.tc-reset {
  width: 100%;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  background: #f1eefc;
  color: #4c3aa3;
  cursor: pointer;
}

.tc-reset:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
