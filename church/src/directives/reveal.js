const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
      )
    : null

export const reveal = {
  mounted(el) {
    el.classList.add('reveal')
    observer ? observer.observe(el) : el.classList.add('is-revealed')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
