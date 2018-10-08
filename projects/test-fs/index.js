var fs = require('fs-extra')

var src = './test'
var dst = './dist/'
async function move () {
    try {
        await fs.copy(src, dst, { overwrite: true })
        console.log('success')
    } catch (err) {
        console.error(err)
    }
}

move()