<template>
  <q-page class="flex flex-center">
    <HKCard
      title="Amenities Availibility"
      radius="25px"
      card_class="full-width q-px-lg flex q-mt-xl"
    >
      <q-btn flat square color="primary" icon="o_print" @click="printAmenities" />
      <div class="justify-between row q-mb-sm" style="width: 100%">
        <!-- ==========Date=============== -->
        <div class="row" style="gap: 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">From Date :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize date-btn text-black rounded-borders"
              :label="datePickerArrival?.replace(/\//g, '-')"
              icon="o_event"
              color="primary"
              dropdown-icon="o_expand_more"
            >
              <div>
                <q-date v-model="datePickerArrival" color="green" today-btn />
              </div>
            </q-btn-dropdown>
          </div>

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">To Date :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize date-btn text-black rounded-borders"
              :label="datePickerDeparture?.replace(/\//g, '-')"
              icon="o_event"
              color="primary"
              dropdown-icon="o_expand_more"
            >
              <div>
                <q-date v-model="datePickerDeparture" color="green" today-btn />
              </div>
            </q-btn-dropdown>
          </div>
        </div>
        <!-- ====== -->
        <div class="row items-center" style="column-gap: 8px">
          <span style="font-size: 14px; font-weight: 500">Sorting :</span>
          <q-select
            outlined
            dense
            v-model="sortingModel"
            dropdown-icon="expand_more"
            :options="sortingOptions"
            style="width: 12rem"
            class="input-border"
            @input="onSortingChange"
          />
        </div>
      </div>
      <div
        :class="`tableComp ${gapColorClass}`"
        class="my-table"
        style="width: 100%"
        ref="pdfContainer"
      >
        <q-table
          :rows="tableRows"
          :columns="tableColumns"
          :rows-per-page-options="[0]"
          row-key="name"
          square
          :table-header-style="{
            backgroundColor: '#069550',
            color: '#ffffff',
            padding: '10px'
          }"
          hide-bottom
          :card-style="{ boxShadow: 'none' }"
          :dense="$q.screen.lt.md"
          :title="title"
        />
      </div>
    </HKCard>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'
import html2pdf from 'html2pdf.js'

const tableColumns = [
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'room_no',
    label: 'Room No',
    field: 'room_no',
    align: 'left',
    sortable: true
  },
  {
    name: 'used',
    label: 'Used',
    field: 'used',
    align: 'left',
    sortable: true
  },
  {
    name: 'remain',
    label: 'Remain',
    field: 'remain',
    align: 'left',
    sortable: true
  }
]

const tableRows = ref()

export default defineComponent({
  name: 'ExtrabedPage',
  components: { HKCard },
  setup() {
    return {
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref(),
      sortingModel: ref(),
      sortingOptions: ['Extra Bed', 'Pillow', 'Blanket'],
      tableColumns,
      latestArt: ref(110),
      tableRows
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    sortingModel: {
      deep: true,
      handler(newValue) {
        this.fetchData()
      }
    },
    datePickerArrival: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    datePickerDeparture: {
      deep: true,
      handler(newDate) {
        console.log(newDate)
        this.fetchData()
      }
    }
  },
  methods: {
    printAmenities() {
      const element = this.$refs.pdfContainer

      html2pdf(element, {
        margin: 10,
        filename: `Amenities - ${this.sortingModel} ${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
    },
    fetchData() {
      this.loading = true
      switch (this.sortingModel) {
        case 'Extra Bed':
          this.latestArt = 110
          break
        case 'Pillow':
          this.latestArt = 109
          break
        case 'Blanket':
          this.latestArt = 108
          break
        default:
          // Default to 'Extra Bed' if no match
          this.sortingModel = 'Extra  Bed'
          break
      }

      let url = `amenities/${this.latestArt}?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`


      const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      if (DateArrival !== undefined && DateArrival !== '') {
        url += `&from=${DateArrival}`
      }
      
      const DateDeparture = this.datePickerDeparture?.replace(/\//g, '-')
      if (DateDeparture !== undefined && DateDeparture !== '') {
        url += `&to=${DateDeparture}` // Ganti 'arrival' dengan 'departure'
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { extra } = data

          const arrivalDate = data.from // Gantilah 'arrival.arr' dengan properti yang benar
          if (this.datePickerArrival == null) {
            this.datePickerArrival = arrivalDate
          }

          const departureDate = data.to // Gantilah 'data.dep' dengan properti yang benar
          if (this.datePickerDeparture == null) {
            this.datePickerDeparture = departureDate
          }

          this.tableRows = extra.map((e) => ({
            date: e.date,
            room_no: e.roomNo,
            used: e.used,
            remain: e.remain
          }))
        }
      })
    }
  }
})
</script>
