<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  name: 'TheDescription',
  data() {
    return {
      content: ''
    }
  },
  props: {
    markdownKey: String
  },

  watch: {
    markdownKey: {
      handler(k) {
        if (k)
          this.content = require(`@/components/descriptions/${k}.md`)
        else
          this.content = ''
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">

</style>
