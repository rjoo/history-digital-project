<template>
  <div>
    <div ref="desc" v-html="content"></div>

    <div v-if="image.src" class="image-modal">
      <div class="image-modal-content">
        <a class="image-modal-close" href="#" @click.prevent="clearImage">Close</a>
        <img :src="image.src">
        <p class="image-modal-credit">Source: {{ image.credit }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheDescription',
  data() {
    return {
      content: '',
      image: {
        src: '',
        credit: ''
      }
    }
  },

  props: {
    markdownKey: String
  },

  watch: {
    markdownKey: {
      handler(k) {
        this.clearImage();

        if (k) {
          this.content = require(`@/assets/descriptions/${k}.md`)
          this.$nextTick(this.bindHandlers);
        } else {
          this.content = ''
        }
      },
      immediate: true
    }
  },

  methods: {
    bindHandlers() {
      // if (this.handlers && this.handlers.length)
      //   this.unbindHandlers();
      this.handlers = [];
      this.$refs.desc.querySelectorAll('[data-image]').forEach(el => {
        this.handlers.push(el.addEventListener('click', (e) => {
          e.preventDefault();
          this.image = {
            src: e.target.href,
            credit: e.target.getAttribute('data-credit')
          }
        }))
      })
    },

    clearImage() {
      this.image = { src: '', credit: '' }
    }
  }
}
</script>

<style lang="scss">
.image-modal {
  position: fixed;
  top: 40px;
  right: 20px;
  max-width: 50%;

  &-close {
    float: right;
  }
  
  &-content {
    background: white;
    padding: 16px;

    img {
      width: 100%;
      height: auto;
    }
  }

  &-credit {
    font-size: 12px;
    font-style: italic;
  }
}
</style>
