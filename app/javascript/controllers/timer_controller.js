import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "display" ]
  static values = { timer: Number, id: Number, sound: String, duration: Number }

  connect() {
    this.boundRestart = this.restart.bind(this)
    this.boundPause = this.pause.bind(this)
    this.paused = false
    this.pausedTimer = 0
    this.waitTime = parseInt(this.timerValue) * 60
    this.activeTime = parseInt(this.durationValue) * 60
    this.resetValues()
    this.timerStart()
  }

  restart() {
    let snd = document.getElementById("resumed")
    if (this.paused && this.active) {
      snd.play()
      this.activityInProgress(this.currentActivityTimer)
    } else if (this.paused) {
      snd.play()
      this.timerStart()
    } else {
      this.timerStart()
    }
  }

  pause() {
    this.paused = true
  }

  handleUnpausing() {
    if (this.paused && this.active) {
      this.currentActivityTimer = this.pausedTimer
      this.pausedTimer = 0
      this.paused = false
    } else if (this.paused) {
      this.currentWaitTimer = this.pausedTimer
      this.pausedTimer = 0
      this.paused = false
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async timerStart() {
    this.handleUnpausing()
    this.active = false

    let time_in_seconds = this.currentWaitTimer

    const start_ms = Date.now()
    const start_time = new Date(start_ms)
    const end_time = new Date(start_ms + time_in_seconds * 1000 )

    console.log("starting at:", start_time)
    console.log("planned ending at:", end_time)

    let element = `progress_bar_${this.idValue}`
    let snd = document.getElementById(this.soundValue.toLowerCase().replace(/-/g, ''))
    let bar = document.getElementById(element)

    this.timerInProgress(bar)

    for (let i = time_in_seconds; i > 0; i--) {
      if (!!document.getElementById(element)) {
        let current_time = new Date(Date.now())
        let absolute_diff = parseInt(Math.abs((end_time.getTime() - current_time.getTime()) / 1000))
        let remaining_seconds = i - 1

        if (absolute_diff < remaining_seconds) {
          remaining_seconds = absolute_diff
        }

        if (this.paused) {
          let snd = document.getElementById("paused")
          snd.play();
          this.timerStopped(bar)
          this.pausedTimer = absolute_diff
          this.displayTarget.textContent = "Timer paused - click to resume!"
          break
        }

        this.progressBar(bar, this.waitTime, remaining_seconds, false)
        if (current_time >= end_time || remaining_seconds == 0) {
          snd.play();
          this.activityInProgress()
          break
        }
        this.displayTarget.textContent = this.convertSecondsToTime(remaining_seconds, this.soundValue.replace(/-/g, ' '))
        await this.sleep(1000)
      }
    }
  }



  async activityInProgress() {
    this.handleUnpausing()
    this.active = true

    let time_in_seconds = this.currentActivityTimer

    const start_ms = Date.now()
    const start_time = new Date(start_ms)
    const end_time = new Date(start_ms + time_in_seconds * 1000 )

    console.log("starting task at:", start_time)
    console.log("planned task ending at:", end_time)

    let element = `progress_bar_${this.idValue}`
    let snd = document.getElementById("workwork")
    let bar = document.getElementById(element)
    let msg = "being awesome and mindful! -".concat(' ', this.soundValue.replace(/-/g, ' '))

    this.timerInProgress(bar)

    for (let i = time_in_seconds; i > 0; i--) {
      if (!!document.getElementById(element)) {
        let current_time = new Date(Date.now())
        let absolute_diff = parseInt(Math.abs((end_time.getTime() - current_time.getTime()) / 1000))
        let remaining_seconds = i - 1

        if (absolute_diff < remaining_seconds) {
          remaining_seconds = absolute_diff
        }

        if (this.paused) {
          let snd = document.getElementById("paused")
          snd.play();
          this.timerStopped(bar)
          this.pausedTimer = absolute_diff
          this.displayTarget.textContent = "Timer paused - click to resume!"
          break
        }

        this.progressBar(bar, this.activeTime, remaining_seconds, true)

        if (current_time >= end_time || remaining_seconds == 0) {
          console.log("finished at:", new Date(Date.now()))
          snd.play();
          this.timerStopped(bar)
          this.resetValues()
          this.displayTarget.textContent = "Click to restart!"
          break
        } else {
          this.displayTarget.textContent = this.convertSecondsToTime(remaining_seconds, msg)
          await this.sleep(1000)
        }
      }
    }
  }

  resetValues() {
    this.active = false
    this.currentActivityTimer = this.activeTime
    this.currentWaitTimer = this.waitTime
  }

  timerInProgress(bar_element) {
    bar_element.removeEventListener("click", this.boundRestart)
    bar_element.addEventListener("click", this.boundPause)
  }

  timerStopped(bar_element) {
    bar_element.removeEventListener("click", this.boundPause)
    bar_element.addEventListener("click", this.boundRestart)
  }

  convertSecondsToTime(seconds, prefix) {
    if (seconds > 0) {
      let time = new Date(seconds * 1000).toISOString()
        if (seconds > 3600) {
          return `${prefix}, ${time.substring(11,19)}`
        } else  {
          return `${prefix}, ${time.substring(14,19)}`
        }
      }
    }

  progressBar(bar_object,time, current_time, reversed) {
    if (reversed) {
      bar_object.style.width = `${100-((current_time / time) * 100)}%`
    } else {
      bar_object.style.width = `${(current_time / time) * 100}%`
  }
  }
}