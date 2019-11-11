<template>
  <div class="content-image">
    <slot></slot>
    <div class="image-wrap">
      <img :src="`/images/${img.src}`">
    </div>
    <div class="image-info">
      <p class="image-desc">{{ img.description }}</p>
      <p class="image-credit">Credit: <a :href="img.creditUrl" target="_blank">{{ img.credit }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: Object
  }
}
</script>

<style lang="scss">
.page-modal .content-image.content-wrapper {
  display: flex;
  max-width: 750px;
  padding: 40px 20px;
  margin-top: 0;
  top: 50%;
  transform: translateY(-50%);
}

.image-wrap {
  width: 70%;
  padding-right: 20px;

  img {
    width: 100%;
    height: auto;
  }
}

.image-info {
  padding-top: 10px;
  width: 30%;
}

.image-desc {
  font-size: 20px;
}

.image-credit {
  font-size: 12px;
  font-style: italic;
}
</style>