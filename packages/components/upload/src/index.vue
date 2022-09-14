<template>
  <div tabindex="0" class="v-upload">
    <div v-if="showImg" class="v-upload__content">
      <img v-if="img" ref="img" :src="img" class="v-upload__content-img">
    </div>
    <input ref="input" type="file" name="file" class="v-upload__input" accept=".png, .jpg, .jpeg" @change="change">
    <div v-if="showBtn" class="v-upload__btn" @click="handleClick">替换背景</div>
  </div>
</template>
<script>
export default {
  name: 'VUpload',
  components: { },
  props: {
    value: { type: String, default: '' },
    width: { type: String, default: '' },
    showImg: { type: Boolean, default: true },
    showBtn: { type: Boolean, default: true }
  },
  data() {
    return {
      img: ''
    }
  },
  mounted() {

  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    change() {
      const file = this.$refs.input.files[0]
      if (!file) return
      const index = file.name.lastIndexOf('.')
      const fileText = file.name.substring(index, file.name.length)
      const fileName = fileText.toLowerCase() // 文件类型
      // if (fileName !== '.png' || fileName !== '.jpg') {
      //   alert('系统仅支持 JPG或PNG 格式的图片，请您调整格式后重新上传')
      //   return
      // }

      const isLt2M = file.size / 1024 / 1024 < 5
      // if (!isLt2M) {
      //   alert('图片大小不能超过5M,请重新上传')
      //   return
      // }
      var reader = new FileReader()
      reader.readAsDataURL(file)// 异步读取文件内容，结果用data:url的字符串形式表示
      /* 当读取操作成功完成时调用*/
      reader.onload = (e) => {
        const { result } = e.target
        this.img = result// 赋值给img标签让它显示出来
        this.$emit('change', result)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-upload{
  display: inline-block;
    text-align: center;
    outline: none;
  &__content{
    width: 228px;
    height: 228px;
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #f5f5f5;
    &-img{
      width: 100%;
      height: 100%;
    }
  }
  &__input{
    display: none;
  }
  &__btn{
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    background-color: #f5f5f5;
    cursor: pointer;
  }
}
</style>
