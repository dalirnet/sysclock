# sysclock

Sets the system clock (ready for linux & win)

```javascript
import sysClock from "sysClock"

// Create instance for current os platform
const sysClockInstance = sysClock()

// Inactive network time protocl (NTP)
sysClockInstance
    .ntp(false)
    .then(() => {
        // Inactive NTP
    })
    .catch((error) => {
        // Error
    })

// Change date to Tue May 12 1992 09:30:00
sysClockInstance
    .date("1992-05-12 09:30:00")
    .then(() => {
        // Changed date
    })
    .catch((error) => {
        // Error
    })

// Active network time protocl (NTP)
sysClockInstance
    .ntp(true)
    .then(() => {
        // Active NTP
    })
    .catch((error) => {
        // Error
    })
```
