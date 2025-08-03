import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useSplitterLayout() {
  const splitterLayout = ref<'horizontal' | 'vertical'>('horizontal')

  const updateLayout = () => {
    splitterLayout.value = window.innerWidth < 768 ? 'vertical' : 'horizontal'
  }

  onMounted(() => {
    updateLayout()
    window.addEventListener('resize', updateLayout)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateLayout)
  })

  return { splitterLayout }
}
