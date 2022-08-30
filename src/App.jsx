import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { getData } from './services/getData'

import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  plugins: {
    legend: {
      position: 'left'
    }
  }
}

function App() {
  const [ pieData, setPieData ] = useState(null)
  const [ title, setTitle ] = useState('')

  const getChartData = async () => {
    const { label, labels, data, backgroundColor } = await getData()

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
  }

  useEffect(() => {
    getChartData()
  }, [])

  return (
    <div className="App">
      { pieData &&
        <div className="card">
          <h1>{ title }</h1>
          <Pie
            data={ pieData }
            options={ options }
          />
        </div>
      }
    </div>
  )
}

export default App
