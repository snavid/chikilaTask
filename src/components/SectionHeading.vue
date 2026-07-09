<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
})
</script>

<template>
  <div class="section-heading">
    <span class="section-eyebrow">{{ eyebrow }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
  </div>
</template>

<style scoped>
.section-heading {
  margin: 0 0.2rem 1.1rem;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a3792f;
  margin-bottom: 0.3rem;
}

.section-title {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #201f3d;
}

.section-desc {
  margin: 0;
  max-width: 42rem;
  font-size: 0.88rem;
  color: #6b6886;
  line-height: 1.5;
}
</style>
