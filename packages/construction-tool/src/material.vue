<template>
  <div class="v-material">
    <div class="v-construction-btn" @click="handleClick">添加素材</div>
    <v-upload ref="upload" :show-btn="false" :show-img="false" @change="upload" />
    <div class="v-material__list">
      <div v-for="(d, i) in list" :key="i" class="v-material__list-item">
        <div class="v-material__list-box">
          <img :src="d" class="v-material__img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VUpload from '../../components/upload'
export default {
  name: 'Material',
  components: { VUpload },
  props: {
    label: { type: String, default: '标签' }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {

  },
  methods: {
    handleClick() {
      this.$refs.upload.handleClick()
    },
    upload(img) {
      this.list.push(img)
      this.$emit('upload', img)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-material{
  &__list{
    font-size: 0;
    &-item{
      width: 114px;
      height: 114px;
      display: inline-block;
    }
    &-box{
      margin: 5px;
      border: 1px solid #ddd;
      background-color: #f5f5f5;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
  &__img{
    font-size: 0;
    margin: 0;
    padding: 0;
    width: 110px;
    height: 110px;
  }
}
</style>
