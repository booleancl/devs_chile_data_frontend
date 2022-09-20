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
  const [pieData, setPieData] = useState(null)
  const [loader, setLoader] = useState(true)
  const [title, setTitle] = useState('')
  const [questionsList, setQuestionsList] = useState([])
  const [actualQuestionIndex, setActualQuestionIndex] = useState(0)

  const getChartData = async () => {
    const { label, labels, data, backgroundColor, questions } = await getData(actualQuestionIndex)

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
    setQuestionsList(questions)
    setLoader(false)
  }
  const onClickQuestion = (event, questionIndex) => {
    event.preventDefault()
    setActualQuestionIndex(questionIndex)
  }

  useEffect(() => {
    getChartData()
  }, [actualQuestionIndex])

  // useEffect(() => , [pieData])

  return (
    <div className="App">
      <nav className="mainNav">
        <div className="logo-devs-chile">
          <img src="https://pbs.twimg.com/profile_images/1000166677210976257/8VFsnABP_400x400.jpg" alt="" />
          <span>Devs Chile</span>
        </div>
        
        <h2>Encuesta Programadores Chile 2022</h2>

        <img className="logo-boolean-academia " src="https://res.cloudinary.com/boolean-spa/image/upload/v1590555389/navbar-logo-original_qmfps9.png" alt="" />
      </nav>
      {!loader &&
        (
          <div className="container">
            <nav className="tab">
              <ul className="questions-list">
              { questionsList.map((question, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(event) => onClickQuestion(event, index)}
                  className={
                    actualQuestionIndex === index
                      ? 'active'
                      : ''
                  }
                  disabled={ actualQuestionIndex === index }
                >
                  <li>{ question }</li>
                </a>
              ))}
  
              </ul>
            </nav>
            <div className="card">
              <h1>{title}</h1>
              <Pie
                data={pieData}
                options={options}
              />
            </div>

            <RiseLoader loading={loader} />
          </div>
        )
      }
  </div>)
}

export default App
