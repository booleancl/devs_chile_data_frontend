import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { getData } from './services/getData'
import RiseLoader from 'react-spinners/RiseLoader'

import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  plugins: {
    legend: {
      position: 'left'
    }
  }
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [ pieData, setPieData ] = useState(null)
  const [loader, setLoader] = useState(true)
  const [ title, setTitle ] = useState('')

  const getChartData = async () => {
    const questionIndex = 6
    const { label, labels, data, backgroundColor } = await getData(8)
    // await wait(2000)
    
    setTitle(label)

    setPieData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1
        }
      ]
    })
    setLoader(false)
  }

  useEffect(() => {
    getChartData()
  }, [])

  // useEffect(() => , [pieData])

  return (
    <div className="App">
      { !loader &&
        <div className="card">
          <h1>{ title }</h1>
          <Pie
            data={ pieData }
            options={ options }
          />
        </div>
      }
      <RiseLoader loading={loader} />
    </div>
  )
}

export default App
