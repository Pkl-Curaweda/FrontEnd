<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <FOMenubar>
      <template #left>
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          :label="datePickerLabel"
          icon="o_event"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>
      </template>
    </FOMenubar>
    <div
      class="q-ml-xl q-mt-lg"
      style="display: flex; justify-content: center; align-items: center"
    >
      <!-- ROOMS -->
      <div style="width: 70%; position: relative; overflow: hidden">
        <q-img src="../../assets/svg/roomplan_bg.svg" />

        <!-- LEFT ROOMS -->
        <div
          style="
            position: absolute;
            left: 3.5%;
            top: 31%;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          "
        >
          <q-btn-dropdown
            class="room-box"
            style="
              width: 15%;
              height: 12.7%;
              border-bottom-style: solid;
              border-right-style: solid;
              border-top-style: solid;
              border-left-style: solid;
            "
            label="107"
            :style="`background-color: ${roomData[6].bg_color}; color: ${roomData[6].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 15%;
              height: 12.7%;
              border-bottom-style: solid;
              border-right-style: solid;
              border-left-style: solid;
            "
            label="106"
            :style="`background-color: ${roomData[5].bg_color}; color: ${roomData[5].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 15%;
              height: 12.7%;
              border-bottom-style: solid;
              border-right-style: solid;
              border-left-style: solid;
            "
            label="105"
            :style="`background-color: ${roomData[4].bg_color}; color: ${roomData[4].text_color}`"
          >
          </q-btn-dropdown>
        </div>

        <!-- TOP ROOMS -->
        <div
          style="position: absolute; left: 17.7%; top: 6%; width: 100%; height: 100%; display: flex"
        >
          <q-btn-dropdown
            class="room-box"
            style="
              width: 21%;
              height: 18%;
              border-bottom-style: solid;
              border-right-style: solid;
              border-left-style: solid;
              border-top-style: solid;
            "
            label="108"
            :style="`background-color: ${roomData[7].bg_color}; color: ${roomData[7].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 21%;
              height: 18%;
              border-bottom-style: solid;
              border-right-style: solid;
              border-top-style: solid;
            "
            label="109"
            :style="`background-color: ${roomData[8].bg_color}; color: ${roomData[8].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 21%;
              height: 18%;
              border-bottom-style: solid;
              border-right-style: solid;
              border-top-style: solid;
            "
            label="110"
            :style="`background-color: ${roomData[9].bg_color}; color: ${roomData[9].text_color}`"
          >
          </q-btn-dropdown>
        </div>

        <!-- BOTTOM ROOMS -->
        <div
          style="
            position: absolute;
            left: 17.5%;
            top: 75%;
            width: 100%;
            height: 100%;
            display: flex;
          "
        >
          <q-btn-dropdown
            class="room-box"
            style="
              width: 12.9%;
              height: 19.3%;
              border-top-style: solid;
              border-right-style: solid;
              border-bottom-style: solid;
            "
          ></q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 12.9%;
              height: 19.3%;
              border-top-style: solid;
              border-right-style: solid;
              border-bottom-style: solid;
            "
            label="104"
            :style="`background-color: ${roomData[3].bg_color}; color: ${roomData[3].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 12.9%;
              height: 19.3%;
              border-top-style: solid;
              border-right-style: solid;
              border-bottom-style: solid;
            "
            label="103"
            :style="`background-color: ${roomData[2].bg_color}; color: ${roomData[2].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 12.9%;
              height: 19.3%;
              border-top-style: solid;
              border-right-style: solid;
              border-bottom-style: solid;
            "
            label="102"
            :style="`background-color: ${roomData[1].bg_color}; color: ${roomData[1].text_color}`"
          >
          </q-btn-dropdown>
          <q-btn-dropdown
            class="room-box"
            style="
              width: 12.9%;
              height: 19.3%;
              border-top-style: solid;
              border-right-style: solid;
              border-bottom-style: solid;
            "
            label="101"
            :style="`background-color: ${roomData[0].bg_color}; color: ${roomData[0].text_color}`"
          >
          </q-btn-dropdown>
        </div>
      </div>

      <div>
        <template v-for="(group, i) in subGroupingArray(statuses, 3)" :key="i">
          <q-separator vertical size="13px" v-if="i != 0" />
          <div style="margin: 0 100px">
            <p
              v-for="(status, j) in group"
              :key="j"
              class="q-mb-none q-py-sm q-px-xl text-center"
              :style="`background-color: #${status.rowColor}; color: #${status.textColor}`"
            >
              {{ status.shortDescription }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { roomStatus } from 'src/data/room-status.js'
import { defineComponent, ref } from 'vue'
import { subGroupingArray } from 'src/utils/arrays'
import FOMenubar from 'src/components/FOMenubar.vue'

const datePicker = ref({ from: '', to: '' })

const floor = ref('Floor 1'),
  floorOptions = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4']

const statuses = [
  {
    shortDescription: 'VC',
    longDescription: 'Vacant Clean',
    rowColor: 'ffffff',
    textColor: '000000'
  },
  {
    shortDescription: 'VD',
    longDescription: 'Vacant Dirty',
    rowColor: '10780a',
    textColor: 'ffffff'
  },
  {
    shortDescription: 'VCU',
    longDescription: 'Vacant Clean Unchecked',
    rowColor: '02feff',
    textColor: '000000'
  },
  {
    shortDescription: 'OC',
    longDescription: 'Occupied Clean',
    rowColor: 'ffffff',
    textColor: '2196f3'
  },
  {
    shortDescription: 'OD',
    longDescription: 'Occupied Dirty',
    rowColor: '0000f1',
    textColor: 'ffffff'
  },
  {
    shortDescription: 'ED',
    longDescription: 'Expected Departure',
    rowColor: 'fffc06',
    textColor: 'f44336'
  },
  {
    shortDescription: 'DnD',
    longDescription: 'Do not Disturb',
    rowColor: '850179',
    textColor: 'ffffff'
  },
  {
    shortDescription: 'OO',
    longDescription: 'Out of Order',
    rowColor: '000000',
    textColor: 'f44336'
  },
  {
    shortDescription: 'OM',
    longDescription: 'Out of Market',
    rowColor: '000000',
    textColor: 'f44336'
  },
  {
    shortDescription: 'VIP',
    longDescription: '',
    rowColor: 'ffffff',
    textColor: 'f44336'
  },
  {
    shortDescription: 'INCOGNITO',
    longDescription: '',
    rowColor: 'f10000',
    textColor: 'ffffff'
  }
]

export default defineComponent({
  name: 'RoomPlanPage',
  components: { FOMenubar },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      datePicker,
      datePickerLabel: ref('TDate - FDate'),
      floor,
      statuses,
      subGroupingArray,
      floorOptions,
      roomStatus,
      roomData: [
        { room: 101, status: '', bg_color: '', text_color: '' },
        { room: 102, status: '', bg_color: '', text_color: '' },
        { room: 103, status: '', bg_color: '', text_color: '' },
        { room: 104, status: '', bg_color: '', text_color: '' },
        { room: 105, status: '', bg_color: '', text_color: '' },
        { room: 106, status: '', bg_color: '', text_color: '' },
        { room: 107, status: '', bg_color: '', text_color: '' },
        { room: 108, status: '', bg_color: '', text_color: '' },
        { room: 109, status: '', bg_color: '', text_color: '' },
        { room: 110, status: '', bg_color: '', text_color: '' }
      ]
    }
  },
  mounted() {
    this.backgroundRoom()
  },
  watch: {
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.datePickerLabel = 'TDate - FDate'
        if(newDateRange){
          function formatDateRange() {
            const options = { day: 'numeric', month: 'long' };
            const fromDate = new Date(newDateRange?.from);
            const toDate = new Date(newDateRange?.to);
            const formattedFromDate = fromDate.toLocaleDateString('en-US', options);
            const formattedToDate = toDate.toLocaleDateString('en-US', options);
            return `${formattedFromDate} - ${formattedToDate}`;
          }
          this.datePickerLabel = formatDateRange()
        }
        this.backgroundRoom()
      }
    }
  },
  methods: {
    backgroundRoom() {
      this.loading = true

      let url = `floorplan?`

      const fromDate = this.datePicker != null ? this.datePicker.from.replace(/\//g, '-') : ''
      const toDate = this.datePicker != null ? this.datePicker.to.replace(/\//g, '-') : ''

      if (fromDate !== '' && toDate !== '') {
        url += `&date=${fromDate}+${toDate}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.formatData(data)
        }
      })
    },
    formatData(raw = []) {
      const defaultList = {
        101: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        102: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        103: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        104: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        105: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        106: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        107: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        108: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        109: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
        110: {
          bg_color: "#f7f7f7",
          text_color: "#808080"
        },
      }
      raw.forEach(fp => {
        defaultList[fp.id].bg_color = fp.roomStatus.rowColor,
        defaultList[fp.id].text_color = fp.roomStatus.textColor
      })

      this.roomData = Object.values(defaultList)
    },
    handleStatus(data) {
      const index = this.roomData.findIndex((room) => room.room === data.room)

      if (index !== -1) {
        this.roomData.splice(index, 1, { ...data, room: data.room })
      } else {
        this.roomData.push({ ...data, room: data.room })
      }
    }
  }
})
</script>

<style>
.room-box {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  font-weight: bold;
  border-width: 0.4vw;
  border-color: black;
  border-top-style: none;
  border-bottom-style: none;
  border-left-style: none;
  border-right-style: none;
}

.room-box .q-icon {
  display: none;
}
</style>
