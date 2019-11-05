<template>
  <ul class="timeline">
    <li
      class="timeline-item"
      :class="{ 'is-active': year === point.year }"
      v-for="point in points"
      :key="point.year"
    >
      <button role="button" class="tp-point" @click="setActivePoint(point.year)">
        <span class="tp-dot"></span>
        <span class="tp-year">{{ Math.abs(point.year) }} {{ getYearNotation(point.year) }}</span>
        <span class="tp-label">{{ point.label }}</span>
      </button>
    </li>
  </ul>
</template>

<script>
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

  watch: {
    year: {
      handler(year) {
        this.activePointYear = year;
      },
      immediate: true
    }
  },

  methods: {
    getYearNotation(year) {
      return year < 0 ? 'BCE' : 'CE';
    },

    setActivePoint(year) {
      this.$emit('change', year);
    }
  }
}
</script>

<style lang="scss">
.timeline {
  list-style: none;
  margin: 0;
  padding: 10px;
  max-height: calc(100vh - 20px);
  overflow-y: auto;

  &-item {
    position: relative;
    padding-bottom: 40px;

    &:not(:last-child):after {
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -5px;
      left: 5px;
      height: 40px;
      width: 1px;
      border-left: 1px solid black;
      opacity: 0.3;
    }
  }
}
.tp-point {
  cursor: pointer;
  background: none;
  border: 0;
  padding: 10px 10px 10px 0;
  display: flex;
  align-items: center;

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
