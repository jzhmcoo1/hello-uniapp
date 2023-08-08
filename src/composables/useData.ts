import { ref, provide, inject } from 'vue'

const provideKey = Symbol('provide')

export const useDataProvider = () => {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--

  provide(provideKey, { count, increment, decrement })
  return { count, increment, decrement }
}

export const useDataInject = () => {
  const data = inject<ReturnType<typeof useDataProvider>>(provideKey)
  if (!data) {
    throw new Error('No provide found')
  }
  return data
}