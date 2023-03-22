<template>
  <div class="hello">
    <div>姓名：{{ person.name }}</div>
    <div>年龄：{{ person.age }}</div>
    <div>朋友：{{ person.friend.name }}-{{ person.friend.age }}</div>
    <div v-for="(item, index) in person.hobbies" :key="index">
      爱好列表
      <div>{{ item }}</div>
    </div>
    {{ reactivePerson.friend.name }}
    <button @click="updateInfo">修改信息</button>
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
