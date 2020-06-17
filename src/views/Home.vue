<template>
  <div>
    <header v-if="rooms.length" class="container-fluid header-bg"
      :style="{backgroundImage: `url(${rooms[4].imageUrl})`}">
      <div class="header">
        <div class="header-title">
          <h1>SKY <br> Hotel</h1>
        </div>
        <div class="header-body mt-5">
          <div class="mr-5">
            <igIcon class="band-size mr-2" />
            <fbIcon class="band-size" />
          </div>
          <div class="d-flex flex-column">
            <div v-for="(icon, index) in icons" :key="icon.index">
              <div class="d-flex align-items-center">
                <component :is="icon.name" class="icon-size mr-3" />
                <div>{{ icon.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="container hotel-body">
      <div class="row">
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" class="col-md-6 col-xl-4 pr" />
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomCard from '@/components/RoomCard.vue';
import phoneIcon from '@/assets/svg/icon_phone.svg';
import mailIcon from '@/assets/svg/icon_mail.svg';
import homeIcon from '@/assets/svg/icon_home.svg';
import fbIcon from '@/assets/svg/brand_facebook.svg';
import igIcon from '@/assets/svg/brand_instagram.svg';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    RoomCard,
    phoneIcon,
    mailIcon,
    homeIcon,
    fbIcon,
    igIcon,
  },
  data() {
    return {
      icons: [
        {
          name: 'phoneIcon',
          value: '06-226937',
        },
        {
          name: 'mailIcon',
          value: 'skyhotel@skyhotel.com.tw',
        },
        {
          name: 'homeIcon',
          value: '台南市神農路六段8號',
        },
      ],
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.$store.dispatch('getAllRooms');
  },
  computed: {
    ...mapState(['rooms']),
  },
};
</script>
