import ShowCasePoets from './ShowCasePoets.vue';

describe('Poets', () => {
  it('renders poets name with attr to his page', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ShowCasePoets, {
      props: {
        poets: [
          {
            _id: '6371e9ce885e286801facca2',
            name: 'عنترة بن شداد',
            time_period: 'العصر الجاهلي',
          },
        ],
      },
    });

    cy.get('.poet>p').should('contain', 'عنترة بن شداد');
    cy.get('.poet').should('have.attr', 'to', '/poet/6371e9ce885e286801facca2');
  });
});
