<template>
  <div>
    <div class="">
      <h2>Search and add a pin</h2>
      <GmapAutocomplete
        @place_changed='setPlace'
      />
    </div>
    <button
        @click='addMarker'
      >
        Add
      </button>
    <br />
    <GmapMap :center="center" :zoom="12" style="width:100%; height: 400px;" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: -0.802988, lng: 100.672698 },
      currentPlace: null,
      markers: [],
      places: [],
    };
  },

  mounted() {
    this.geolocate();
  },
  methods: {
      addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
      setPlace(place) {
      this.currentPlace = place;
    },
    geolocate: function() {
      {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
