<template>
  <div class="timeline-wrapper">
    <ul ref="timeline" class="timeline">
      <li
        v-for="point in points"
        ref="points"
        :key="point.year"
        class="timeline-item"
        :class="{ 'is-active': year === point.year }"
        :style="{ 'padding-bottom': calculateDistanceToNext(point.year) + 'px' }"
      >
        <button role="button" class="tp-point" @click="setActivePoint($event, point.year)">
          <span class="tp-dot"></span>
          <span class="tp-year">{{ Math.abs(point.year) }} {{ getYearNotation(point.year) }}</span>
          <!-- <span class="tp-label">{{ point.label }}</span> -->
        </button>
      </li>
    </ul>

    <div class="timeline-line"></div>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'

export default {
  props: {
    points: {
      type: Array,
      default() {
        return []
      }
    },
    year: {
      type: Number,
      default: 0
    }
  },

  mounted() {
    this.scrollOptions = {
      container: this.$refs.timeline,
      easing: 'ease-in',
      offset: -70
    }
  },

  watch: {
    year: {
      handler(year) {
        this.activePointYear = year;

        this.scrollToPoint();
      },
      immediate: true
    }
  },

  methods: {
    calculateDistanceToNext(year) {
      const i = this.points.findIndex(p => p.year === year);
      const nextPoint = this.points[i + 1];

      if (!nextPoint)
        return 0;

      const difference = (nextPoint.year - year);
      const boundaries = { min: 20, max: 150 };

      if (difference < boundaries.min)
        return boundaries.min;
      else if (difference > boundaries.max)
        return boundaries.max;
      return difference;
    },

    getYearNotation(year) {
      return year < 0 ? 'BCE' : 'CE';
    },

    scrollToPoint() {
      // eslint-disable-next-line
      this.$nextTick(() => {
        this.$refs.points.forEach(point => {
          if (point.classList.contains('is-active') && point.scrollIntoView) {
            VueScrollTo.scrollTo(point, this.scrollOptions)
          }
        })
      })
    },

    setActivePoint(e, year) {
      e.currentTarget.blur();

      this.$emit('change', year);
    }
  }
}
</script>

<style lang="scss">
.timeline-wrapper {
  position: relative;
}
.timeline-line {
  position: absolute;
  left: 20px;
  top: 10px;
  height: calc(100% - 20px);
  width: 1px;
  border-left: 1px solid black;
  opacity: 0.3;
}
.timeline {
  position: relative;
  padding: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 100vh;
  overflow-y: auto;

  &-item {
    position: relative;

    &:not(:last-child) {
      padding-bottom: 40px;
    }
  }
}
.tp-point {
  cursor: pointer;
  background: none;
  border: 0;
  padding: 10px 0 10px 15px;
  display: flex;
  align-items: center;
  width: 100%;
  background: white;
  position: relative;
  z-index: 1;

  &:hover,
  &:focus {
    .tp-label {
      opacity: 1;
      visibility: visible;
    }
  }
}
.tp-dot {
  margin-right: 10px;
  display: block;
  width: 8px;
  height: 8px;
  border: 2px solid black;
  border-radius: 50%;
  transition: all 0.2s;

  .is-active & {
    background: lightblue;
  }
}
.tp-year {
  font-weight: 400;
  font-size: 13px;

  .is-active & {
    font-weight: 600;
  }
}
.tp-label {
  background: white;
  padding: 10px;
  left: 80px;
  position: fixed;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  border: 1px solid rgba(black, 0.3);
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  white-space: nowrap;
  transition: opacity 0.13s ease;
  box-shadow: 5px 2px 10px 5px rgba(black, 0.1);
}
</style>
