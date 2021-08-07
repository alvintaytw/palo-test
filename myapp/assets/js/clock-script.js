var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true
var checkOnce = false
var modified = false
var now = new Date(0)
var newDate = new Date(0)

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function checkOnClick() {
  var DECREMENT_BY_SECS = document.querySelector('#results').getAttribute('data-id');
  var checkOnce = document.querySelector('#results').getAttribute('data-to-check');

  if ((DECREMENT_BY_SECS != "") && checkOnce == "true") {

    document.querySelector('#results').setAttribute('data-to-check', false);

    var nowTimeStamp = getTimeStampFromDate(now.getTime());
    var updatedTimeStamp = nowTimeStamp - DECREMENT_BY_SECS;
    
    newDate = getDateFromTimeStamp(updatedTimeStamp)
    var newHours = newDate.getHours();
    var newMinutes = newDate.getMinutes();
    var newSeconds = newDate.getSeconds();

    var newTimeHSM = newHours + ":" + newMinutes + ":" + newSeconds

    modified = true

    var timeFormat = secondsToTimes(DECREMENT_BY_SECS);
    var convertedResult = "";

    if (timeFormat.dValue !== null) {
      convertedResult += "<span style='color:red'>" + timeFormat.dValue + " Days </span>";
      document.querySelector('#dateCal').innerHTML = monthNames[newDate.getMonth()] +" "+newDate.getDay() +", "+newDate.getFullYear();
    }
    if (timeFormat.hValue !== null) {
      convertedResult += timeFormat.hValue + " Hours ";
      updateRevertAnimation(now.getHours(),newHours,hoursContainer)  
    }
    if (timeFormat.mValue !== null) {
      convertedResult += timeFormat.mValue + " Minutes ";
      updateRevertAnimation(now.getMinutes(),newMinutes,minutesContainer)     
    }
    if (timeFormat.sValue !== null) {
      convertedResult += timeFormat.sValue + " Seconds ";
      updateRevertAnimation(now.getSeconds(),newSeconds,secondsContainer)     
    }
    document.querySelector('#convertHMS').innerHTML = "( " + convertedResult + ")";
  }
}

function updateTime() {

  if (modified) {    
    now = newDate
    var timeStampStore = getTimeStampFromDate(now.getTime())
    timeStampStore++
    newDate = getDateFromTimeStamp(timeStampStore)    
  }
  else {
    now = new Date;
  }

  var lastHours = last.getHours().toString()
  var nowHours = now.getHours().toString()
  if (lastHours !== nowHours) {
    updateContainer(hoursContainer, nowHours)
  }

  var lastMinutes = last.getMinutes().toString()
  var nowMinutes = now.getMinutes().toString()
  if (lastMinutes !== nowMinutes) {
    updateContainer(minutesContainer, nowMinutes)
  }

  var lastSeconds = last.getSeconds().toString()
  var nowSeconds = now.getSeconds().toString()


  if (lastSeconds !== nowSeconds) {
    tick()
    updateContainer(secondsContainer, nowSeconds)
  }

  last = now
}

function secondsToTimes(secInput) {
  secInput = Number(secInput);
  var d = Math.floor(secInput / 86400);
  var h = Math.floor(secInput % 86400 / 3600);
  var m = Math.floor(secInput % 3600 / 60);
  var s = Math.floor(secInput % 3600 % 60);

  var dValue = d > 0 ? d : null;
  var hValue = h > 0 ? h : null;
  var mValue = m > 0 ? m : null;
  var sValue = s > 0 ? s : null;
  return { dValue, hValue, mValue, sValue };
}

function getTimeStampFromDate(inputDate) {
  return Math.floor(inputDate / 1000)
}

function getDateFromTimeStamp(inputTimeStamp) {
  var tempDate = new Date(inputTimeStamp * 1000);
  return tempDate
}

function tick() {
  tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
  var time = newTime.split('')

  if (time.length === 1) {
    time.unshift('0')
  }

  var first = container.firstElementChild;
  var last = container.lastElementChild;
  if (first.lastElementChild.textContent !== time[0]) {
    updateNumber(first, time[0])
  }
  if (last.lastElementChild.textContent !== time[1]) {
    updateNumber(last, time[1])
  }
}

function updateNumber(element, number) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number

  element.appendChild(second)
  element.classList.add('move')

  setTimeout(function () {
    element.classList.remove('move')
  }, 990)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 990)
}

function updateRevertAnimation(oldTimeDigit, newTimeDigit,elementContainer) {
  
  var ntDigit = newTimeDigit.toString().split('')
  var otDigit = oldTimeDigit.toString().split('')

  if (otDigit[0] != ntDigit[0]) {
    backwardTicksNumber(elementContainer.firstElementChild,ntDigit[0],495)   
    backwardTicksNumber(elementContainer.lastElementChild,ntDigit[1],495) 
  }
  if (otDigit[1] != ntDigit[1]) { 
    backwardTicksNumber(elementContainer.lastElementChild,ntDigit[1],495) 
  }
}

function backwardTicksNumber(element, number,speed) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number

  element.appendChild(second)
  element.classList.add('moveback')

  setTimeout(function () {
    element.classList.remove('moveback')
  }, speed)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, speed)

}

setInterval(updateTime, 1000)
setInterval(checkOnClick, 1)