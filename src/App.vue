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

      <div v-if="activeImages.length" class="images">
        <ul class="images-list">
          <li
            class="images-listitem"
            v-for="img in activeImages"
            :key="img.src">
            <a
              class="image-link"
              href="javascript:void(0)"
              :style="{ 'backgroundImage': `url('/images/${img.src}')` }"
              @click="setActiveImage(img)"
            >
              <div class="on-hover">
                View larger
              </div>
            </a>
          </li>
        </ul>
      </div>
    </main>

    <transition name="fade">
      <div v-if="activeContentComponent" class="page-modal">
        <component
          class="content-wrapper"
          :is="activeContentComponent"
          :img="activeImage"
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
import ContentImage from '@/components/ContentImage'
import ContentResources from '@/components/ContentResources'
import TheDescription from '@/components/TheDescription'
import TheMap from '@/components/TheMap'
import TheTimeline from '@/components/TheTimeline'
import mapData from '@/map-data.json'
import imageLib from '@/image-library.json'

export default {
  name: 'app',
  components: {
    ContentAbout,
    ContentImage,
    ContentResources,
    TheDescription,
    TheMap,
    TheTimeline
  },

  data() {
    return {
      activeContentComponent: 'ContentAbout',
      activeImage: null,
      activeImages: [],
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

      this.activeImages = imageLib[this.mdKey] || [];
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
    },

    setActiveImage(img) {
      this.activeImage = img
      this.activeContentComponent = 'ContentImage'
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

.page-modal {
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
      width: 50px;
      height: 50px;
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

.images {
  position: absolute;
  bottom: 0;
  left: 10px;
}

.images-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.images-listitem {
  margin: 0;
  padding: 0 20px 0 0;
}

.image-link {
  position: relative;
  display: block;
  box-shadow: 3px 5px 10px 5px rgba(black, 0.2);
  width: 150px;
  height: 250px;
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  transform-origin: 50% 100%;

  .on-hover {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(black, 0.4);
    opacity: 0;
    visibility: hidden;
    font-size: 12px;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    transition: opacity 0.3s ease;
  }

  &:hover,
  &:focus {
    transform: scale(1.1);
    .on-hover {
      opacity: 1;
      visibility: visible;
    }
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

p {
  line-height: 1.3;
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
