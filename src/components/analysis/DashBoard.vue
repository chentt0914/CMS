<template>
  <div class="dashBoard">
    <Row :gutter="10" style="width: 100%">
      <Col span="7">
        <Card :bordered="false" class="card">
          <p slot="title">分类商品数量(饼图)</p>
          <div id="chart1"></div>
        </Card>
      </Col>

      <Col span="10">
        <Card :bordered="false" class="card">
          <p slot="title">不同城市商品销量</p>
          <div id="chart2"></div>
        </Card>
      </Col>

      <Col span="7">
        <Card :bordered="false" class="card">
          <p slot="title">分类商品数量(玫瑰图)</p>
          <div id="chart3"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  getGoodsCount,
  getGoodsAddressSale,
  getGoodsSale,
  getGoodsFavor,
} from '@/network/goods';
export default {
  data() {
    return {
      goodsCount: [],
      mapOption: {
        backgroundColor: '#030303',
        title: {
          text: '全国泵机销售情况',
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2];
          },
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 10,
          data: ['泵机数'],
          textStyle: {
            color: '#fff',
          },
        },
        visualMap: {
          min: 0,
          max: 200,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)',
            ],
          },
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'china',
          roam: 'scale',
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: 'rgb(19, 91, 153)',
              borderColor: 'rgb(9, 54, 95)',
            },
            emphasis: {
              areaColor: 'rgb(10, 105, 187)',
            },
          },
        },
        series: [
          {
            name: '泵机数',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 12,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1,
              },
            },
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false,
            },
          },
        ],
        // dataset: {source: mapdata}
      },
      mapData: [],
    };
  },
  computed: {
    // goodsCount() {
    //   return this.$store.state.goodsCount;
    // },
  },
  created() {
    this.getGoodsCount();
    this.getGoodsAddressSale();
    this.getGoodsSale();
    this.getGoodsFavor();
  },
  methods: {
    getGoodsCount() {
      getGoodsCount().then((res) => {
        console.log(res.data.data);
        this.goodsCount = res.data.data;
        this.goodsCount.forEach((item) => {
          item.value = item.goodsCount;
        });
        this.$nextTick(() => {
          this.pieFunction();
          this.rosePieFunction();
        });
      });
    },
    getGoodsAddressSale() {
      getGoodsAddressSale().then((res) => {
        this.mapData = res.data.data.map((item) => {
          return {
            name: item.address,
            value: item.count,
          };
        });
        console.log(this.mapData);
        this.$nextTick(() => {
          this.mapFunction();
        });
      });
    },
    getGoodsSale() {
      getGoodsSale().then((res) => {
        console.log(res);
      });
    },
    getGoodsFavor() {
      getGoodsFavor().then((res) => {
        console.log(res);
      });
    },

    pieFunction() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chart1'));
      myChart.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
        },
        series: [
          {
            name: '销量',
            type: 'pie',
            radius: '50%',
            data: this.goodsCount,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    },
    mapFunction() {
      var geoCoordMap = {
        广州: [113.23, 23.16],
        佛山: [113.167, 22.828],
        中山: [113.38, 22.52],
        深圳: [114.07, 22.62],
        东莞: [113.736, 23.047],
        无锡: [120.288, 31.574],
        湖州: [120.096, 30.864],
        昆山: [120.976, 31.32],
        扬州: [119.427, 32.386],
        苏州: [120.612, 31.309],
        淮安: [119.136, 33.499],
        淮安: [119.136, 33.499],

        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58],
      };

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chart2'));
      myChart.setOption({
        backgroundColor: '#030303',
        title: {
          text: '全国泵机销售情况',
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'item',
          // formatter: function (params) {
          //   return params.name + ' : ' + params.value[2];
          // },
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 10,
          data: ['泵机数'],
          textStyle: {
            color: '#fff',
          },
        },
        visualMap: {
          min: 0,
          max: 200,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)',
            ],
          },
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'china',
          roam: 'scale',
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: 'rgb(19, 91, 153)',
              borderColor: 'rgb(9, 54, 95)',
            },
            emphasis: {
              areaColor: 'rgb(10, 105, 187)',
            },
          },
        },
        series: [
          {
            name: '泵机数',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(this.mapData),
            symbolSize: 12,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1,
              },
            },
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false,
            },
          },
        ],
        // dataset: {source: mapdata}
      });
    },

    rosePieFunction() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chart3'));
      myChart.setOption({
        legend: {
          top: 'top',
        },

        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [10, 75],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 6,
            },
            data: this.goodsCount,
          },
        ],
      });
    },
  },
  mounted() {
    this.rosePieFunction();
    // this.mapFunction();
  },
};
</script>

<style lang="less" scoped>
.dashBoard {
  width: 100%;
  padding: 20px;
  display: flex;
  height: 100%;
}
#chart2 {
  flex: 2;
  height: 300px;
  // height: 100%;
}
#chart1,
#chart3 {
  flex: 1;
  // height: 100%;
  // width: 340px;
  height: 300px;
}
</style>
