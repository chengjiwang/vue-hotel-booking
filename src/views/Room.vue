<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="container-fluid room">
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
      <main class="row mt-5">
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
        <div class="col-lg-6">date</div>
      </main>
    </div>
  </div>
</template>

<script>
import Amenity from '@/components/Amenity.vue';

export default {
  name: 'Room',
  components: {
    Amenity,
  },
  data() {
    return {
      isLoading: false,
      roomId: '',
      room: {
        amenities: {},
        descriptionShort: {
          Bed: [],
        },
        checkInAndOut: {},
        imageUrl: [],
      },
    };
  },
  created() {
    console.log(this.$route.params.roomId);
    this.roomId = this.$route.params.roomId;
    this.getRoom();
  },
  methods: {
    getRoom() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/room/${vm.roomId}`;
      vm.axios.get(url).then((res) => {
        console.log(res.data);
        vm.room = res.data.room[0];
        vm.isLoading = false;
      });
    },
  },
};
</script>
