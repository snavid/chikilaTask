<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useSchedule } from './composables/useSchedule.js'
import { HERO, COMPLETION_MESSAGE, CONTACTS } from './data/schedule.js'
import NavBar from './components/NavBar.vue'
import DayTabs from './components/DayTabs.vue'
import EventCard from './components/EventCard.vue'
import SectionHeading from './components/SectionHeading.vue'
import ClassDivisions from './components/ClassDivisions.vue'
import ChoirSchedule from './components/ChoirSchedule.vue'
import LeadershipGrid from './components/LeadershipGrid.vue'
import CommitteeAccordion from './components/CommitteeAccordion.vue'
import OpeningOrder from './components/OpeningOrder.vue'
import TimeControl from './components/TimeControl.vue'

const {
  now,
  simulatedAt,
  setSimulatedTime,
  campPhase,
  liveEvent,
  nextEvent,
  days,
  selectedDayKey,
  selectedDay,
  selectedDayEvents,
  jumpToNow,
  CAMP_START,
} = useSchedule()

const dayIndex = computed(() => days.value.findIndex((d) => d.dayKey === selectedDayKey.value) + 1)

// The hero banner reflects real, global camp status — independent of whichever
// day tab the visitor happens to be browsing below.
function dayIndexFor(dayKey) {
  if (!dayKey) return null
  return days.value.findIndex((d) => d.dayKey === dayKey) + 1
}
const liveDayIndex = computed(() => dayIndexFor(liveEvent.value?.dayKey) ?? dayIndex.value)
const nextDayIndex = computed(() => dayIndexFor(nextEvent.value?.dayKey) ?? dayIndex.value)

const clockLabel = computed(() =>
  now.value.toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
)
const dateLabel = computed(() =>
  now.value.toLocaleDateString('sw-TZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
)

function formatCountdown(ms) {
  if (ms <= 0) return '0s'
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const mins = Math.floor((s % 3600) / 60)
  const secs = s % 60
  if (d > 0) return `${d}s ${hours}h ${mins}d`
  if (hours > 0) return `${hours}h ${mins}d ${secs}s`
  return `${mins}d ${secs}s`
}

const countdownToStart = computed(() => formatCountdown(CAMP_START - now.value))
const liveElapsedPct = computed(() => {
  if (!liveEvent.value) return 0
  const total = liveEvent.value.end - liveEvent.value.start
  const done = now.value - liveEvent.value.start
  return Math.min(100, Math.max(0, (done / total) * 100))
})

const timelineEl = ref(null)
async function scrollToLive() {
  await nextTick()
  const node = timelineEl.value?.querySelector('.event.live')
  if (node) node.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
watch(() => liveEvent.value?.title, scrollToLive)
watch(selectedDayKey, scrollToLive)

function handleSetSimulated(val) {
  setSimulatedTime(val)
  jumpToNow()
}
</script>

<template>
  <div class="page">
    <NavBar />
    <div class="container">
      <header id="nyumbani" class="hero">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-glow hero-glow--2" aria-hidden="true"></div>
        <div class="hero-top">
          <div>
            <p class="hero-kicker">{{ HERO.church }}</p>
            <h1 class="hero-title">{{ HERO.title }}<span class="hero-title-sub">{{ HERO.subtitle }}</span></h1>
            <p class="hero-theme">"{{ HERO.theme }}"</p>
            <div class="hero-meta-row">
              <span class="hero-meta-item">{{ HERO.dateRange }}</span>
              <span class="hero-meta-item">{{ HERO.location }}</span>
            </div>
          </div>
          <div class="hero-clock">
            <span class="hero-clock-time">{{ clockLabel }}</span>
            <span class="hero-clock-date">{{ dateLabel }}</span>
            <span v-if="simulatedAt" class="hero-clock-flag">HALI YA JARIBIO</span>
          </div>
        </div>

        <blockquote class="hero-verse">
          <p>"{{ HERO.verse.text }}"</p>
          <cite>— {{ HERO.verse.ref }}</cite>
        </blockquote>

        <div class="hero-actions">
          <a href="#ratiba" class="hero-btn hero-btn--primary">
            Tazama Ratiba Kamili
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
          <a href="#uongozi" class="hero-btn hero-btn--ghost">Wahudumu wa Kambi</a>
        </div>

        <div class="hero-status">
          <template v-if="campPhase === 'before'">
            <div class="status-block">
              <span class="status-label">Kambi huanza baada ya</span>
              <span class="status-value">{{ countdownToStart }}</span>
            </div>
            <div class="status-block">
              <span class="status-label">Tarehe</span>
              <span class="status-value small">{{ HERO.dateRange }}</span>
            </div>
          </template>

          <template v-else-if="campPhase === 'during' && liveEvent">
            <div class="status-block live-block">
              <span class="status-label"><span class="live-blip"></span>Inaendelea Sasa</span>
              <span class="status-value">{{ liveEvent.title }}</span>
              <div class="live-progress"><div class="live-progress-fill" :style="{ width: liveElapsedPct + '%' }"></div></div>
              <span class="status-sub">{{ liveEvent.time }}</span>
            </div>
            <div class="status-block">
              <span class="status-label">Siku</span>
              <span class="status-value">{{ liveDayIndex }} / {{ days.length }}</span>
            </div>
          </template>

          <template v-else-if="campPhase === 'during'">
            <div class="status-block">
              <span class="status-label">Kipindi kinachofuata</span>
              <span class="status-value">{{ nextEvent?.title }}</span>
              <span class="status-sub" v-if="nextEvent">{{ nextEvent.time }}</span>
            </div>
            <div class="status-block">
              <span class="status-label">Siku</span>
              <span class="status-value">{{ nextDayIndex }} / {{ days.length }}</span>
            </div>
          </template>

          <template v-else>
            <div class="status-block">
              <span class="status-label">{{ COMPLETION_MESSAGE.kicker }}</span>
              <span class="status-value">{{ COMPLETION_MESSAGE.title }}</span>
            </div>
          </template>
        </div>
      </header>

      <section id="ratiba" class="section ratiba-section" v-reveal>
        <SectionHeading
          eyebrow="Ratiba ya Siku Saba"
          title="Ratiba Kamili ya Makambi"
          desc="Chagua siku kuona ratiba yake. Siku ya leo na kipindi kinachoendelea sasa vimeonyeshwa moja kwa moja."
        />

        <div class="controls-row">
          <DayTabs v-model="selectedDayKey" :days="days" />
          <button v-if="liveEvent && selectedDayKey !== liveEvent.dayKey" class="jump-now" @click="jumpToNow">
            Nenda kwenye Kipindi cha Sasa →
          </button>
        </div>

        <main class="timeline-wrap" ref="timelineEl">
          <Transition name="day-fade" mode="out-in">
            <div :key="selectedDayKey">
              <div class="timeline-head">
                <h3>{{ selectedDay?.weekday }}<span v-if="selectedDay?.label"> · {{ selectedDay.label }}</span></h3>
                <span class="timeline-date">{{ selectedDay?.dateLabel }}</span>
              </div>
              <ol class="timeline">
                <EventCard v-for="(ev, i) in selectedDayEvents" :key="i" :event="ev" />
              </ol>
            </div>
          </Transition>
        </main>
      </section>

      <ClassDivisions />
      <ChoirSchedule />
      <LeadershipGrid />
      <CommitteeAccordion />
      <OpeningOrder />

      <footer class="page-footer" v-reveal>
        <p class="footer-church">{{ HERO.church }}</p>
        <p class="footer-sub">Mtaa wa Manzese — Dar es Salaam</p>
        <p class="footer-theme">"{{ HERO.theme }}"</p>
        <p class="footer-copy">Ratiba ya Makambi 2026 · {{ HERO.dateRange }}</p>
        <div class="footer-divider"></div>
        <p class="footer-contacts-label">Mawasiliano</p>
        <div class="footer-contacts">
          <a v-for="c in CONTACTS" :key="c.phone" :href="`tel:${c.phone.replace(/\s/g, '')}`" class="footer-contact">
            <span class="footer-contact-role">{{ c.role }}</span>
            <span class="footer-contact-phone">{{ c.phone }}</span>
          </a>
        </div>
        <p class="footer-note">Ratiba hii inaoana moja kwa moja na saa ya kifaa chako — vipindi vilivyopita vinafifia, kinachoendelea sasa kinaangaziwa.</p>
      </footer>
    </div>

    <TimeControl :simulated-at="simulatedAt" @update:simulated-at="handleSetSimulated" />
  </div>
</template>

<style>
:root {
  --font-display: 'Fraunces', 'Georgia', serif;
  --font-body: 'Inter', 'Segoe UI', ui-sans-serif, system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif;
}
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  background: #ffffff;
}
body {
  font-family: var(--font-body);
}
#app {
  background: #ffffff;
}
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>

<style scoped>
.page {
  background: #ffffff;
  min-height: 100vh;
  color: #201f3d;
}

.container {
  max-width: 880px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 4rem;
}

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 1.75rem 1.75rem 1.6rem;
  background: linear-gradient(150deg, #1c1740 0%, #3a2d82 55%, #6a4bb8 100%);
  color: #fff;
  box-shadow: 0 25px 50px -20px rgba(40, 25, 100, 0.45);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(ellipse at 70% 0%, black 0%, transparent 65%);
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  inset: -40% -10% auto auto;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(255, 190, 120, 0.35), transparent 70%);
  pointer-events: none;
  animation: drift-1 14s ease-in-out infinite;
}

.hero-glow--2 {
  inset: auto auto -35% -15%;
  right: auto;
  width: 20rem;
  height: 20rem;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.28), transparent 70%);
  animation: drift-2 18s ease-in-out infinite;
}

@keyframes drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-1.2rem, 1rem) scale(1.08); }
}

@keyframes drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(1rem, -0.8rem) scale(1.06); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-glow,
  .hero-glow--2 {
    animation: none;
  }
}

.hero-top {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero-kicker {
  margin: 0 0 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffd28a;
}

.hero-title {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.12;
}

.hero-title-sub {
  display: block;
  font-size: 0.6em;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #cfc8f2;
  margin-top: 0.35rem;
}

.hero-theme {
  margin: 0 0 0.7rem;
  font-size: 0.95rem;
  font-style: italic;
  color: #ffd28a;
}

.hero-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-meta-item {
  font-size: 0.78rem;
  font-weight: 600;
  color: #e7e2f9;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
}

.hero-verse {
  position: relative;
  margin: 1.4rem 0 0;
  padding: 0.9rem 1.1rem;
  background: rgba(255, 255, 255, 0.07);
  border-left: 3px solid #ffd28a;
  border-radius: 4px 14px 14px 4px;
}

.hero-verse p {
  margin: 0 0 0.35rem;
  font-size: 0.88rem;
  font-style: italic;
  color: #ede9fb;
  line-height: 1.55;
}

.hero-verse cite {
  font-size: 0.76rem;
  font-weight: 700;
  color: #ffd28a;
  font-style: normal;
}

.hero-clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.hero-clock-time {
  font-size: 1.9rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.hero-clock-date {
  font-size: 0.75rem;
  color: #cfc8f2;
  margin-top: 0.3rem;
  text-transform: capitalize;
}

.hero-clock-flag {
  margin-top: 0.4rem;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  background: #ff5a4e;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.hero-actions {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.6rem 1.05rem;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.hero-btn--primary {
  background: linear-gradient(135deg, #ffb26b, #ff8a5c);
  color: #29173a;
  box-shadow: 0 10px 24px -10px rgba(255, 138, 92, 0.7);
}

.hero-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -10px rgba(255, 138, 92, 0.8);
}

.hero-btn--ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #f1edfd;
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.hero-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.16);
}

.hero-status {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.status-block {
  flex: 1 1 14rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  backdrop-filter: blur(6px);
}

.status-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #cfc8f2;
}

.status-value {
  font-size: 1.15rem;
  font-weight: 700;
}

.status-value.small {
  font-size: 0.95rem;
}

.status-sub {
  font-size: 0.75rem;
  color: #cfc8f2;
}

.live-blip {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff8a6b;
  animation: blip 1.1s infinite;
}

@keyframes blip {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

.live-progress {
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
  margin: 0.15rem 0;
}

.live-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffb26b, #ff5a4e);
  border-radius: 999px;
  transition: width 1s linear;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.6rem;
  flex-wrap: wrap;
}

.jump-now {
  flex: 0 0 auto;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  color: #4c3aa3;
  background: #f1eefc;
  border: 1px solid #e0daf9;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
}

.jump-now:hover {
  background: #e6e0fb;
}

.timeline-wrap {
  margin-top: 0.75rem;
}

.timeline-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0.2rem 1rem;
}

.timeline-head h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: #201f3d;
}

.timeline-date {
  font-size: 0.85rem;
  color: #837fa0;
  font-weight: 600;
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}

.day-fade-enter-active {
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.day-fade-leave-active {
  transition: opacity 0.16s ease;
}
.day-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.day-fade-leave-to {
  opacity: 0;
}

.section {
  margin-top: 3rem;
  scroll-margin-top: 5rem;
}

.ratiba-section {
  margin-top: 2rem;
}

.page-footer {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid #f0eefb;
  text-align: center;
}

.footer-church {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #201f3d;
}

.footer-sub {
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  color: #837fa0;
}

.footer-theme {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  font-style: italic;
  color: #b04f34;
}

.footer-copy {
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  color: #9490b0;
}

.footer-divider {
  height: 1px;
  background: #f0eefb;
  margin: 1.25rem auto;
  max-width: 20rem;
}

.footer-contacts-label {
  margin: 0 0 0.6rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #a3792f;
}

.footer-contacts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.5rem 0.9rem;
  border-radius: 12px;
  background: #faf9ff;
  border: 1px solid #eeecf9;
  text-decoration: none;
}

.footer-contact-role {
  font-size: 0.68rem;
  color: #837fa0;
}

.footer-contact-phone {
  font-size: 0.8rem;
  font-weight: 700;
  color: #4c3aa3;
}

.footer-note {
  max-width: 32rem;
  margin: 0 auto;
  font-size: 0.75rem;
  color: #9490b0;
}

@media (max-width: 600px) {
  .hero {
    padding: 1.4rem 1.2rem 1.3rem;
  }
  .hero-top {
    flex-direction: column;
  }
  .hero-clock {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
