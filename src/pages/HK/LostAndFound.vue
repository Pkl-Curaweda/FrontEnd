<template>
  <q-page class="column q-py-lg q-px-lg" style="row-gap: 40px">
    <!-- Top Side -->
    <div
      class="flex"
      style="column-gap: 24px; width: 100%"
      :style="$q.screen.lt.md ? 'flex-direction: column' : ''"
    >
      <!-- Pie Chart (Desktop) -->
      <div style="display: flex; justify-content: center; align-items: center">
        <apexchart
          type="donut"
          ref="hkChartDesktop"
          width="400"
          v-if="showChart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

      <!-- Found & Lost -->
      <div
        class="flex"
        style="flex: 1 1 0%; gap: 24px; flex-wrap: nowrap"
        :style="$q.screen.lt.sm ? 'flex-direction: column;' : ''"
      >
        <HKCard
          card_class="column items-center justify-end q-py-xl relative"
          card_style="height: 20rem; flex: 1 1 0%; flex-wrap: nowrap;"
          radius="10px"
        >
          <p style="font-size: 7.5rem; line-height: 6.5rem">{{ found || 0 }}</p>
          <p style="font-size: 1.5rem; margin: 0; font-weight: bold">Found</p>

          <div
            class="absolute"
            style="
              top: 16px;
              left: 16px;
              background-color: #069550;
              border-radius: 50%;
              color: white;
              padding: 8px;
            "
          >
            <q-icon name="o_check_circle" size="24px" />
          </div>
        </HKCard>
        <HKCard
          card_class="column items-center justify-end q-py-xl relative"
          card_style="height: 20rem; flex: 1 1 0%; flex-wrap: nowrap;"
          radius="10px"
        >
          <p style="font-size: 7.5rem; line-height: 6.5rem">{{ lost || 0 }}</p>
          <p style="font-size: 1.5rem; margin: 0; font-weight: bold">Lost</p>

          <div
            class="absolute"
            style="
              top: 16px;
              left: 16px;
              background-color: #069550;
              border-radius: 50%;
              color: white;
              padding: 8px;
            "
          >
            <q-icon name="o_cancel" size="24px" />
          </div>
        </HKCard>
      </div>
    </div>

    <!-- Table -->
    <div style="width: 100%" class="lostFoundTable">
      <!-- Filtering -->
      <div class="flex q-mb-sm justify-between" style="gap: 16px">
        <div class="flex" style="gap: 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Sorting :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize text-black rounded-borders"
              :label="filterDisplayLabel"
              color="primary"
              dropdown-icon="o_expand_more"
            >
              <q-list>
                <q-item clickable v-close-popup @click="setFilterDisplay('roomNum', 'Room Number')">
                  <q-item-section>Room Number</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('pic', 'PIC')">
                  <q-item-section>PIC</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('reported', 'Reported By')"
                >
                  <q-item-section>Reported By</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('date', 'By Date')">
                  <q-item-section>By Date</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Date :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize date-btn text-black rounded-borders"
              :label="datePickerArrival"
              icon="o_event"
              color="primary"
              dropdown-icon="o_expand_more"
            >
              <div>
                <q-date v-model="datePickerArrival" color="green" today-btn />
              </div>
            </q-btn-dropdown>
          </div>
        </div>

        <div>
          <q-input
            outlined
            dense
            v-model="searchInput"
            class="input-border"
            label="Item Description"
            style="width: fit-content"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        square
        :table-header-style="{
          backgroundColor: '#069550',
          color: '#ffffff',
          padding: '10px'
        }"
        :card-style="{ boxShadow: 'none' }"
        rows-per-page-label="Show"
        :rows-per-page-options="[1, 3, 5, 7, 10, 15, 20, 25, 30]"
        :dense="$q.screen.lt.md"
        v-model:pagination="pagination"
        @request="onPaginationChange"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="date">
              {{ props.row.date }}
            </q-td>
            <q-td key="time">
              {{ props.row.time }}
            </q-td>
            <q-td key="room_no">
              {{ props.row.room_no }}
            </q-td>
            <q-td key="pic">
              {{ props.row.pic }}
            </q-td>
            <q-td key="item_desc">
              {{ props.row.item_desc }}
            </q-td>
            <q-td key="pickerName">
              {{ props.row.pickerName }}
            </q-td>
            <q-td key="pickerContact]">
              {{ props.row.pickerContact }}
            </q-td>
            <q-td key="pickerEmail">
              {{ props.row.pickerEmail }}
            </q-td>
            <q-td key="status">
              {{ props.row.status }}
            </q-td>
            <q-td key="reported_date">
              {{ props.row.reported_date }}
            </q-td>
            <q-td key="location">
              {{ props.row.location }}
            </q-td>
            <q-td key="image">
              <!-- View IMG BTN -->
              <q-btn
                @click="openViewImageDialog(props.row)"
                flat
                no-caps
                dense
                style="border-radius: 4px; border: 1px solid #d9d9d9"
              >
                <div class="flex" style="flex-wrap: nowrap; gap: 4px; padding: 0 4px">
                  <q-icon name="o_image" color="primary" />
                  <span style="color: black">View</span>
                </div>
              </q-btn>
            </q-td>
            <q-td key="action" style="width: 10px; gap: 10px">
              <div style="display: flex; gap: 10px">
                <q-btn auto-close flat round icon="more_vert">
                  <q-menu>
                    <q-list>
                      <q-item
                        clickable
                        @click="lostItem(props.row)"
                        v-if="props.row.status != 'LOST'"
                      >
                        <q-btn flat rounded size="13px" color="primary">
                          <q-icon name="close" />
                        </q-btn>
                        <q-item-section>
                          <q-item-label>Lost</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        @click="openFoundDialog(props.row)"
                        v-if="props.row.status != 'FOUND'"
                      >
                        <q-btn flat rounded size="13px" color="primary">
                          <q-icon name="done" />
                        </q-btn>
                        <q-item-section>
                          <q-item-label>Found</q-item-label>
                          <q-dialog v-model="foundItem" full-width>
                            <q-card>
                              <q-card-section class="row items-center q-pb-none">
                                <div class="text-h6">Item Found</div>
                                <q-space />
                                <div class="text-h6 q-mx-md">Item Description</div>
                                <q-btn
                                  icon="close"
                                  flat
                                  round
                                  dense
                                  v-close-popup
                                  @click="clearFieldRole"
                                />
                              </q-card-section>

                              <q-card-section
                                style="display: flex; gap: 10px; width: 100%"
                                class="col-grow"
                              >
                                <div>
                                  <q-file
                                    dense
                                    outlined
                                    clearable
                                    :placeholder="img"
                                    v-model="img"
                                    bg-color="primary"
                                    style="width: 250px"
                                    label-color="white"
                                    :label="labelFile"
                                    class="ellipsis"
                                    type="file"
                                    @update:model-value="handleUpload()"
                                  />
                                  <q-img
                                    class="q-mt-sm"
                                    :src="imgUrl"
                                    v-if="imgUrl"
                                    :ratio="13 / 17"
                                  />
                                  <div
                                    class="q-mt-md"
                                    v-else
                                    style="background-color: gray; height: 315px"
                                  ></div>
                                  <q-btn
                                    class="text-capitalize q-mt-md full-width"
                                    color="primary"
                                    @click="sendFound"
                                    >Submit</q-btn
                                  >
                                </div>
                                <div class="full-width">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="pickerName"
                                    label="Picker Name"
                                    class="col-grow text-bold"
                                  />
                                  <q-input
                                    dense
                                    outlined
                                    v-model="email"
                                    label="Email"
                                    class="col-grow text-bold q-mt-md"
                                  />
                                  <div class="q-mt-md" style="display: flex; gap: 10px">
                                    <q-input
                                      dense
                                      outlined
                                      type="number"
                                      v-model="contactNumber"
                                      label="Phone Number"
                                      class="col-grow text-bold"
                                    />
                                    <q-select
                                      outlined
                                      dense
                                      v-model="gender"
                                      :options="optionsGender"
                                      label="Gender"
                                      class="col-grow"
                                    />
                                  </div>
                                  <q-file
                                    dense
                                    outlined
                                    clearable
                                    :placeholder="imgKtp"
                                    v-model="imgKtp"
                                    bg-color="primary"
                                    label-color="white"
                                    :label="labelKtp"
                                    class="ellipsis q-mt-md"
                                    type="file"
                                    @update:model-value="handleUploadKtp()"
                                  />
                                  <q-img
                                    class="q-mt-sm full-width"
                                    :ratio="19 / 6"
                                    :src="imgUrlKtp"
                                    v-if="imgUrlKtp"
                                  />
                                  <div
                                    class="q-mt-md full-width"
                                    v-else
                                    style="background-color: gray; height: 200px"
                                  ></div>
                                </div>
                                <div style="width: 600px">
                                  <q-img class="full-width" style="height: 250px" :src="imgItem" />
                                  <q-input
                                    dense
                                    outlined
                                    v-model="foundIn"
                                    label="Found In"
                                    readonly
                                    class="col-grow text-bold q-mt-md"
                                  />
                                  <q-input
                                    dense
                                    outlined
                                    v-model="foundLocation"
                                    readonly
                                    label="Found Location"
                                    class="col-grow text-bold q-mt-md"
                                  />
                                  <q-input
                                    dense
                                    outlined
                                    v-model="itemDesc"
                                    label="Item Description"
                                    readonly
                                    class="col-grow text-bold q-mt-md"
                                  />
                                </div>
                              </q-card-section>
                            </q-card>
                          </q-dialog>
                        </q-item-section>
                      </q-item>
                      <q-item clickable @click="deleteItem(props.row)">
                        <q-btn flat rounded size="13px" color="primary">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 10.59V4.5C16 2.29 12.42 0.5 8 0.5C3.58 0.5 0 2.29 0 4.5V14.5C0 16.71 3.59 18.5 8 18.5C8.46 18.5 8.9 18.5 9.33 18.44C9.1129 17.8162 9.00137 17.1605 9 16.5V16.45C8.68 16.5 8.35 16.5 8 16.5C4.13 16.5 2 15 2 14.5V12.27C3.61 13.05 5.72 13.5 8 13.5C8.65 13.5 9.27 13.46 9.88 13.39C10.4127 12.5085 11.1638 11.7794 12.0607 11.2731C12.9577 10.7668 13.9701 10.5005 15 10.5C15.34 10.5 15.67 10.54 16 10.59ZM14 9.95C12.7 10.9 10.42 11.5 8 11.5C5.58 11.5 3.3 10.9 2 9.95V7.14C3.47 7.97 5.61 8.5 8 8.5C10.39 8.5 12.53 7.97 14 7.14V9.95ZM8 6.5C4.13 6.5 2 5 2 4.5C2 4 4.13 2.5 8 2.5C11.87 2.5 14 4 14 4.5C14 5 11.87 6.5 8 6.5ZM19 15.5V17.5H11V15.5H19Z"
                              fill="#269861"
                            />
                          </svg>
                        </q-btn>
                        <q-item-section>
                          <q-item-label>Delete</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!-- Modal View Image -->
      <q-dialog v-model="viewImage">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <q-carousel animated v-model="slide" arrows infinite>
              <q-carousel-slide
                :name="item.label"
                v-for="(item, index) of listOfImages"
                :key="index"
                :img-src="item.data"
              >
                <div class="absolute-bottom custom-caption">
                  <div class="text-h2">{{ item.label }}</div>
                </div>
              </q-carousel-slide>
              <!-- <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
              <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
              <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" /> -->
            </q-carousel>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <q-dialog v-model="foundDialog">
      <q-card class="q-pa-md" style="min-width: 700px">
        <q-bar class="bg-white text-grey rounded-borders q-pa-xs">
          <div class="cursor-pointer non-selectable q-px-md">Create New User</div>
          <q-space />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div class="row items-center q-mt-sm" style="gap: 42px">
            <div class="text-caption text-weight-bold">Upload File</div>
            <q-file
              dense
              outlined
              :placeholder="img"
              v-model="img"
              label-color="white"
              label="Choose File"
              style="width: 150px"
              class="ellipsis"
              type="file"
              @update:model-value="handleUpload()"
            >
              <template v-slot:append> <q-icon name="o_file_upload" color="white" /></template>
            </q-file>
            <q-img :src="imgURL" v-if="imgURL" />
          </div>
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
              <q-input
                type="text"
                v-model="inputName"
                dense
                outlined
                style="width: 50%"
                placeholder="Kontak"
              />

              <q-select
                outlined
                v-model="selectDivisi"
                :options="DivisiOpt"
                dense
                style="width: 50%"
                :label="'Divisi'"
                dropdown-icon="expand_more"
              />
            </div>
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
              <q-input
                type="email"
                v-model="inputEmail"
                dense
                outlined
                style="width: 50%"
                placeholder="Email"
              />
              <div style="width: 100%; gap: 5px; display: flex" class="col">
                <q-select
                  outlined
                  v-model="selectJabatan"
                  :options="JabatanOpt"
                  dense
                  style="width: 100%"
                  :label="'Jabatan'"
                  dropdown-icon="expand_more"
                />
                <q-select
                  outlined
                  v-model="selectGender"
                  :options="genderOpt"
                  dense
                  style="width: 100%"
                  :label="'Gender'"
                  dropdown-icon="expand_more"
                />
              </div>
            </div>
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
              <q-input
                v-model="password"
                label="password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
              <q-input
                v-model="confirmpassword"
                label="Confirm Password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
            </div>
          </div>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn
              dense
              color="primary"
              @click="postAddUser()"
              no-caps
              style="border-radius: 8px"
              class="q-px-xl"
              >Create</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'time',
    label: 'Time',
    field: 'time',
    align: 'left',
    sortable: true
  },
  {
    name: 'roomNo',
    label: 'Room No.',
    field: 'room_no',
    align: 'left',
    sortable: true
  },
  {
    name: 'pic',
    label: 'PIC',
    field: 'pic',
    align: 'left',
    sortable: true
  },
  {
    name: 'itemDesc',
    label: 'Item Description',
    field: 'item_desc',
    sortable: true,
    align: 'left'
  },
  {
    name: 'pickerName',
    label: 'Picker Name',
    field: 'pickerName',
    sortable: true,
    align: 'left'
  },
  {
    name: 'pickerContactNum',
    label: 'Picker Contact Number',
    field: 'pickerContact',
    sortable: true,
    align: 'left'
  },
  {
    name: 'pickerEmail',
    label: 'Picker Email',
    field: 'pickerEmail',
    sortable: true,
    align: 'left'
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    sortable: true,
    align: 'left'
  },
  {
    name: 'reportedDate',
    label: 'Reported Date',
    field: 'reported_date',
    sortable: true,
    align: 'left'
  },
  {
    name: 'location',
    label: 'Location',
    field: 'location',
    sortable: true,
    align: 'left'
  },
  {
    name: 'image',
    label: 'Image',
    field: 'image',
    align: 'center'
  },
  {
    name: 'action',
    label: 'Action',
    field: 'action',
    align: 'center'
  }
]
const chartOptions = {
  dataLabels: {
    enabled: false
  },

  colors: ['#364E30', '#8BAA84'],
  labels: ['Lost', 'Found'],
  legend: {
    offsetY: 55,
    fontSize: '20px',
    fontWeight: 400,
    markers: {
      width: '20px',
      height: '20px',
      offsetX: -5
    },
    itemMargin: {
      horizontal: 0,
      vertical: 10
    }
  },
  responsive: [
    {
      breakpoint: 1180,
      options: {
        legend: {
          position: 'bottom',
          offsetY: 0,
          fontSize: '16px',
          fontWeight: 400,
          markers: {
            width: '20px',
            height: '20px',
            offsetX: -5
          },
          itemMargin: {
            horizontal: 10
          }
        }
      }
    }
  ]
}
// foundItem(props.row)
const rows = ref([])
export default defineComponent({
  name: 'LostAndFoundPage',
  components: {
    HKCard
  },
  setup() {
    return {
      slide: ref(),
      foundIn: ref(),
      foundLocation: ref(),
      itemDesc: ref(),
      imgItem: ref(),
      img: ref(null),
      imgUrl: ref(''),
      labelFile: ref('Upload Image'),
      labelKtp: ref('Upload KTP'),
      imgKtp: ref(null),
      imgUrlKtp: ref(''),
      showChart: ref(true),
      pickerName: ref(),
      email: ref(),
      contactNumber: ref(),
      optionsGender: ['MALE', 'FEMALE'],
      gender: ref(),
      foundItem: ref(false),
      filterDisplay: ref('roomNum'),
      filterDisplayLabel: ref('Room Number'),
      sortingModel: ref('Room Number'),
      sortingOptions: ['Room Number', 'Reservation Number', 'Room Type', 'Guest Name'],
      searchInput: ref(''),
      found: ref(),
      lost: ref(),
      rows,
      viewImage: ref(false),
      datePickerArrival: ref('Date'),
      formattedArrivalDate: ref(),
      columns,
      seriesEntry: ref([]),
      listOfImages: ref([])
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      chartOptions,
      // rows: [],
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      currentShownItemId: 0,
      startUp: true,
      series: this.seriesEntry
    }
  },
  mounted() {
    this.fetchData()
  },
  watch() {
    searchName(this.searchInput)
  },
  watch: {
    datePickerArrival: {
      deep: true,
      handler(newDate, oldDate) {
        console.log(newDate, oldDate)
        if (oldDate && newDate != oldDate) this.fetchData()
      }
    },
    filterDisplay(newOption) {
      // Update the label based on the selected option
      this.updateFilterDisplayLabel(newOption)
    },
    searchInput: {
      deep: true,
      handler(newSearchInput) {
        this.searchName(newSearchInput)
      },
      immediate: true
    },
    foundItem: {
      handler(value) {
        this.clearForm()
      }
    },
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    }
  },
  methods: {
    clearForm() {
      const listOfModels = [
        'pickerName',
        'email',
        'contactNumber',
        'img',
        'gender',
        'imgKtp',
        'imgUrl',
        'imgUrlKtp'
      ]
      for (let model of listOfModels) {
        this[model] = null
      }
      this.labelFile = 'Upload Image'
      this.labelKtp = 'Upload KTP'
    },
    validateInput(modelValue, message, required) {
      if (required) if (!modelValue) throw Error(message)
    },
    clearInput() {
      const listOfModels = []
      for (let model of listOfModels) {
        this[model] = null
      }
    },
    openViewImageDialog(rowData) {
      this.viewImage = true
      let listImages = []
      if (rowData.image) listImages.push({ label: 'Item Image', data: rowData.image })
      if (rowData.pickerImage) listImages.push({ label: 'Picker Image', data: rowData.pickerImage })
      if (rowData.ktpImage) listImages.push({ label: 'KTP Image', data: rowData.ktpImage })
      this.listOfImages = listImages
      this.slide = listImages[0].label
      console.log(this.listOfImages)
    },
    openFoundDialog(rowData) {
      this.foundItem = true
      this.currentShownItemId = rowData.id
      ;(this['imgItem'] = rowData.image),
        (this['foundIn'] = rowData.room_no),
        (this['foundLocation'] = rowData.location),
        (this['itemDesc'] = rowData.item_desc)
    },
    sendFound() {
      try {
        this.validateInput(this.pickerName, 'Picker Name must be filled', true)
        this.validateInput(this.email, 'Picker Email must be filled', true)
        this.validateInput(this.contactNumber, 'Picker Contact Number must be filled', true)
        this.validateInput(this.gender, 'Gender must be specified', true)
        this.validateInput(this.img, 'Picker Image must be included', true)
        this.validateInput(this.imgKtp, 'Picker KTP Image must be included', true)

        const sendedData = {
          pickerName: this.pickerName,
          pickerEmail: this.email,
          pickerContact: this.contactNumber,
          pickerGender: this.gender,
          pickerImage: this.img,
          ktpImage: this.imgKtp
        }
        this.api
          .useMultipart(true)
          .post(`lostfound/${this.currentShownItemId}/FOUND`, sendedData, ({ status, data }) => {
            if (status != 200) throw Error(data.message)
            this.clearInput()
            this.fetchData()
            this.trigger('positive', 'Data Updated Successfully')
            this.foundItem = false
          })
      } catch (err) {
        return this.trigger('negative', err.message)
      }
    },
    handleUpload() {
      if (this.img) {
        this.imgUrl = URL.createObjectURL(this.img)
        this.labelFile = 'Recapture'
      }
    },
    handleUploadKtp() {
      if (this.imgKtp) {
        this.imgUrlKtp = URL.createObjectURL(this.imgKtp)
        this.labelKtp = 'Recapture'
      }
    },
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'roomNum':
          this.filterDisplayLabel = 'Room Number'
          break
        case 'pic':
          this.filterDisplayLabel = 'PIC'
          break
        case 'reported':
          this.filterDisplayLabel = 'Reported By'
          break
        case 'date':
          this.filterDisplayLabel = 'By Date'
          break
        default:
          this.filterDisplay = 'roomNum'
      }
    },
    date(date) {
      this.datePickerArrival = date.replace(/\//g, '-')

      this.fetchData()
      this.searchName()
    },
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.fetchData()
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    searchName(searchInput) {
      this.searchData = searchInput
      this.fetchData()
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    },
    lostItem(row) {
      const rowId = row.id

      let url = `lostfound/${rowId}/LOST`

      this.api.post(url, null, ({ status, message }) => {
        if (status == 200) {
          this.trigger('positive', message)
          this.fetchData()
        }
      })
    },
    // foundItem(row) {
    //   const rowId = row.id

    //   let url = `lostfound/${rowId}/FOUND`

    //   this.api.post(url, null, ({ status, message }) => {
    //     if (status == 200) {
    //       this.trigger('positive', message)
    //       this.fetchData()
    //     }
    //   })
    // },
    deleteItem(row) {
      const rowId = row.id

      let url = `lostfound/${rowId}/soft`

      this.api.delete(url, ({ status, message }) => {
        if (status == 200) {
          console.log(message)
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    fetchData() {
      this.loading = true
      if (this.startUp != false) {
        this.startUp = false
        this.fetchData()
      }

      let url = `lostfound?page=${this.pagination.page}&perPage=${
        this.pagination.rowsPerPage
      }&search=${this.searchData ? this.searchData : ''}`
      if (this.filterDisplay !== null) url += `&sortOrder=${this.filterDisplay}`

      // if (this.datePickerArrival !== undefined && this.datePickerArrival !== 'Date') {
      //   const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      //   url += `&searchDate=${DateArrival}`
      // }
      const Date = this.datePickerArrival?.replace(/\//g, '-')
      if (Date !== undefined && Date !== 'Date') {
        url += `&searchDate=${Date}`
      } else {
        this.datePickerArrival = 'Date'
      }
      if (this.filterDisplay == null) {
        url += `&sortOrder=${this.filterDisplay}`
      }
      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          const { graph, lostFounds } = data // Ambil objek graph dari respons
          // this.formatData(lostFounds)
          this.found = graph.found // Isi nilai found50
          this.lost = graph.lost // Isi nilai lost
          if (this.found === 0 && this.lost === 0) this.showChart = false
          this.series = [graph.lost, graph.found]
          this.$refs.hkChartDesktop.updateSeries(this.series)

          const arrivalDate = data.searchDate // Gantilah 'arrival.arr' dengan properti yang benar
          if (!this.datePickerArrival) {
            this.datePickerArrival = arrivalDate
          }
          this.rows = lostFounds.map((lostFound) => ({
            id: lostFound.id,
            date: lostFound.date,
            time: lostFound.time,
            room_no: lostFound.roomNo,
            pic: lostFound.pic,
            item_desc: lostFound.desc,
            pickerName: lostFound.pickerName,
            pickerContact: lostFound.pickerContact,
            pickerEmail: lostFound.pickerEmail,
            pickerImage: lostFound.pickerImage,
            ktpImage: lostFound.ktpImage,
            status: lostFound.status,
            reported_date: lostFound.reportedDate,
            location: lostFound.location,
            image: lostFound.image,
            action: ['edit', 'delete'],
            dialogActive: false
          }))
        }
      })
    }
    // formatData(raw = []) {
    //   const list = []

    //   raw.forEach((lostFound) => {
    //     list.push({
    //       date: lostFound.date,
    //       time: lostFound.time,
    //       room_no: lostFound.roomNo,
    //       pic: lostFound.pic,
    //       item_desc: lostFound.desc,
    //       reported_by: lostFound.reportedBy,
    //       phone_no: lostFound.phoneNumber,
    //       reported_date: lostFound.reportedDate,
    //       location: lostFound.location,
    //       image: lostFound.image,
    //       action: ['edit', 'delete'],
    //       dialogActive: false
    //     })
    //   })

    //   this.rows = list
    // }
  }
})
</script>

<style>
.lostFoundTable .q-table th {
  border-top-width: 0;
  border-right-width: 4px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}
.lostFoundTable .q-table tbody td {
  font-size: 14px;
  border-right: 4px solid white;
}
.lostFoundTable .q-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}
.lostFoundTable .q-table__bottom {
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  border-width: 2px;
  border-right-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-color: #069550;
  background: #fafafa;
}
.lostFoundTable .q-table__control:nth-child(2) {
  position: absolute;
}
.lostFoundTable .q-table__bottom .q-btn .q-icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #069550;
}
.lostFoundTable .disabled * {
  opacity: 0;
}

.input-border .q-field__control::before {
  border-color: #d9d9d9 !important;
}
.input-border .q-field__label {
  color: black;
}

@media (max-width: 600px) {
  .mobileChart div {
    max-height: 600px;
  }
  @media (max-width: 500px) {
    .mobileChart div {
      max-height: 500px;
    }
    @media (max-width: 400px) {
      .mobileChart div {
        max-height: 400px;
      }
    }
  }
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
