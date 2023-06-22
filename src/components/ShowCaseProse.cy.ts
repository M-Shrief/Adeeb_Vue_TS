import ShowCaseProse from './ShowCaseProse.vue';

describe("It's renders properly", () => {
  it(' a Prose on Main page', () => {
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
        routeName: 'main',
        onPrint: onPrintSpy,
      },
    });
    cy.get('.prose-item>.qoute').should(
      'contain',
      'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.'
    );
    cy.get('.details').should('contain', 'محمود شاكر (أبو فهر)');
    cy.get('.details').should(
      'have.attr',
      'to',
      '/poet/639b5cf712eec0bb274cecd4'
    );

    cy.get('.print-button').click();
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      _id: '639b6021b5e253099333b12c',
      qoute:
        'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
    });
  });

  it(' a Prose on Poet page', () => {
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
        routeName: 'poet',
        onPrint: onPrintSpy,
      },
    });
    cy.get('.prose-item>.qoute').should(
      'contain',
      'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.'
    );

    cy.get('.grid-poet');

    cy.get('.print-button').click();
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      _id: '639b6021b5e253099333b12c',
      qoute:
        'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
    });
  });
});
