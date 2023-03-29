<template>
  <div id="swagger-ui"></div>
</template>

<script setup lang="ts">
import 'swagger-ui-dist/swagger-ui.css'
// @ts-ignore
import swaggerUi from 'swagger-ui-dist/swagger-ui-bundle.js'
import { formatToken, getToken } from '@/utils/http/auth'
import { onMounted } from 'vue'

const setupSwaggerUI = () => {
  swaggerUi({
    url: 'http://localhost:8080/v3/api-docs',
    dom_id: '#swagger-ui',
    requestInterceptor: (request: { headers: { Authorization: string } }) => {
      // Add an Authorization header to the request
      request.headers.Authorization = formatToken(getToken())
      return request
    }
  })
}

onMounted(setupSwaggerUI)
</script>
<style scoped>
#swagger-ui {
  background-color: #fff;
  margin-top: -40px;
}
</style>
