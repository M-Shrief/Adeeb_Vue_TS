import ShowCasePoem from './ShowCasePoem.vue';

describe('<ShowCasePoem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCasePoem, {
      props: {
        onPrint: onPrintSpy,
        verses: [
          {
            first: 'وَجَدتُ وَعدَكَ زوراً في مُزَوَّرَةٍ',
            sec: 'وَصَفتَ مُبتَدِئً بِالحِذقِ طاهيها',
          },
        ],
      },
    });

    cy.get('.verse>.first').should(
      'contain',
      'وَجَدتُ وَعدَكَ زوراً في مُزَوَّرَةٍ'
    );
    cy.get('.verse>.sec').should(
      'contain',
      'وَصَفتَ مُبتَدِئً بِالحِذقِ طاهيها'
    );

    cy.get('.verse').dblclick();
    cy.get('@onPrintSpy').should('be.calledOnce');
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      first: 'وَجَدتُ وَعدَكَ زوراً في مُزَوَّرَةٍ',
      sec: 'وَصَفتَ مُبتَدِئً بِالحِذقِ طاهيها',
    });
  });
});