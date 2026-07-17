<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { NAV_SECTIONS } from '../data/schedule.js'

const activeId = ref(NAV_SECTIONS[0].id)
const scrolled = ref(false)
const menuOpen = ref(false)
let observer = null

function goTo(id) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const targets = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length > 0) {
        const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        activeId.value = top.target.id
      }
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  )
  targets.forEach((t) => observer.observe(t))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="navbar-inner">
      <button class="brand" @click="goTo('nyumbani')">
        <span class="brand-mark">MZ</span>
        <span class="brand-text">
          <span class="brand-title">Kambi 2026</span>
          <span class="brand-sub">Mtaa wa Kiromo</span>
        </span>
      </button>

      <nav class="nav-links nav-links--desktop">
        <button
          v-for="s in NAV_SECTIONS"
          :key="s.id"
          class="nav-link"
          :class="{ active: activeId === s.id }"
          @click="goTo(s.id)"
        >
          {{ s.label }}
        </button>
      </nav>

      <button class="nav-toggle" :class="{ open: menuOpen }" aria-label="Fungua menyu" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>
    </div>

    <nav v-if="menuOpen" class="nav-links nav-links--mobile">
      <button
        v-for="s in NAV_SECTIONS"
        :key="s.id"
        class="nav-link"
        :class="{ active: activeId === s.id }"
        @click="goTo(s.id)"
      >
        {{ s.label }}
      </button>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.navbar.scrolled {
  border-bottom-color: #efecfb;
  box-shadow: 0 8px 24px -18px rgba(40, 25, 100, 0.35);
}

.navbar-inner {
  max-width: 880px;
  margin: 0 auto;
  padding: 0.6rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
  text-align: left;
}

.brand-mark {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  border-radius: 10px;
  background: linear-gradient(155deg, #4c3aa3, #6a4bb8);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0 6px 14px -6px rgba(76, 58, 163, 0.55);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #201f3d;
}

.brand-sub {
  font-size: 0.68rem;
  font-weight: 600;
  color: #9490b0;
}

.nav-links {
  display: flex;
  gap: 0.15rem;
}

.nav-links--mobile {
  flex-direction: column;
  max-width: 880px;
  margin: 0 auto;
  padding: 0.4rem 1.25rem 0.8rem;
  gap: 0.2rem;
}

.nav-link {
  position: relative;
  flex: 0 0 auto;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: #6b6886;
  background: none;
  border: none;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.18s ease, color 0.18s ease;
}

.nav-links--mobile .nav-link {
  text-align: left;
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
}

.nav-link:hover {
  background: #f4f1ff;
  color: #4c3aa3;
}

.nav-link.active {
  background: #4c3aa3;
  color: #fff;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 2.15rem;
  height: 2.15rem;
  padding: 0;
  border-radius: 10px;
  border: 1px solid #eeecf9;
  background: #faf9ff;
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  width: 1.1rem;
  height: 2px;
  margin: 0;
  background: #4c3aa3;
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.nav-toggle.open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.nav-toggle.open span:nth-child(2) {
  opacity: 0;
}
.nav-toggle.open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

@media (max-width: 700px) {
  .nav-links--desktop {
    display: none;
  }
  .nav-toggle {
    display: flex;
  }
}
</style>
