<template>
  <GmapMap ref="mapRef"
    id="gmap"
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
    map-type-id="terrain"
  >
    <GmapMarker
      v-for="(marker, i) in markers"
      :key="marker.label + i"
      :icon="getMarkerIcon(marker)"
      :position="marker.position"
      :label="marker.label"
    />

    <span v-if="map.poly">
      <GmapPolygon
        v-for="poly in map.poly"
        :key="poly.name"
        :draggable="false"
        :editable="false"
        :options="{
          fillColor: poly.fill || 'red',
          strokeColor: 'transparent'
        }"
        :paths="getPolyPaths(poly.name)"
      >
      </GmapPolygon>
    </span>
  </GmapMap>
</template>

<script>
import styles from '@/map-styles.json'

export default {
  props: {
    map: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      zoom: 6,

      mapOptions: {
        styles,
        gestureHandling: 'none',
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        // zoomControlOptions: {
        //   position: window.google.maps.ControlPosition.RIGHT_TOP
        // }
      }
    };
  },

  watch: {
    map: {
      deep: true,
      handler(map) {
        if (map.center) {
          this.center = Object.assign({}, map.center)
          this.zoom = map.zoom
        }

        this.markers = map.markers ? map.markers.slice() : [];
      },
      immediate: true
    }
  },

  methods: {
    getMarkerIcon({ icon, labelOrigin = {} }) {
      // for now
      const urls = {
        arrowdown: 'https://res.cloudinary.com/rjoo/image/upload/v1573176539/down-arrow_1_ebqlsx.png',
        arrowleftdown: 'https://res.cloudinary.com/rjoo/image/upload/v1573176398/arrow-left-down_qfg52x.png',
        arrowleftup: 'https://res.cloudinary.com/rjoo/image/upload/v1573176351/arrow-left-up_lcwefj.png',
        capital: 'https://maps.google.com/mapfiles/kml/shapes/capital_big.png',
        circle: 'http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png',
        crown: 'https://res.cloudinary.com/rjoo/image/upload/v1573176268/crown_jwtuqr.png',
        swords: 'https://res.cloudinary.com/rjoo/image/upload/v1573176200/swords_ejuldh.png'
      }
      return icon && {
        url: urls[icon],
        scaledSize: { width: 22, height: 22 },
        labelOrigin: { x: labelOrigin.x || 11, y: labelOrigin.y || 30 }
      }
    },

    getPolyPaths(poly) {
      const data = require(`@/assets/poly-${poly}.json`)
      // /*eslint-disable-next-line*/
      // console.log(data)
      return data.coordinates[0].map(arr => {
        return {
          lng: arr[0],
          lat: arr[1]
        }
      })
    }
  }
}
</script>

<style lang="scss">
#gmap {
  width: calc(100vw - 120px);
  height: 100vh;
  margin-left: auto;
}
</style>