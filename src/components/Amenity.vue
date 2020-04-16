<template>
  <section class="row amenity">
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Wi-Fi']}">
      <wifiIcon class="amenity-icon mr-3" />
      <div>Wi-Fi</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Television']}">
      <televisionIcon class="amenity-icon mr-3" />
      <div>電視</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Great-View']}">
      <viewIcon class="amenity-icon mr-3" />
      <div>漂亮的視野</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Breakfast']}">
      <breakfastIcon class="amenity-icon mr-3" />
      <div>早餐</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Air-Conditioner']}">
      <airIcon class="amenity-icon mr-3" />
      <div>空調</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Smoke-Free']}">
      <smokeIcon class="amenity-icon mr-3" />
      <div>禁止吸煙</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Mini-Bar']}">
      <barIcon class="amenity-icon mr-3" />
      <div>Mini Bar</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Refrigerator']}">
      <refrigeratorIcon class="amenity-icon mr-3" />
      <div>冰箱</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Child-Friendly']}">
      <childIcon class="amenity-icon mr-3" />
      <div>適合兒童</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Room-Service']}">
      <serviceIcon class="amenity-icon mr-3" />
      <div>Room Servicer</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Sofa']}">
      <sofaIcon class="amenity-icon mr-3" />
      <div>沙發</div>
    </div>
    <div class="col-6 col-md-4 d-flex my-3" :class="{'disable': !amenities['Pet-Friendly']}">
      <petIcon class="amenity-icon mr-3" />
      <div>寵物攜帶</div>
    </div>
  </section>
</template>

<script>
import wifiIcon from '@/assets/svg/amenity_wifi.svg';
import televisionIcon from '@/assets/svg/amenity_television.svg';
import viewIcon from '@/assets/svg/amenity_great_view.svg';
import breakfastIcon from '@/assets/svg/amenity_breakfast.svg';
import airIcon from '@/assets/svg/amenity_air_conditioner.svg';
import smokeIcon from '@/assets/svg/amenity_smoke.svg';
import barIcon from '@/assets/svg/amenity_mini_bar.svg';
import refrigeratorIcon from '@/assets/svg/amenity_refrigerator.svg';
import childIcon from '@/assets/svg/amenity_child_friendly.svg';
import serviceIcon from '@/assets/svg/amenity_room_service.svg';
import sofaIcon from '@/assets/svg/amenity_sofa.svg';
import petIcon from '@/assets/svg/amenity_pet_friendly.svg';

export default {
  name: 'Amenity',
  props: {
    amenities: {
      type: Object,
      required: true,
    },
  },
  components: {
    wifiIcon,
    televisionIcon,
    viewIcon,
    breakfastIcon,
    airIcon,
    smokeIcon,
    barIcon,
    refrigeratorIcon,
    childIcon,
    serviceIcon,
    sofaIcon,
    petIcon,
  },
};
</script>
