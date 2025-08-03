import type { ChartDataset, ChartData } from 'chart.js'
import { COLORS } from '../types/constants'

export function getColor(label: string): string {
  const hash = [...label].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return COLORS[hash % COLORS.length]
}

export function downsample(data: { step: number; value: number }[], max = 500) {
  const interval = Math.max(1, Math.floor(data.length / max))
  return data.filter((_, i) => i % interval === 0)
}

export function getChartData(
  metrics: Record<string, { step: number; value: number }[]>
): ChartData<'line'> {
  const datasets: ChartDataset<'line'>[] = Object.entries(metrics).map(([metricName, points]) => {
    const down = downsample(points)
    return {
      label: metricName,
      data: down.map((p) => ({ x: p.step, y: p.value })),
      borderColor: getColor(metricName),
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.7,
    }
  })

  return { labels: [], datasets }
}

export function getComparisonChartData(
  experiments: { id: string; metrics: Record<string, { step: number; value: number }[]> }[],
  metricName: string
): ChartData<'line'> {
  const datasets: ChartDataset<'line'>[] = []

  experiments.forEach(({ id, metrics }) => {
    const points = metrics[metricName]
    if (points) {
      const down = downsample(points)
      datasets.push({
        label: id,
        data: down.map((p) => ({ x: p.step, y: p.value })),
        borderColor: getColor(id),
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.7,
      })
    }
  })

  return { labels: [], datasets }
}

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 10,
        boxHeight: 10,
      },
    },
  },
  scales: {
    x: { type: 'linear', title: { display: true, text: 'Step' } },
    y: { title: { display: true, text: 'Value' } },
  },
}