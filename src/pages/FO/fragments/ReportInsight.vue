<template>
  <div class="column q-pa-md" style="background: #fafafa">
    <div class="row" style="gap: 10px">
      <!--Display Option-->
      <q-btn-dropdown
        flat
        square
        style="border: 1px #00000030 solid"
        class="text-capitalize text-black rounded-borders"
        :label="displayOptionLabel"
        color="primary"
        dropdown-icon="o_expand_more"
      >
        <q-list>
          <q-item clickable v-close-popup @click="setFilterDisplay('day')">
            <q-item-section>Day</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="setFilterDisplay('week')">
            <q-item-section>Week</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="setFilterDisplay('month')">
            <q-item-section>Month</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="setFilterDisplay('year')">
            <q-item-section>Year</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <!-- date picker  -->
      <q-btn-dropdown
        flat
        square
        style="border: 1px #00000030 solid"
        class="text-capitalize date-btn text-black rounded-borders"
        :label="dateLabel"
        icon="o_event"
        color="primary"
        dropdown-icon="o_expand_more"
      >
        <div>
          <q-date v-model="datePicker" />
        </div>
      </q-btn-dropdown>
    </div>

    <div
      class="no-wrap q-my-lg"
      style="gap: 16px; display: flex; justify-content: center; align-items: center"
    >
      <apexchart
        type="donut"
        ref="demoChart"
        width="400"
        :options="chartOptions"
        :series="series"
        v-if="showChart"
      ></apexchart>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_diamond" />
          </div>
          <p class="text-h6 text-bold">ROOM SALES</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center q-pb-lg">{{ deluxeRoom || 0 }}</p>
          <p class="text-h6 text-bold">DELUXE ROOM</p>
        </div>
      </div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_bed" />
          </div>
          <p class="text-h6 text-bold">ROOM SALES</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center q-pb-lg">{{ standardRoom || 0 }}</p>
          <p class="text-h6 text-bold">STANDARD ROOM</p>
        </div>
      </div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_groups" />
          </div>
          <p class="text-h6 text-bold">ROOM SALES</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center q-pb-lg">{{ familyRoom || 0 }}</p>
          <p class="text-h6 text-bold">FAMILY ROOM</p>
        </div>
      </div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_trending_up" />
          </div>
          <p class="text-h6 text-bold">ROOM SALES</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center q-pb-lg">{{ roomRes || 0 }}</p>
          <p class="text-h6 text-bold">TOTAL</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ReportInsight',
  components: {},
  setup() {
    return {
      datePicker: ref(),
      displayOption: ref('day'),
      filterDisplay: ref('day'),
      dateLabel: ref('Date'),
      displayOptionLabel: ref('Day'),
      deluxeRoom: ref(),
      standardRoom: ref(),
      familyRoom: ref(),
      roomRes: ref(),
      showChart: false,
      seriesEntry: [],
      chart: {
        chart: {
          type: 'donut',
          height: 400,
          width: 400
        },
        responsive: [
          {
            breakpoint: 480
          }
        ],
        labels: [
          '101 - DLX - K',
          '102 - DLX - K',
          '103 - DLX - K',
          '104 - DLX - K',
          '105 - FML - T',
          '106 - FML - T',
          '107 - FML - T',
          '108 - STD - S',
          '109 - STD - S',
          '110 - STD - S'
        ],
        fill: {
          colors: [
            '#77CE7F',
            '#00FFE0',
            '#2B8DFF',
            '#688CD3',
            '#A468D3',
            '#FFE500',
            '#FFA800',
            '#FE0001',
            '#B9B9B9',
            '#000000'
          ]
        },
        legend: {
          position: 'left',
          markers: {
            fillColors: [
              '#77CE7F',
              '#00FFE0',
              '#2B8DFF',
              '#688CD3',
              '#A468D3',
              '#FFE500',
              '#FFA800',
              '#FE0001',
              '#B9B9B9',
              '#000000'
            ]
          }
        }
      }
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      data: [],
      startUp: true,
      series: this.seriesEntry,
      chartOptions: this.chart
    }
  },
  mounted() {
    this.getDetailReport()
  },
  watch: {
    filterDisplay: {
      handler(option) {
        this.displayOptionLabel = option
        this.getDetailReport()
      }
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.dateLabel = 'Date'
        const currentDisplay = this.filterDisplay
        if (newDateRange) {
          function formatDateRange() {
            let options
            switch (currentDisplay) {
              case 'month':
                options = { month: 'long' }
                break
              case 'year':
                options = { year: 'numeric' }
                break
              default:
                options = { day: 'numeric', month: 'long' }
                break
            }
            const fromDate = new Date(newDateRange)
            const formattedFromDate = fromDate.toLocaleDateString('en-US', options)
            return `${formattedFromDate}`
          }
          this.dateLabel = formatDateRange()
        }
        this.getDetailReport()
      }
    }
  },

  methods: {
    setFilterDisplay(option) {
      this.filterDisplay = option
      this.getDetailReport()
    },
    setDatePicker(option) {
      this.getDetailReport()
    },
    formatAverage(num) {
      return num.toFixed(1)
    },
    getDetailReport() {
      this.loading = true
      if (this.startUp != false) {
        this.startUp = false
        this.getDetailReport()
        this.startUp = true
      }

      //Handle Chart
      if (
        this.$refs.demoChart != null ||
        this.$refs.demoChart != undefined ||
        this.series.length > 1
      )
        this.showChart = true

      let url = `detail/report?`
      const Date = this.datePicker?.replace(/\//g, '-')
      if (Date !== undefined && Date !== '') {
        url += `&date=${Date}`
      }

      if (this.filterDisplay !== null) {
        url += `&disOpt=${this.filterDisplay}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          const { total, detail } = data
          this.deluxeRoom = total.DELUXE
          this.standardRoom = total.STANDARD
          this.familyRoom = total.FAMILY
          this.roomRes = total.RESERVATION

          this.formatData(detail)
        }
      })
    },
    formatData(raw = {}) {
      const seriesData = []

      Object.values(raw).forEach((room) => {
        seriesData.push(room.percent || 0)
      })
      this.seriesEntry = seriesData
      console.log(seriesData)
      if (seriesData.length > 0) {
        this.showChart = !seriesData.every((value) => value === 0)
      } else {
        this.showChart = false
      }
      this.$refs.demoChart.updateSeries(seriesData)
    }
  }
})
</script>
