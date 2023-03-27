export interface JhimetricsModel {
  jvm: any
  databases: any
  'http.server.requests': any
  cache: any
  garbageCollector: any
  services: any
  processMetrics: any
}

interface StackTraceItemModel {
  classLoaderName: null
  moduleName: string
  moduleVersion: string
  methodName: string
  fileName: string
  lineNumber: number
  className: string
  nativeMethod: boolean
}
export interface ThreadsItemModel {
  blockedCount: number
  blockedTime: number
  daemon: boolean
  inNative: boolean
  lockInfo: null
  lockName: null
  lockOwnerId: number
  lockOwnerName: null
  lockedMonitors: any[]
  lockedSynchronizers: any[]
  priority: number
  stackTrace: StackTraceItemModel[]
  suspended: boolean
  threadId: number
  threadName: string
  threadState: string
  waitedCount: number
  waitedTime: number
}
