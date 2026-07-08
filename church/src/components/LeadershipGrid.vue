<script setup>
import { reactive } from 'vue'
import { LEADERS } from '../data/schedule.js'
import SectionHeading from './SectionHeading.vue'

function initials(name) {
  return name
    .replace(/^(Pr\.|Mch\.|M\.V\.|Mwinj\.)\s*/, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const brokenPhotos = reactive({})
</script>

<template>
  <section id="uongozi" class="section">
    <SectionHeading
      eyebrow="Team"
      title="Wahudumu Wakuu"
      desc="Wahudumu wanaoongoza huduma katika Makambi 2026."
    />
    <div class="leader-grid">
      <div v-for="l in LEADERS" :key="l.name" class="leader-card">
        <img
          v-if="l.photo && !brokenPhotos[l.name]"
          :src="l.photo"
          :alt="l.name"
          class="leader-photo"
          @error="brokenPhotos[l.name] = true"
        />
        <span v-else class="leader-avatar">{{ initials(l.name) }}</span>
        <h4 class="leader-name">{{ l.name }}</h4>
        <p class="leader-role">{{ l.role }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  margin-top: 3rem;
  scroll-margin-top: 5rem;
}

.leader-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
  gap: 0.9rem;
}

.leader-card {
  text-align: center;
  padding: 1.4rem 1rem 1.2rem;
  border-radius: 18px;
  background: #faf9ff;
  border: 1px solid #eeecf9;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.leader-card:hover {
  transform: translateY(-3px);
  border-color: #d8d1f7;
  box-shadow: 0 16px 30px -18px rgba(76, 58, 163, 0.4);
}

.leader-avatar,
.leader-photo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  margin-bottom: 0.7rem;
}

.leader-avatar {
  background: linear-gradient(155deg, #4c3aa3, #6a4bb8);
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
}

.leader-photo {
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #e0daf9;
}

.leader-name {
  margin: 0 0 0.3rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #201f3d;
}

.leader-role {
  margin: 0;
  font-size: 0.75rem;
  color: #837fa0;
  line-height: 1.4;
}
</style>
