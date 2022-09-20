import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { getData } from '../src/services/getData'

vi.mock('axios', () => ({
  default : { 
    get: vi.fn()
  }
}))

describe('getData Service', () => {
  
  it('should process data generating resume', async () => {
    axios.get.mockResolvedValue({
      data: require('./fixtures/answers.json')
    })

    const data = await getData(6)

    expect(axios.get).toHaveBeenCalledWith('https://dev-chile-boolean-bff.onrender.com/answers')
    expect(data).toEqual({
      label: '¿Cuáles son las funciones que has realizado en tu vida profesional?',
      labels: [
        'Desarrollador Back-end',
        'Desarrollador Front-end',
        'Tech lead / Manager'
      ],
      backgroundColor: [
        '#731f04',
        '#647cc9',
        '#eaa602'
      ],
      data: [2, 1, 1]
    })
  })

  it('should log error message', async () => {
    const errorMessage = 'Super Fatal Error'
    axios.get.mockRejectedValue(new Error(errorMessage))
    vi.spyOn(console, 'log')

    await getData()
    
    expect(axios.get).toHaveBeenCalledWith('https://dev-chile-boolean-bff.onrender.com/answers')
    expect(console.log).toHaveBeenCalledWith(errorMessage)
  })

})
