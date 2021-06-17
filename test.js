import sysClock from './index.js'

const sysClockInstance = sysClock()

Promise.resolve()
    .then(() => {
        return sysClockInstance.ntp(false)
    })
    .then(() => {
        console.log('Done ntp inactive.')
        console.log('Current date', new Date().toUTCString())
    })
    .then(() => {
        return sysClockInstance.date('1992-05-12 09:30:00')
    })
    .then(() => {
        console.log('New date', new Date().toUTCString())
    })
    .catch((message) => {
        console.error(message)
    })
