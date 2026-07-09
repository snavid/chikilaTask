import { computed, onMounted, onUnmounted, ref } from 'vue'
import { SCHEDULE } from '../data/schedule.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

function toDate(dayKey, hhmm) {
  const [y, mo, d] = dayKey.split('-').map(Number)
  const [h, m] = hhmm.split(':').map(Number)
  return new Date(y, mo - 1, d, h, m, 0, 0)
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Flatten the schedule into events carrying real Date objects, handling
// sessions that cross midnight (e.g. Kulala 21:30 -> 05:30).
const FLAT_EVENTS = SCHEDULE.flatMap((day) =>
  day.events.map((ev) => {
    const [startStr, endStr] = ev.time.split(' - ')
    const start = toDate(day.dayKey, startStr)
    let end = toDate(day.dayKey, endStr)
    if (end <= start) end = new Date(end.getTime() + 24 * 60 * 60 * 1000)
    return { ...ev, dayKey: day.dayKey, start, end }
  }),
)

const CAMP_START = FLAT_EVENTS[0].start
const CAMP_END = FLAT_EVENTS[FLAT_EVENTS.length - 1].end

export function useSchedule() {
  const now = ref(new Date())
  const simulatedAt = ref(null) // when set, freezes "now" relative to a chosen instant
  let tickHandle = null

  onMounted(() => {
    tickHandle = setInterval(() => {
      now.value = simulatedAt.value ? new Date(simulatedAt.value) : new Date()
    }, 1000)
  })
  onUnmounted(() => tickHandle && clearInterval(tickHandle))

  function setSimulatedTime(value) {
    simulatedAt.value = value ? new Date(value) : null
    now.value = simulatedAt.value ? new Date(simulatedAt.value) : new Date()
  }

  const campPhase = computed(() => {
    if (now.value < CAMP_START) return 'before'
    if (now.value >= CAMP_END) return 'after'
    return 'during'
  })

  const liveEvent = computed(
    () => FLAT_EVENTS.find((ev) => now.value >= ev.start && now.value < ev.end) || null,
  )

  const nextEvent = computed(() => {
    const upcoming = FLAT_EVENTS.filter((ev) => ev.start > now.value)
    return upcoming.length ? upcoming.reduce((a, b) => (a.start < b.start ? a : b)) : null
  })

  const selectedDayKey = ref(pickDefaultDay())

  function pickDefaultDay() {
    const live = FLAT_EVENTS.find((ev) => now.value >= ev.start && now.value < ev.end)
    if (live) return live.dayKey
    const today = dateKey(now.value)
    if (SCHEDULE.some((d) => d.dayKey === today)) return today
    const upcoming = FLAT_EVENTS.filter((ev) => ev.start > now.value)
    if (upcoming.length) return upcoming.reduce((a, b) => (a.start < b.start ? a : b)).dayKey
    if (now.value >= CAMP_END) return SCHEDULE[SCHEDULE.length - 1].dayKey
    return SCHEDULE[0].dayKey
  }

  function jumpToNow() {
    selectedDayKey.value = pickDefaultDay()
  }

  const days = computed(() =>
    SCHEDULE.map((day) => {
      const dayEvents = FLAT_EVENTS.filter((ev) => ev.dayKey === day.dayKey)
      const dayHasLive = dayEvents.some((ev) => now.value >= ev.start && now.value < ev.end)
      const dayIsFullyPast = dayEvents.every((ev) => now.value >= ev.end)
      const dayIsToday = day.dayKey === dateKey(now.value)
      return { ...day, dayHasLive, dayIsFullyPast, dayIsToday }
    }),
  )

  const selectedDay = computed(() => days.value.find((d) => d.dayKey === selectedDayKey.value))

  const selectedDayEvents = computed(() => {
    if (!selectedDay.value) return []
    return FLAT_EVENTS.filter((ev) => ev.dayKey === selectedDay.value.dayKey).map((ev) => {
      let status = 'upcoming'
      if (now.value >= ev.end) status = 'past'
      else if (now.value >= ev.start) status = 'live'
      return { ...ev, status }
    })
  })

  return {
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
    CAMP_END,
  }
}
