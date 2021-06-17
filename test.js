import sysClock from './index.js'

const sysClockInstance = sysClock()

Promise.resolve()
    .then(() => {
        return sysClockInstance.ntp(false)
    })
    .then(() => {
        return console.log('done ntp inactive.')
    })
    .then(() => {
        return sysClockInstance.date('1992-05-12 09:30:00')
    })
    .then(() => {
        return console.log('done ntp active.')
    })
    .catch((message) => {
        console.error(message)
    })
