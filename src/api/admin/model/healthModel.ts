// export type HealthProperty = 'db' | 'diskSpace' | 'livenessState' | 'ping' | 'readinessState'
export interface HealthInfo {
  status: string
  details?: any
}
export type HealthRecord = Record<string, HealthInfo>

export interface HealthComps {
  components: HealthRecord
}
