describe('template spec', () => {
  it('fetches Todo items - GET', () => {
    cy.request('http://localhost:3000/api/poets').as('poetsRequest');
    cy.get('@poetsRequest').then(poets => {
        expect(poets.status).to.eq(200);
        assert.isArray(poets.body, 'Todos Response is an array')
    });
});
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.visit('http://192.168.0.103:5173/')
  //   // 

  //   // cy.get('[href="/poem/6371eb9890c2ad965846c27d"] > p')
  //   // cy.get(':nth-child(3) > .print-button').click()
  //   // cy.get('.prints-item')
  })

})