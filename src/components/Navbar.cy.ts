import Navbar from './Navbar.vue';

describe('Navbar links', () => {
  it('renders alright and reference right page when partner = null', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Navbar, {
      props: {
        partner: null,
      },
    });

    cy.get('#logo').should('have.attr', 'to', '/');
    cy.get('router-link[to*="/ordering"]').should('exist');
    cy.get('router-link[to*="/history"]').should('exist');
    cy.get('router-link[to*="/about"]').should('exist');
    cy.get('router-link[to*="/partners"]').should('exist');

    cy.get('span').should('not.exist');
  });

  // Still need to know how to deal with injectables
  // it('renders alright and reference right page when partner = null', () => {
  //   // see: https://on.cypress.io/mounting-vue
  //   cy.mount(Navbar, {
  //     props: {},
  //   });

  //   const partner = {
  //     _id: '6472fcb22451bac176fa5475',
  //     name: 'Quasar SSR',
  //     phone: '01023669999',
  //     address: '10th street, Cairo',
  //   };
  //   cy.get('#logo').should('have.attr', 'to', '/');
  //   cy.get('router-link[to*="/partners/ordering"]').should('exist');
  //   cy.get('router-link[to*="/partners/history"]').should('exist');
  //   cy.get('router-link[to*="/about"]').should('exist');

  //   cy.get('span', { multiple: true }).should('exist');
  //   cy.get('.partner-name').should('contain', 'Quasar SSR');
  //   cy.get('.nav-item').should('contain', 'تسجيل الخروج');
  // });
});
