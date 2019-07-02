<template>
  <div class="hello">
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
    <button @click="saveData">保存数据</button>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  data () {
    return {
      orgOptions: {
        color: ['#3398DB'],
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [1,2,3,4,5,6,7,8,9,10],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数值',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.get_data()
    this.refresh_data()
  },
  methods: {
    get_data () {
      this.$http.get('http://127.0.0.1:8000/chart_data/get_data/').then(res => {
        this.orgOptions.series[0].data = JSON.parse(res.data.data)
        console.log(this.orgOptions)
      }).catch(error => {
        console.log(error)
      })
    },
    refresh_data () {
      this.timeSet = setInterval(() => {
        this.get_data()
      }, 10000)
    },
    saveData () {
      clearInterval(this.timeSet)
      this.$http.post('http://127.0.0.1:8000/chart_data/history_data/', {
        data: JSON.stringify(this.orgOptions.series[0].data)
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timeSet)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .hello {
    width: 500px;
    margin: 0 auto;
  }

</style>
