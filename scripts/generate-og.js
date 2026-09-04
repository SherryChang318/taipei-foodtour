const { createCanvas } = require('canvas')
const fs = require('fs')

const canvas = createCanvas(1200, 630)
const ctx = canvas.getContext('2d')

// Background
ctx.fillStyle = '#0a0a0a'
ctx.fillRect(0, 0, 1200, 630)

// Orange top bar
ctx.fillStyle = '#E85D2E'
ctx.fillRect(0, 0, 1200, 8)

// Orange bottom bar
ctx.fillRect(0, 622, 1200, 8)

// Brand name
ctx.fillStyle = '#E85D2E'
ctx.font = 'bold 28px sans-serif'
ctx.textAlign = 'center'
ctx.fillText('TAIWAN FOODIE', 600, 200)

// Main headline
ctx.fillStyle = '#ffffff'
ctx.font = 'bold 72px sans-serif'
ctx.fillText('Taste the Heart', 600, 310)
ctx.fillText('of Taipei', 600, 395)

// Subline
ctx.fillStyle = '#999999'
ctx.font = '28px sans-serif'
ctx.fillText('Authentic food tours led by a born-and-raised Taipei local', 600, 470)

// CTA
ctx.fillStyle = '#E85D2E'
ctx.beginPath()
ctx.roundRect(450, 510, 300, 60, 30)
ctx.fill()
ctx.fillStyle = '#ffffff'
ctx.font = 'bold 22px sans-serif'
ctx.fillText('sherrychang318.com', 600, 548)

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./public/og-image.png', buffer)
console.log('OG image created at public/og-image.png')
