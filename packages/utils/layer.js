const img = () => ({ type: 'img', img: '', width: 200, height: 200, opacity: 100, pos: { x: 200, y: 300 }})
const text = () => ({ type: 'text', content: '双击编辑文字', width: 320, height: 50, fontSize: 100, color: '#333', pos: { x: 200, y: 300 }})
const bg = () => ({ type: 'bg', bgType: 'color', width: 1242, height: 2208, backgroundColor: '#BCCCEC', backgroundImage: '' })

export { img, text, bg }
