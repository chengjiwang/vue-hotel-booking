<template>
  <div>
    <div class="card mb-5" @click="goRoom(room.id)">
      <div class="card-image" :style="{backgroundImage: `url(${room.imageUrl})`}" />
      <div class="card-body">
        <h2 class="card-name">{{ room.name }}</h2>
        <div class="justify-content-between card-price">
          <div class="normalday">
            <span class="normalday-price">NT.{{ room.normalDayPrice }}</span>
            <span class="normalday-unit">平日</span>
          </div>
          <div class="align-self-end card-holiday">
            NT.{{ room.holidayPrice }}假日
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomCard',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goRoom(id) {
      this.$router.push({ name: 'Room', params: { roomId: id } });
    },
  },
};
</script>
