import Index from './src/index.vue'

Index.install = (vue) => {
  vue.component(Index.name, Index)
}

export default Index
