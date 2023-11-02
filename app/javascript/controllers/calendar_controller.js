import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.startRefreshTimer();
  }

  startRefreshTimer() {
    this.refreshInterval = setInterval(() => {
      this.refreshElements();
    },30 * 60 * 1000);
  }

  disconnect() {

    clearInterval(this.refreshInterval);
  }

  refreshElements() {
    const weatherWrapper = this.element.querySelector('#weather_frame');
    weatherWrapper.src = weatherWrapper.src;
    const calendarFrame = this.element.querySelector('#calendar_frame');
    calendarFrame.src = calendarFrame.src;
  }
}
