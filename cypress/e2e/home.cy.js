
describe('question 6', () => {
  it('should show graph for question 6', () => {
    cy.visit('/')
    cy.intercept('https://dev-chile-boolean-bff.onrender.com/answers').as('answers')

    cy.wait('@answers').then((interception) => {
      const expectedQuestion = interception.response.body[0].answers[6].question
      cy.wait(4000)
      
      cy.get('h1').invoke('text').should('equal', expectedQuestion)

    })
  
  })
})