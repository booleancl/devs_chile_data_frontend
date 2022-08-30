import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { getData } from '../src/services/getData'

vi.mock('axios', () => ({
  default : { 
    get: vi.fn()
  }
}))

describe('Link changes the class when hovered', () => {
  
  it('process data', async () => {
    axios.get.mockResolvedValue({
      data: require('./fixtures/answers.json')
    })

    const data = await getData()

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
})
