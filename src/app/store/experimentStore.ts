import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { ParsedData } from '../../types/types'

export const useExperimentStore = defineStore('experiment', {
  state: () => ({
    parsed: reactive({}) as ParsedData,
    loading: false,
    error: '',
    selectedIds: [] as string[],
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
    setSelectedIds(ids: string[]) {
      this.selectedIds = ids
    },
    reset() {
      this.parsed = {}
      this.loading = false
      this.error = ''
    },
  },
})
