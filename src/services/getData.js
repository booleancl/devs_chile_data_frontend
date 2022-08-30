import axios from 'axios'
import stringToColor from 'string-to-color'

const getDevProfiles = (responses) => {
  const questionIndex = 6
  let label = ''
  let chartData = {}

  responses
    .forEach((responseData) => {
      const targetData = responseData.answers[questionIndex]

      if (!label) {
        label = targetData.question
      }

      for (let answer of targetData.answer) {

        chartData = {
          ...chartData,
          [answer]: {
            color: stringToColor(answer),
            count: chartData[answer] ? chartData[answer].count + 1 : 1
          }
        }
      }
    })

  const labels = Object.keys(chartData)
  const backgroundColor = Object.values(chartData).map(({ color }) => color)
  const data = Object.values(chartData).map(({ count }) => count)
  
  return { label, labels, backgroundColor, data }
}

export const getData = async () => {
  try {
    const response = await axios.get('https://dev-chile-boolean-bff.onrender.com/answers')
    
    return getDevProfiles(response.data)
  } catch (error) {
    console.log(error)
  }
}
