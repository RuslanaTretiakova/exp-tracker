import Papa from 'papaparse'
import { useExperimentStore } from './experimentStore'
import type { ExperimentMetricRow, ParsedData } from '../../types/types'
import { CHUNK_SIZE, REQUIRED_HEADERS } from '../../types/constants'

function isValidRow(row: ExperimentMetricRow): boolean {
  const experiment_id = row.experiment_id?.trim()
  const metric_name = row.metric_name?.trim()
  const step = Number(row.step)
  const value = Number(row.value)

  return Boolean(experiment_id && metric_name && !isNaN(step) && !isNaN(value))
}

function groupRowData(row: ExperimentMetricRow, grouped: ParsedData) {
  const experiment_id = row.experiment_id!.trim()
  const metric_name = row.metric_name!.trim()
  const step = Number(row.step)
  const value = Number(row.value)

  grouped[experiment_id] ??= {}
  grouped[experiment_id][metric_name] ??= []
  grouped[experiment_id][metric_name].push({ step, value })
}

export function handleFileUpload(file: File): void {
  const store = useExperimentStore()
  store.reset()

  if (!file || !file.name.endsWith('.csv')) {
    store.setError('Invalid file format. Please upload a CSV file.')
    return
  }

  const groupedData: ParsedData = {}
  let headersValidated = false

  Papa.parse<ExperimentMetricRow>(file, {
    header: true,
    skipEmptyLines: true,
    worker: true,
    chunkSize: CHUNK_SIZE,

    chunk: function handleChunk({ data, meta }, parser) {
      if (!headersValidated) {
        const missing = REQUIRED_HEADERS.filter((h) => !meta.fields?.includes(h))
        if (missing.length > 0) {
          store.setError(`CSV missing required columns: ${missing.join(', ')}`)
          parser.abort()
          return
        }
        headersValidated = true
      }

      data.forEach((row) => {
        if (isValidRow(row)) {
          groupRowData(row, groupedData)
        }
      })
    },

    complete: function handleComplete() {
      if (!Object.keys(groupedData).length) {
        store.setError('CSV is empty or has no valid data.')
        return
      }

      store.setParsedData(groupedData)
    },

    error: function handleError(error) {
      store.setError(`CSV parse error: ${error.message}`)
    },
  })
}
