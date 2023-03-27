<template>
  <div class="card">
    <div>
      <el-button @click="initData">Refresh</el-button>
    </div>
    <section>
      <h3>metrics.jvm.title</h3>
      <el-row :gutter="30" v-if="!updatingMetrics">
        <el-col :span="8">
          <h4>Memory</h4>
          <div>
            <div v-for="(entry, key) of metrics.jvm" :key="key">
              <span v-if="entry.max !== -1">
                <span>{{ key }}</span
                >({{ formatNumber1(entry.used / 1048576) }}M / {{ formatNumber1(entry.max / 1048576) }}M)
              </span>
              <span v-else>
                <span>{{ key }}</span> {{ formatNumber1(entry.used / 1048576) }}M
              </span>
              <div>Committed : {{ formatNumber1(entry.committed / 1048576) }}M</div>
              {{ entry.used }}-- {{ formatNumber1((entry.used * 100) / entry.max) }}
              <el-progress
                v-if="entry.max !== -1"
                :text-inside="true"
                :stroke-width="16"
                :percentage="Number(formatNumber1((entry.used * 100) / entry.max))"
                status="success"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <h4>Threads</h4>
          <span>
            Runnable
            {{ threadStats.threadDumpRunnable }}
          </span>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            stroke-linecap="square"
            :percentage="Number(formatNumber1((threadStats.threadDumpRunnable * 100) / threadStats.threadDumpAll))"
            status="success"
          />
          <span>Timed Waiting ({{ threadStats.threadDumpTimedWaiting }})</span>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            stroke-linecap="square"
            :percentage="Number(formatNumber1((threadStats.threadDumpTimedWaiting * 100) / threadStats.threadDumpAll))"
            status="success"
          />
          <span>Waiting ({{ threadStats.threadDumpWaiting }})</span>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            stroke-linecap="square"
            :percentage="Number(formatNumber1((threadStats.threadDumpWaiting * 100) / threadStats.threadDumpAll))"
            status="success"
          />
          <span>Blocked ({{ threadStats.threadDumpBlocked }})</span>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            stroke-linecap="square"
            :percentage="Number(formatNumber1((threadStats.threadDumpBlocked * 100) / threadStats.threadDumpAll))"
            status="success"
          />
          <span
            >Total: {{ threadStats.threadDumpAll }}
            (view btn)
          </span>
        </el-col>
        <el-col :span="8">
          <h4>System</h4>
          <div class="flex fbetween">
            <div class="label">Uptime</div>
            <div class="text-right">{{ metrics.processMetrics['process.uptime'] }}</div>
          </div>
          <div class="flex fbetween">
            <div class="label">Start time</div>
            <div class="text-right">{{ metrics.processMetrics['process.start.time'] }}</div>
          </div>
          <div class="flex fbetween">
            <div class="label">Process CPU usage</div>
            <div class="text-right">{{ formatNumber2(100 * metrics.processMetrics['process.cpu.usage']) }} %</div>
          </div>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            stroke-linecap="square"
            :percentage="Number(formatNumber1(100 * metrics.processMetrics['process.cpu.usage']))"
            status="success"
          />
          <div class="flex fbetween">
            <div class="label">System CPU usage</div>
            <div class="text-right">{{ formatNumber2(100 * metrics.processMetrics['system.cpu.usage']) }} %</div>
          </div>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            stroke-linecap="square"
            :percentage="Number(formatNumber1(100 * metrics.processMetrics['system.cpu.usage']))"
            status="success"
          />
          <div class="flex fbetween">
            <div class="label">System CPU count</div>
            <div class="text-right">{{ metrics.processMetrics['system.cpu.count'] }}</div>
          </div>
          <!--  -->
          <div class="flex fbetween">
            <div class="label">System 1m Load average</div>
            <div class="text-right">{{ formatNumber2(metrics.processMetrics['system.load.average.1m']) }}</div>
          </div>
          <div class="flex fbetween">
            <div class="label">Process files max</div>
            <div class="text-right">{{ formatNumber1(metrics.processMetrics['process.files.max']) }}</div>
          </div>
          <div class="flex fbetween">
            <div class="label">Process files open</div>
            <div class="text-right">{{ formatNumber1(metrics.processMetrics['process.files.open']) }}</div>
          </div>
        </el-col>
      </el-row>
    </section>
    <section>
      <h3>Garbage collections</h3>
      <el-row :gutter="30" v-if="!updatingMetrics">
        <el-col :span="8">
          <div>
            <span>
              GC Live Data Size/GC Max Data Size ({{ formatNumber1(metrics.garbageCollector['jvm.gc.live.data.size'] / 1048576) }}M /
              {{ formatNumber1(metrics.garbageCollector['jvm.gc.max.data.size'] / 1048576) }}M)
            </span>
            <el-progress
              :text-inside="true"
              :stroke-width="16"
              stroke-linecap="square"
              :percentage="
                Number(
                  formatNumber2(
                    (100 * metrics.garbageCollector['jvm.gc.live.data.size']) / metrics.garbageCollector['jvm.gc.max.data.size']
                  )
                )
              "
              status="success"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>
              GC Memory Promoted/GC Memory Allocated ({{ formatNumber1(metrics.garbageCollector['jvm.gc.memory.promoted'] / 1048576) }}M /
              {{ formatNumber1(metrics.garbageCollector['jvm.gc.memory.allocated'] / 1048576) }}M)
            </span>
            <el-progress
              :text-inside="true"
              :stroke-width="16"
              stroke-linecap="square"
              :percentage="
                Number(
                  formatNumber2(
                    (100 * metrics.garbageCollector['jvm.gc.memory.promoted']) / metrics.garbageCollector['jvm.gc.memory.allocated']
                  )
                )
              "
              status="success"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :md="18">Classes loaded</el-col>
            <el-col :md="6">{{ metrics.garbageCollector.classesLoaded }}</el-col>
          </el-row>
          <el-row>
            <el-col :md="18">Classes unloaded</el-col>
            <el-col :md="6">{{ metrics.garbageCollector.classesUnloaded }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-table :data="jvm_gc_pause" row-key="jvm_gc_pause">
        <el-table-column label="">
          <span>jvm.gc.pause</span>
        </el-table-column>
        <el-table-column label="Count" min-width="50" prop="count" />
        <el-table-column label="Mean" min-width="50" prop="mean">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['mean'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Min" min-width="50" prop="0.0">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['0.0'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="p50" min-width="50" prop="0.5">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['0.5'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="p75" min-width="50" prop="0.75">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['0.75'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="p95" min-width="50" prop="0.95">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['0.95'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="p99" min-width="50" prop="0.99">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['0.99'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Count" min-width="Max" prop="max">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['max'])) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section>
      <h3>HTTP requests (time in millisecond)</h3>
      <el-table :data="http_server_requests.data" row-key="jvm_gc_pause">
        <el-table-column label="code" min-width="50" prop="code" />
        <el-table-column label="count" min-width="50" prop="count">
          <template #default="{ row }">
            <span>{{ formatNumber2(Number(row['count'])) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="mean" min-width="50" prop="mean" />
        <el-table-column label="max" min-width="50" prop="max" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import numeral from 'numeral'
import { featchJhimetrics, featchThreaddump } from '@/api/admin/metrics'
import type { ThreadsItemModel } from '@/api/admin/model/metricsModel'
import { reactive, ref, unref } from 'vue'
import { isDef, isEmpty } from '@/utils/is'

const metrics = ref()
const jvm_gc_pause = ref<any>([])
const http_server_requests = reactive({
  count: 0,
  data: []
})
const threadData = ref<any>([])
const threadStats = reactive({
  threadDumpRunnable: 0,
  threadDumpWaiting: 0,
  threadDumpTimedWaiting: 0,
  threadDumpBlocked: 0,
  threadDumpAll: 0
})
const updatingMetrics = ref(true)

const initData = async () => {
  const jhiRes = await featchJhimetrics()
  const ThrRes = await featchThreaddump()
  metrics.value = jhiRes
  jvm_gc_pause.value = [metrics.value.garbageCollector['jvm.gc.pause']]
  threadData.value = ThrRes.threads

  countThread(unref(threadData))
  filtHttpRequest(jhiRes['http.server.requests'])
  console.log(jhiRes)
  console.log(ThrRes)

  updatingMetrics.value = false
}

initData()

const countThread = (threadData: any) => {
  threadData.forEach((value: ThreadsItemModel) => {
    if (value.threadState === 'RUNNABLE') {
      threadStats.threadDumpRunnable += 1
    } else if (value.threadState === 'WAITING') {
      threadStats.threadDumpWaiting += 1
    } else if (value.threadState === 'TIMED_WAITING') {
      threadStats.threadDumpTimedWaiting += 1
    } else if (value.threadState === 'BLOCKED') {
      threadStats.threadDumpBlocked += 1
    }
  })
  threadStats.threadDumpAll =
    threadStats.threadDumpRunnable + threadStats.threadDumpWaiting + threadStats.threadDumpTimedWaiting + threadStats.threadDumpBlocked
}

const filtHttpRequest = (val: any) => {
  if (isDef(val) && !isEmpty(val)) {
    console.log(val)

    // http_server_requests.count = val.all.count
  }
}

const formatNumber1 = (value: any) => {
  return numeral(value).format('0,0')
}

const formatNumber2 = (value: any) => {
  return numeral(value).format('0,00')
}
</script>

<style></style>
