type healthProperty = 'db' | 'diskSpace' | 'livenessState' | 'ping' | 'readinessState'
interface healthInfo {
  status: string
  details?: object
}

export type healthRecord = Record<healthProperty, healthInfo>
