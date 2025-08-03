<template>
  <FileUpload
    mode="basic"
    name="csv"
    accept=".csv"
    chooseLabel="Upload CSV"
    customUpload
    :auto="true"
    @uploader="onUpload"
    :disabled="loading"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import FileUpload from 'primevue/fileupload'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'

import { handleFileUpload } from '../app/store/useCsvParser'
import { useExperimentStore } from '../app/store/experimentStore'

const toast = useToast()
const store = useExperimentStore()
const { error, loading } = storeToRefs(store)

watch(error, (val) => {
  if (val) {
    toast.add({
      severity: 'error',
      summary: 'Upload Error',
      detail: val,
      life: 3000,
    })
  }
})

function onUpload({ files }: FileUploadUploaderEvent) {
  const file = Array.isArray(files) ? files[0] : files
  if (file instanceof File) handleFileUpload(file)
}
</script>
