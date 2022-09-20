import axios from 'axios'
import stringToColor from 'string-to-color'

const getDevProfiles = (responses, questionIndex) => {
  let label = ''
  let chartData = {}

  responses
    .forEach((responseData) => {
      const targetData = responseData.answers[questionIndex]
      const actualAnswer = targetData.answer

      if (!label) {
        label = targetData.question
      }

      if(Array.isArray(actualAnswer)) {
        for (let answer of actualAnswer) {
          chartData = {
            ...chartData,
            [answer]: {
              color: stringToColor(answer),
              count: chartData[answer] ? chartData[answer].count + 1 : 1
            }
          }
        }
      } else {
        chartData = {
          ...chartData,
          [actualAnswer]: {
            color: stringToColor(actualAnswer),
            count: chartData[actualAnswer] ? chartData[actualAnswer].count + 1 : 1
          }
        }
      }  
    })

  const labels = Object.keys(chartData)
  const backgroundColor = Object.values(chartData).map(({ color }) => color)
  const data = Object.values(chartData).map(({ count }) => count)
  
  return { label, labels, backgroundColor, data }
}

export const getData = async (questionIndex) => {
  try {
    const response = await axios.get('https://dev-chile-boolean-bff.onrender.com/answers')
    
    return getDevProfiles(response.data, questionIndex)
  } catch (error) {
    console.log(error.message)
  }
}
