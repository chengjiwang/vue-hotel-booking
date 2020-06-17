<template>
  <div>
    <vue-snotify/>
    <div class="container-fluid room" v-if="room.imageUrl">
      <header class="row room-header">
        <div class="col-8 bg-cover room-bg"
          :style="{backgroundImage: `url(${room.imageUrl[0]})`}" />
        <div class="col-4">
          <div class="row d-flex flex-column h-100">
            <div class="bg-cover h-50" :style="{backgroundImage: `url(${room.imageUrl[1]})`}" />
            <div class="bg-cover h-50" :style="{backgroundImage: `url(${room.imageUrl[2]})`}" />
          </div>
        </div>
      </header>
    </div>
    <div class="container" v-if="room.name">
      <main class="row my-5">
        <div class="col-sm-12 col-lg-6 text-left">
          <h1 class="room-title mb-4">{{ room.name }}</h1>
          <ul class="list-unstyled descriptionShort">
            <li>房客人數限制 : {{ room.descriptionShort.GuestMin}} ~
              {{ room.descriptionShort.GuestMax}} 人</li>
            <li>床型 : {{ room.descriptionShort.Bed[0] }} </li>
            <li>衛浴數量 : {{ room.descriptionShort['Private-Bath'] }} 間</li>
            <li>房間大小 : {{ room.descriptionShort.Footage }} 平方公尺</li>
          </ul>
          <p class="description">{{ room.description }}</p>
          <section class="d-flex">
            <div class="col-7">
              <p class="check-status">Check In</p>
              <span class="check-time">
                {{ room.checkInAndOut.checkInEarly}} - {{ room.checkInAndOut.checkInLate}}
              </span>
            </div>
            <div class="col-5">
              <p class="check-status">Check Out</p>
              <span class="check-time"> {{ room.checkInAndOut.checkOut}} </span>
            </div>
          </section>
          <Amenity :amenities="room.amenities" />
        </div>
        <div class="col-sm-12 col-lg-6">
          <h2 class="text-left mb-4">預約時段</h2>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" class="reservation">
              <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="form-group">
                <label for="name" class="required">姓名</label>
                <input v-model="booking.name" id="name" type="text" class="form-control" placeholder="請輸入姓名">
                <small class="form-text text-danger text-left">{{ errors[0] }}</small>
              </ValidationProvider>
              <ValidationProvider name="電話" rules="required" v-slot="{ errors }" class="form-group">
                <label for="tel" class="required">電話</label>
                <input v-model="booking.tel" id="tel" type="number" class="form-control" placeholder="請輸入電話">
                <small class="form-text text-danger text-left">{{ errors[0] }}</small>
              </ValidationProvider>
              <ValidationProvider name="預約起迄日期" rules="required" v-slot="{ errors }" class="form-group">
                <label for="date">預約起迄日期</label>
                <VueHotelDatepicker
                  @reset="resetDate"
                  @confirm="updateDate"
                  :disabledDates="disabledDate"
                  :minDate="minDate"
                  :maxDate="maxDate"
                  format="YYYY-MM-DD"
                  mobile="mobile"
                  placeholder="選取預約日期"
                  v-model="booking.date"
                />
                <small class="form-text text-danger text-left">{{ errors[0] }}</small>
              </ValidationProvider>
              <div class="text-right">
                <button type="btn" class="btn btn-outline-secondary" @click.prevent="clearReservation">清除所有預約</button>
                <button type="submit" class="btn btn-primary ml-3">預約</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-outline-primary ml-3 mt-4">回首頁</button>
        </router-link>
      </main>
    </div>
  </div>
</template>

<script>
import Amenity from '@/components/Amenity.vue';
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker';
import { mapState } from 'vuex';

export default {
  name: 'Room',
  props: ['roomId'],
  components: {
    Amenity,
    VueHotelDatepicker,
  },
  data() {
    return {
      minDate: '',
      maxDate: '',
      booking: {
        name: '',
        tel: '',
        date: [],
      },
    };
  },
  created() {
    const vm = this;
    window.scrollTo(0, 0);
    vm.getRoom();
    vm.getMaxDate();
  },
  computed: {
    ...mapState(['room', 'disabledDate']),
  },
  methods: {
    getRoom() {
      this.$store.dispatch('getRoom', this.roomId);
    },
    getMaxDate() {
      const vm = this;
      vm.minDate = vm.moment().format('YYYY-MM-DD');
      vm.maxDate = vm.moment().add(90, 'days').format('YYYY-MM-DD');
    },
    updateDate(date) {
      const vm = this;
      const startDate = vm.moment(date.start);
      const endDate = vm.moment(date.end);
      const dates = [];
      while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
        dates.push(startDate.format('YYYY-MM-DD'));
        startDate.add(1, 'days');
      }
      vm.booking.date = dates;
    },
    resetDate() {
      this.booking.date = [];
    },
    onSubmit() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/room/${vm.roomId}`;
      vm.axios.post(url, vm.booking).then((res) => {
        if (res.data.success) {
          vm.$swal.fire({
            icon: 'success',
            title: '預約成功',
            confirmButtonText: '回首頁',
          }).then((result) => {
            if (result.value) {
              vm.$router.push({ name: 'Home' });
            }
          });
        }
      });
    },
    clearReservation() {
      this.$store.dispatch('clearReservation', { vm: this });
    },
  },
};
</script>
