<template>
  <q-page class="flex flex-center page-padding">
    <!-- ROOMS -->
    <div
      style="width: 100%; position: relative; overflow: hidden"
      :style="`margin-inline: ${$q.screen.lt.md ? '1rem' : '4rem'};`"
      class="q-mt-lg"
    >
      <q-img src="../../../assets/svg/roomplan_bg.svg" />

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
          <RoomPlanDropdown :room="107" @status="handleStatus" />
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
          <RoomPlanDropdown :room="106" @status="handleStatus" />
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
          <RoomPlanDropdown :room="105" @status="handleStatus" />
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
          <RoomPlanDropdown :room="108" @status="handleStatus" />
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
          <RoomPlanDropdown :room="109" @status="handleStatus" />
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
          <RoomPlanDropdown :room="110" @status="handleStatus" />
        </q-btn-dropdown>
      </div>

      <!-- BOTTOM ROOMS -->
      <div
        style="position: absolute; left: 17.5%; top: 75%; width: 100%; height: 100%; display: flex"
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
          <RoomPlanDropdown :room="104" @status="handleStatus" />
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
          <RoomPlanDropdown :room="103" @status="handleStatus" />
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
          <RoomPlanDropdown :room="102" @status="handleStatus" />
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
          <RoomPlanDropdown :room="101" @status="handleStatus" />
        </q-btn-dropdown>
      </div>
    </div>

    <div class="flex full-width" style="gap: 16px; margin-top: 24px">
      <div v-for="(status, index) in roomStatus" :key="index" class="column" style="flex: 1 1 0%">
        <div
          v-for="statusItem in status"
          :key="statusItem.status"
          class="flex items-center justify-center"
          style="
            font-size: 14px;
            line-height: 16px;
            padding: 10px 0;
            flex: 1 1 0%;
            border: 1px solid #ccc;
            white-space: nowrap;
          "
          :style="`background-color: ${statusItem.bg_color}; color: ${statusItem.text_color};`"
        >
          {{ statusItem.status }} {{ index !== 3 ? `= ${statusItem.desc}` : '' }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import RoomPlanDropdown from 'src/components/RoomPlanDropdown.vue'
import { defineComponent } from 'vue'
import { roomStatus } from 'src/data/room-status.js'

export default defineComponent({
  name: 'RoomPlanPage',
  components: { RoomPlanDropdown },
  data() {
    return {
      api: new this.$Api('frontoffice'),
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
    this.fetchData()
  },
  methods: {
    handleStatus(data) {
      const index = this.roomData.findIndex((room) => room.room === data.room)

      if (index !== -1) {
        this.roomData.splice(index, 1, { ...data, room: data.room })
      } else {
        this.roomData.push({ ...data, room: data.room })
      }
    },
    fetchData() {
      let url = `floorplan`

      this.api.get(url, ({ status, data }) => {
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

.page-padding {
  padding: 1rem 0.5rem;
}
@media (min-width: 480px) {
  .page-padding {
    padding: 1rem 1rem;
  }
}
</style>
