<template>
  <div class="home">
    <BarChart></BarChart>
  </div>
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/Charts.vue'

export default {
  name: 'home',
  components: {
    BarChart
  }
}
</script>
