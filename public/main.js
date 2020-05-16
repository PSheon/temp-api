/* eslint-disable */
const port = null
const socketPath = '/socket.io'
const socket = io(
  `${location.protocol}//${location.hostname}:${port || location.port}`,
  {
    path: socketPath
  }
)

socket.on('asm_start', (asm_start) => {
  console.log('asm_start, ', asm_start)
})
socket.on('asm_stats', (asm_stats) => {
  console.log('asm_stats, ', asm_stats)
})
