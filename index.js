import os from 'os'
import { spawn } from 'child_process'

const runCommand = (command, args) => {
    return new Promise((resolve, reject) => {
        const message = [command, ...args]
        const commandInstance = spawn(command, args)
        commandInstance.stderr.on('data', (data) => {
            message.push(data.toString())
        })
        commandInstance.on('close', (code) => {
            if (code) {
                reject(message.join(' '))
            }
            resolve()
        })
    })
}

const dateValidation = (date) => {
    return new Promise((resolve, reject) => {
        const dateInstance = new Date(date)
        if (dateInstance.getTime() > 0) {
            resolve({
                year: dateInstance.getUTCFullYear(),
                month: (dateInstance.getUTCMonth() + 1).toString().padStart(2, 0),
                day: dateInstance.getUTCDate().toString().padStart(2, 0),
                hour: dateInstance.getUTCHours().toString().padStart(2, 0),
                minute: dateInstance.getUTCMinutes().toString().padStart(2, 0),
                second: dateInstance.getUTCSeconds().toString().padStart(2, 0),
            })
        }
        reject('Invalid date.')
    })
}

const sysClock = {
    linux: {
        ntp(state) {
            return runCommand('timedatectl', ['set-ntp', state])
        },
        date(date) {
            return dateValidation(date)
                .then(({ year, month, day, hour, minute, second }) => {
                    return [month, day, year].join('/') + ' ' + [hour, minute, second].join(':')
                })
                .then((dateString) => {
                    return runCommand('date', ['--set', dateString, '--utc'])
                })
        },
    },
    win32: {
        ntp() {
            return Promise.resolve()
        },
        date(date) {
            return dateValidation(date)
                .then(({ year, month, day, hour, minute, second }) => {
                    return {
                        dateString: [month, day, year].join('/'),
                        timeString: [hour, minute, second].join(':'),
                    }
                })
                .then(({ dateString, timeString }) => {
                    return Promise.all([runCommand('date', [dateString]), runCommand('time', [timeString])])
                })
        },
    },
    noop: {
        ntp() {
            return Promise.reject('Unsupported platform.')
        },
        date() {
            return Promise.reject('Unsupported platform.')
        },
    },
}

export default (platform = os.platform()) => {
    if (sysClock.hasOwnProperty(platform)) {
        return sysClock[platform]
    }
    return sysClock.noop
}
