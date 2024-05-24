const detailsWall = document.querySelector('.details')
const ownerWall = document.querySelector('.owner')
const day = document.querySelector('.day')
const week = document.querySelector('.week')
const month = document.querySelector('.month')


const displayElement = function(data, period, index) {
    const elements = `
        <div class="dashboard_routine flexed-column box-${index}">
          <div class="bg"></div>
          <div class="time_details">
            <div class="title flex-row">
              <p class="title_activity">${data.title}</p>
              <p class="dot">...</p>
            </div>
            <div class="time">
              <p class="time_current">${data.timeframes[period].current}hrs</p>
              <p class="time_last">Last week - ${data.timeframes[period].previous}hrs</p>
            </div>
          </div>
        </div>
    `;
    detailsWall.insertAdjacentHTML('beforeend', elements)
}

const switchData = function(data, data2) {
    const currentTime = document.querySelectorAll('.time_current')
    const lastTime = document.querySelectorAll('.time_last')

    data.forEach((currTime, i) => {
        currentTime[i].textContent = `${currTime}hrs`;
    })

    data2.forEach((currTime, i) => {
        lastTime[i].textContent = `Last week - ${currTime}hrs`;
    })
}

const updateBoard = function(data, duration, dayCurrent, dayPrevious) {
    const a = data.timeframes[duration].current
    const b = data.timeframes[duration].previous
    dayCurrent.push(a)
    dayPrevious.push(b)
}

const dailyCurrentsArray = []
const dailyPreviousArray = []
const weeklyCurrentsArray = []
const weeklyPreviousArray = []
const monthlyCurrentsArray = []
const monthlyPreviousArray = []

const getData = async function() {
    try {
        const response = await fetch('data.json')
        const datas = await response.json()
        datas.forEach((data, index) => {
            displayElement(data, 'daily', index)

            updateBoard(data, 'daily', dailyCurrentsArray, dailyPreviousArray)

            updateBoard(data, 'weekly', weeklyCurrentsArray, weeklyPreviousArray)

            updateBoard(data, 'monthly', monthlyCurrentsArray, monthlyPreviousArray)
        })

        day.addEventListener('click', function() {
            switchData(dailyCurrentsArray, dailyPreviousArray)
        })

        week.addEventListener('click', function() {
            switchData(weeklyCurrentsArray, weeklyPreviousArray)
        })

        month.addEventListener('click', function() {
            switchData(monthlyCurrentsArray, monthlyPreviousArray)
        })

    } catch (error) {
        console.error(error.message);
    }
}

// getData()
window.addEventListener('DOMContentLoaded', function() {
    console.log('loaded');
    getData()
})