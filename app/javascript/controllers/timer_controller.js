import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "display" ]
  static values = { timer: Number, id: Number, sound: String, duration: Number }

  connect() {
    this.timerStart(this.timerValue)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async timerStart(time_set) {
    const time = parseInt(time_set)
    let time_in_seconds = time * 60
    let snd = document.getElementById(this.soundValue.toLowerCase().replace(/-/g, ''))
    let bar = document.getElementById(`progress_bar_${this.idValue}`)
    bar.removeEventListener("click", this.boundRestart)
    for (let i = time_in_seconds; i > 0; i--) {
      let remaining_seconds = i -1
      this.progressBar(bar, time_in_seconds, remaining_seconds, false)
      if (remaining_seconds == 0) {
        snd.play();
        this.activityInProgress(this.durationValue)
      }
      this.displayTarget.textContent = this.convertSecondsToTime(remaining_seconds, this.soundValue)
      await this.sleep(1000)
    }
  }

  restart() {
    this.timerStart(this.timerValue)
  }

  async activityInProgress(time_of_activity) {
    const time = parseInt(time_of_activity)
    let time_in_seconds = time * 60
    let snd = document.getElementById("workwork")
    let bar = document.getElementById(`progress_bar_${this.idValue}`)
    let msg = "being awesome and mindful! -".concat(' ', this.soundValue.replace(/-/g, ' '))
    bar.removeEventListener("click", this.restart.bind(this))
    for (let i = time_in_seconds; i > 0; i--) {
      let remaining_seconds = i -1
      this.progressBar(bar, time_in_seconds, remaining_seconds, true)
      if (remaining_seconds == 0) {
        snd.play();
        this.displayTarget.textContent = "Click to restart!"
        this.boundRestart = this.restart.bind(this)
        bar.addEventListener("click", this.boundRestart)
      } else {
        this.displayTarget.textContent = this.convertSecondsToTime(remaining_seconds, msg)
        await this.sleep(1000)
      }
    }
  }

  convertSecondsToTime(seconds, prefix) {
    let time_in_seconds = seconds
    if (time_in_seconds == 0) {

    } else {
      if ( time_in_seconds < 10) {
        return `${prefix} 00:0${time_in_seconds}`
      } else if (time_in_seconds < 59) {
        return `${prefix} 00:${time_in_seconds}`
      } else if (time_in_seconds < 600) {
        let orphan_seconds = time_in_seconds % 60
          if (orphan_seconds < 10) {
            return `${prefix} 0${(time_in_seconds - orphan_seconds)/60}:0${orphan_seconds}`
          } else {
            return `${prefix} 0${(time_in_seconds - orphan_seconds)/60}:${orphan_seconds}`
          }
      } else {
        // if (time_in_seconds < 3600)
        let orphan_seconds = time_in_seconds % 60
        if (orphan_seconds < 10) {
          return `${prefix} ${(time_in_seconds - orphan_seconds)/60}:0${orphan_seconds}`
        } else {
          return `${prefix} ${(time_in_seconds - orphan_seconds)/60}:${orphan_seconds}`
        }
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