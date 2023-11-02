import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.startRefreshTimer(); // Start the timer

  }

  startRefreshTimer() {
    // Use a class variable to store the interval so you can clear it later
    this.refreshInterval = setInterval(() => {
      this.refreshElements();
    },30 * 60 * 1000);
  }

  disconnect() {
    // Clear the interval when the controller disconnects to avoid memory leaks
    clearInterval(this.refreshInterval);
  }

  refreshElements() {
    const weatherWrapper = this.element.querySelector('#weather_frame');
    weatherWrapper.src = weatherWrapper.src; // Reload the iframe
    const calendarFrame = this.element.querySelector('#calendar_frame');
    calendarFrame.src = calendarFrame.src; // Reload the iframe
  }
}
