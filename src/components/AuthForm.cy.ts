import AuthForm from './AuthForm.vue'

describe('Authenticate partner successfully', () => {
  it('Login', () => {
    const onLoginSpy = cy.spy().as('onLoginSpy');
    cy.mount(AuthForm, {
      props: {
        onLogin: onLoginSpy
      }
    })

    // Defualt UI for Login, so no need to toggle it.
    // cy.get('#toggle').click()
    
    // form properties
    cy.get('#phone').type('01235554567');
    cy.get('#password').type('P@ssword1');

    // Submiting
    cy.get('button[type=submit]').click()
    cy.get('@onLoginSpy').should('be.calledOnce');
    cy.get('@onLoginSpy').should('have.been.calledWith', {phone: '01235554567', password: 'P@ssword1'});
  })

  it('Signup', () => {
    const onSignupSpy = cy.spy().as('onSignupSpy');
    cy.mount(AuthForm, {
      props: {
        onSignup: onSignupSpy
      }
    })

    // Defualt UI for Login, so we need to toggle it.
    cy.get('#toggle').click()

    // form properties
    cy.get('#name').type('new User')
    cy.get('#address').type('10th Cairo Street')
    cy.get('#phone').type('01235554567');
    cy.get('#password').type('P@ssword1');


    cy.get('button[type=submit]').click()
    cy.get('@onSignupSpy').should('be.calledOnce');
    cy.get('@onSignupSpy').should('have.been.calledWith',
      {
        name: 'new User',
        phone: '01235554567',
        address: '10th Cairo Street',
        password: 'P@ssword1'
      });
  })
})