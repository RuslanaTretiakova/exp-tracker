import { defineStore } from 'pinia'
import type { ParsedData } from '../../types/types'

export const useExperimentStore = defineStore('experiment', {
  state: () => ({
    parsed: {} as ParsedData,
    loading: false,
    error: '',
  }),

  actions: {
    setParsedData(data: ParsedData) {
      this.parsed = data
    },
    setLoading(value: boolean) {
      this.loading = value
    },
    setError(message: string) {
      this.error = message
    },
    reset() {
      this.parsed = {}
      this.loading = false
      this.error = ''
    },
  },
})
