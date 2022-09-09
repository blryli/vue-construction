const img = () => ({ type: 'img', img: '', style: { width: 400, height: 400 }, pos: { x: 200, y: 300 }})
const text = () => ({ type: 'text', content: '双击编辑文字', style: { width: 800, height: 200, fontSize: 100, color: '#333' }, pos: { x: 200, y: 300 }})
const bg = () => ({ type: 'bg', imag: '', style: { width: 1242, height: 2208, backgroundColor: '#BCCCEC', backgroundImage: '' }})

export { img, text, bg }
