import Upload from './src/upload.vue'

Upload.install = (vue) => {
  vue.component(Upload.name, Upload)
}

export default Upload
