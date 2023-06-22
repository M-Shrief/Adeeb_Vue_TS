import ShowCaseProse from './ShowCaseProse.vue';

describe('<ShowCaseProse />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCaseProse, {
      props: {
        proses: [
          {
            _id: '639b6021b5e253099333b12c',
            poet: {
              _id: '639b5cf712eec0bb274cecd4',
              name: 'محمود شاكر (أبو فهر)',
            },
            tags: 'حكمة, ثورة, فوقة',
            qoute:
              'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
            reviewed: true,
          },
        ],
        onPrint: onPrintSpy,
      },
    });
    cy.get('.prose-item>.qoute').should(
      'contain',
      'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.'
    );
    cy.get('.print-button').click();
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      _id: '639b6021b5e253099333b12c',
      qoute:
        'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
    });
  });
});
