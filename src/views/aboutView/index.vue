<template>
  <div>
    <iframe :src="'https://tailwindcss.com/docs/installation'" class="frame-iframe" ref="frameRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'
let person = {
  name: '艾薇儿',
  age: 18,
  friend: {
    name: '安妮·海瑟薇',
    age: '28'
  },
  hobbies: ['music', 'dance', 'movie']
}
const reactivePerson = reactive(person)
console.log('person', person)
console.log('reactivePerson', reactivePerson)
console.log(toRaw(reactivePerson) === person)

const updateInfo = () => {
  person.friend.name = '疯驴子'
  console.log('person', person)
  console.log('reactivePerson', reactivePerson)
}
</script>
