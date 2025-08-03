export interface ExperimentMetricRow {
  experiment_id: string
  metric_name: string
  step: string
  value: string
}

export type ParsedData = {
  [experimentId: string]: {
    [metricName: string]: MetricPoint[]
  }
}

export type MetricPoint = {
  step: number
  value: number
}

export interface MetricGroup {
  [metric_name: string]: MetricPoint[]
}
