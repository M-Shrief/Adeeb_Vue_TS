import PreviewColors from './PreviewColors.vue';

describe('Renders colors', () => {
  it('render a black color', () => {
    // see: https://on.cypress.io/mounting-vue
    const onColorSpy = cy.spy().as('onColorSpy');
    cy.mount(PreviewColors, {
      props: {
        onColor: onColorSpy,
        colors: ['#000'],
      },
    });

    cy.get('div>.color').click();
    cy.get('@onColorSpy').should('be.calledOnce');
    cy.get('@onColorSpy').should('have.been.calledWith', '#000');
  });
});
