<template>
  <div class="home">
    历史数据显示
    <div class="hello">
      <chart ref="chart2" :options="orgOptions" :auto-resize="true"></chart>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LineChart',
    data () {
      return {
        orgOptions: {
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true
          }]
        }
      }
    },
    mounted () {
      this.get_data()
    },
    methods: {
      get_data () {
        this.$http.get('http://127.0.0.1:8000/chart_data/history_data/').then(res => {
          let x_data = []
          let y_data = []
          res.data.map((value, key, arr) => {
            x_data.push(value.created_at)
            y_data.push(parseInt(value.data))
          })
          this.orgOptions.xAxis.data = x_data
          this.orgOptions.series[0].data = y_data
        }).catch(error => {
          console.log(error)
        })
      }
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
