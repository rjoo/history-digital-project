<template>
  <div id="app">
    <aside class="timeline-container">
      <the-timeline
        :year="activeYear"
        :points="timelinePoints"
        @change="year => activeYear = year">
      </the-timeline>
    </aside>

    <nav class="nav">
      <ul>
        <li><a href="#" @click.prevent="activeContentComponent = 'ContentAbout'">Introduction</a></li>
        <li><a href="#" @click.prevent="activeContentComponent = 'ContentResources'">Resources</a></li>
      </ul>
    </nav>

    <main class="main">
      <the-map
        :map="activeYearMapData"
      >
      </the-map>
      <div class="main-label">{{ activeYearLabel }}</div>
      <div class="desc-panel">
        <div class="desc-panel-nav">
          <button role="button" @click="prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </button>
          <button role="button" @click="next">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </button>
        </div>
        <the-description
          class="desc"
          :markdown-key="mdKey"
        ></the-description>
      </div>
    </main>

    <transition name="fade">
      <div v-if="activeContentComponent" class="full-page-content">
        <component
          class="content-wrapper"
          :is="activeContentComponent"
        >
          <button v-if="!isIntro" role="button" class="close" @click.prevent="activeContentComponent = ''"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>

          <button v-else @click.prevent="activeContentComponent = ''; isIntro = false">Start Timeline</button>
        </component>
      </div>
    </transition>
  </div>
</template>

<script>
import ContentAbout from '@/components/ContentAbout'
import ContentResources from '@/components/ContentResources'
import TheDescription from '@/components/TheDescription'
import TheMap from '@/components/TheMap'
import TheTimeline from '@/components/TheTimeline'
import mapData from '@/map-data.json'

export default {
  name: 'app',
  components: {
    ContentAbout,
    ContentResources,
    TheDescription,
    TheMap,
    TheTimeline
  },

  data() {
    return {
      activeContentComponent: 'ContentAbout',
      activeYear: null,
      activeYearLabel: '',
      activeYearMapData: {},
      isIntro: true,
      mdKey: '',
      timelinePoints: mapData.map(({ year, label }) => ({ year, label }))
    }
  },

  mounted() {
    this.activeYear = mapData[0].year
  },

  watch: {
    activeYear() {
      const data = mapData.find(d => d.year === this.activeYear)
      if (!data) {
        this.activeYearMapData = {}
        this.mdKey = ''
        return
      }

      this.activeYearLabel = data.label
      this.activeYearMapData = data.map
      this.mdKey = data.mdKey || (data.year + 'ce');
    },
  },

  methods: {
    next() {
      let idx = mapData.findIndex(d => d.year === this.activeYear) + 1;

      if (idx === mapData.length) {
        idx = 0;
      }

      this.activeYear = mapData[idx].year;
    },
    prev() {
      let idx = mapData.findIndex(d => d.year === this.activeYear) - 1;

      if (idx < 0) {
        idx = mapData.length - 1;
      }

      this.activeYear = mapData[idx].year;
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  color: #1c1c1c;
}

button {
  padding: 10px;
  background: burlywood;
  // border: 1px solid #1c1c1c;
  border: 0;
  cursor: pointer;
  font-weight: 600;
  color: darken(burlywood, 50%);
  transition: background-color 0.3s ease;

  &:hover {
    background: lighten(burlywood, 20%);
  }
}

.full-page-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // padding: 40px;
  z-index: 5;
  background: rgba(black, 0.9);

  .close {
    border: 0;
    background: none;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    svg {
      width: 60px;
      height: 60px;
    }
  }

  .content-wrapper {
    position: relative;
    box-shadow: 3px 5px 10px 5px rgba(black, 0.2);
    padding: 40px;
    background: white;
    max-width: 600px;
    margin: 80px auto 0;
  }
}

.nav {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 10px;

  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 0 14px;
  }

  li a {
    font-weight: 600;
    font-size: 14px;
  }
}

a {
  color: #7d5b0c;
  font-weight: 400;
  text-decoration: none;
}

.main {
  position: relative;
}

.main-label {
  position: absolute;
  top: 5px;
  left: 10px;
  font-weight: 600;
  font-size: 28px;
}

.timeline-container {
  width: 120px;
  position: relative;
  z-index: 1;
}

.desc-panel {
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 45px;
  background: white;
  padding: 20px;
  min-width: 350px;
  min-height: 10%;
  max-width: 30%;
  box-shadow: 3px 5px 10px 5px rgba(black, 0.1);
}

.desc {
  overflow-y: auto;
  max-height: 300px;

  h1 {
    font-size: 26px;
    margin: 10px 0;
  }
}

.desc-panel-nav {
  position: absolute;
  right: 40px;
  top: 20px;
  text-align: right;

  button {
    padding: 2px 5px;
    margin: 0 1px;

    svg {
      fill: #1c1c1c;
      width: 30px;
      height: 30px;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
