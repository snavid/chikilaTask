<script setup>
import { CLASS_DIVISIONS } from '../data/schedule.js'
import SectionHeading from './SectionHeading.vue'
</script>

<!-- <template>
  <section id="madarasa" class="section" v-reveal>
    <SectionHeading
      eyebrow="Huduma za Familia"
      title="Mgawanyiko wa Madarasa"
      desc="Wakati wa vipindi vya &quot;Mgawanyiko Familia&quot; katika ratiba ya kila siku, washiriki watagawanyika katika madarasa yafuatayo kulingana na hali zao."
    />
    <div class="class-grid">
      <div v-for="c in CLASS_DIVISIONS" :key="c.name" class="class-card">
        <h4 class="class-name">{{ c.name }}</h4>
        <p class="class-minister">{{ c.minister }}</p>
        <p class="class-desc">{{ c.desc }}</p>
      </div>
    </div>
  </section>
</template> -->

<style scoped>
.section {
  margin-top: 3rem;
  scroll-margin-top: 5rem;
}

.class-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr));
  gap: 0.9rem;
}

.class-card {
  border-radius: 18px;
  padding: 1.1rem 1.2rem;
  background: #fffaf1;
  border: 1px solid #f4e6c8;
  border-left: 3px solid #c98a3e;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.class-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 30px -18px rgba(169, 121, 47, 0.45);
}

.class-name {
  margin: 0 0 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  color: #201f3d;
}

.class-minister {
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #a3792f;
}

.class-desc {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: #6b6886;
}
</style>
