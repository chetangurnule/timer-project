

let timers = [];

// Timer class to manage individual timers
class Timer {
    constructor(hours, minutes, seconds) {
      this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
      this.remainingSeconds = this.totalSeconds;
      this.timerId = Date.now().toString(); // Generate a unique ID for the timer
    }

    start() {
      this.intervalId = setInterval(() => {
        this.remainingSeconds--;
        if (this.remainingSeconds <= 0) {
          this.stop();
          this.displayTimerEnd();
        } else {
          this.updateDisplay();
        }
      }, 1000);
    }

    stop() {
      clearInterval(this.intervalId);
    }

    updateDisplay() {
        // Update the display of this timer in the Active Timers Display Section
        const timerElement = document.getElementById(this.timerId);
        if (timerElement) {
            let arr = formatTime(this.remainingSeconds);
            timerElement.innerHTML = `
            <div class="text">
                <p>Time Left:</p>
            </div>
            <div class="time">
                <p><span class="hour">${arr[0]}</span> : 
                    <span class="min">${arr[1]}</span> :
                    <span class="sec">${arr[2]}</span>
                </p>
            </div>
            <div class="btn">
                <p>Delete</p>
            </div>`;
        }
      }
  
      displayTimerEnd() {
        // Update the display when the timer reaches zero and play an audio alert
          const alertAudio = document.getElementById('alert-audio');
        const timerElement = document.getElementById(this.timerId);
        let div2 = document.querySelector(".div-2");
        if (timerElement) {
            // timerElement.id = newTimer.timerId;
          timerElement.classList.add('timer-ended');
          timerElement.style.backgroundColor = "#F0F757";
          timerElement.style.color = "#34344A";
          timerElement.innerHTML = `
          <div class="big-text">
              <p>Time is up</p>
          </div>
          <div class="btn-1">
              <p>Stop</p>
          </div>`;
            div2.append(timerElement);
            alertAudio.play();
        }
      }
}


 // Helper function to format time as "HH:MM:SS"
 function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [String(hours).padStart(2, '0'), String(minutes).padStart(2, '0'), String(remainingSeconds).padStart(2, '0')];
  }

let setButton = document.querySelector(".btn");
setButton.addEventListener("click", function(){
    let hours = parseInt(document.querySelector(".hr").value, 10);
    let minutes = parseInt(document.querySelector(".mn").value, 10);
    let seconds = parseInt(document.querySelector(".se").value, 10);
    let div2 = document.querySelector(".div-2");
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0) {
        alert('Invalid Time Format. Enter Once Again');
        return;
    }

    // Create a new timer and start it
    const newTimer = new Timer(hours, minutes, seconds);
    timers.push(newTimer);
    newTimer.start();

    // Add the new timer's display to the Active Timers Display Section
    const timerElement = document.createElement('div');
    timerElement.classList.add("set-time");
    timerElement.id = newTimer.timerId;
    let arr = formatTime(newTimer.remainingSeconds);
    timerElement.innerHTML = `
    <div class="text">
        <p>Time Left:</p>
    </div>
    <div class="time">
        <p><span class="hour">${arr[0]}</span> : 
            <span class="min">${arr[1]}</span> :
            <span class="sec">${arr[2]}</span>
        </p>
    </div>
    <div class="btn">
        <p>Delete</p>
    </div>`;
      div2.append(timerElement);
      clear();
});

function clear(){
    document.querySelector(".hr").value = "";
    document.querySelector(".mn").value = "";
    document.querySelector(".se").value = "";
};
