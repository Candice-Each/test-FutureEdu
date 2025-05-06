<template>
    <div class="container1">
      <canvas id="bgCanvas"></canvas>
      <canvas id="lassoCanvas"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const bgCanvas = document.getElementById('bgCanvas')
      const bgCtx = bgCanvas.getContext('2d')
      bgCanvas.width = bgCanvas.height = 400
      
      const lassoCanvas = document.getElementById('lassoCanvas')
      const lassoCtx = lassoCanvas.getContext('2d')
      lassoCanvas.width = lassoCanvas.height = 400
      
      bgCtx.fillStyle = '#8b1010'
      bgCtx.fillRect(50, 50, 300, 300)
      
      let isDrawing = false
      let points = []
      
      function startLasso(e) {
        isDrawing = true
        const rect = lassoCanvas.getBoundingClientRect()
        points = [{
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }]
        lassoCtx.beginPath()
        lassoCtx.moveTo(points[0].x, points[0].y)
      }
      
      function drawLasso(e) {
        if (!isDrawing) return
        const rect = lassoCanvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        lassoCtx.lineTo(x, y)
        lassoCtx.strokeStyle = 'rgba(255, 255, 255)'
        lassoCtx.lineWidth = 2
        lassoCtx.stroke()
        points.push({ x, y })
      }
      
      function endLasso() {
        if (!isDrawing) return
        isDrawing = false
        if (points.length > 2) {
          lassoCtx.closePath()
          points.push(points[0])
        }
        
        const path = new Path2D()
        path.moveTo(points[0].x, points[0].y)
        points.slice(1).forEach(p => path.lineTo(p.x, p.y))
        path.closePath()
        
        bgCtx.save()
        bgCtx.globalCompositeOperation = 'source-atop'
        bgCtx.fillStyle = 'rgba(255, 255, 255)'
        bgCtx.fill(path)
        bgCtx.restore()
        
        lassoCtx.clearRect(0, 0, 300, 300)
      }
      
      lassoCanvas.addEventListener('mousedown', startLasso)
      lassoCanvas.addEventListener('mousemove', drawLasso)
      lassoCanvas.addEventListener('mouseup', endLasso)
      lassoCanvas.addEventListener('mouseleave', endLasso)
    }
  }
  </script>
  
  <style>
  .container1 {
    position: relative;
    width: 400px;
    height: 400px;
    margin: auto;
  }
  
  #bgCanvas {
    position: absolute;
    left: 0;
    top: 0;
    margin: auto;
  }
  
  #lassoCanvas {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px dashed #8b1010;
    cursor: crosshair;
  }
  </style>