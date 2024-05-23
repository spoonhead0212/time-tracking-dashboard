const detailsWall = document.querySelector('.details')
const ownerWall = document.querySelector('.owner')
const day = document.querySelector('.day')
const week = document.querySelector('.week')
const month = document.querySelector('.month')


const displayElement = function(data, period) {
    const elements = `
        <div class="dashboard_routine">
          <div class="bg"></div>
          <div>
            <div class="title">
              <p class="title_activity">${data.title}</p>
              <p>...</p>
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

const dailyCurrentsArray = []
const dailyPreviousArray = []
const weeklyCurrentsArray = []
const weeklyPreviousArray = []
const monthlyCurrentsArray = []
const monthlyPreviousArray = []
const getData = async function() {
    try {
        const response = await fetch('/data.json')
        const datas = await response.json()
        datas.forEach((data, i) => {
            const a = data.timeframes.daily.current
            const b = data.timeframes.daily.previous
            displayElement(data, 'daily')
            dailyCurrentsArray.push(a)
            dailyPreviousArray.push(b)

            const c = data.timeframes.weekly.current
            const d = data.timeframes.weekly.previous
            weeklyCurrentsArray.push(c)
            weeklyPreviousArray.push(d)

            const e = data.timeframes.monthly.current
            const f = data.timeframes.monthly.previous
            monthlyCurrentsArray.push(e)
            monthlyPreviousArray.push(f)
            
        })
        console.log(dailyCurrentsArray, dailyPreviousArray);
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