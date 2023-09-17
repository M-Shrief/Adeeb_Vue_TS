import ShowCasePoetry from './ShowCasePoetry.vue'

describe('<ShowCasePoetry />', () => {
  it('Renders a ChosenVerse with one Verse', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
          {
            _id: '6371f4f6ac76f350635f702c',
            poet: {
              _id: '6371ea89885e286801faccaa',
              name: 'التهامي',
            },
            poem: '6371eb6690c2ad965846c221',
            reviewed: true,
            tags: 'الحكمة',
            verses: [
              {
                first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
              },
            ],
          },
        ],
        routeName: 'main',
        onPrint: onPrintSpy,
      },
    });

    cy.get('.one-verse>.first').should(
      'contain',
      'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً'
    );
    cy.get('.one-verse>.sec').should(
      'contain',
      'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ'
    );

    cy.get('.details').should('contain', 'التهامي - القصيدة الكاملة');
    cy.get('.print-button:first').click();
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      _id: '6371f4f6ac76f350635f702c',
      verses: [
        {
          first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
          sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
        },
      ],
    });
  });

  it('Renders a ChosenVerse on Poet page with two Verse', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
          {
            _id: '6371f4f6ac76f350635f702c',
            poet: {
              _id: '6371ea89885e286801faccaa',
              name: 'التهامي',
            },
            poem: '6371eb6690c2ad965846c221',
            reviewed: true,
            tags: 'الحكمة',
            verses: [
              {
                first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
              },
              {
                first: 'ما زادَ فَوق الزادِ خُلِّف ضائِعاً',
                sec: 'في حادِثٍ أَو وارِث أَو عاري',
              },
            ],
          },
        ],
        routeName: 'poet',
        onPrint: onPrintSpy,
      },
    });

    cy.get('.two-verse>.first').should(
      'contain',
      'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً'
    );
    cy.get('.two-verse>.sec').should(
      'contain',
      'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ'
    );

    cy.get('.details').should('contain', 'القصيدة الكاملة');
    cy.get('.print-button').click();
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      _id: '6371f4f6ac76f350635f702c',
      verses: [
        {
          first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
          sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
        },
        {
          first: 'ما زادَ فَوق الزادِ خُلِّف ضائِعاً',
          sec: 'في حادِثٍ أَو وارِث أَو عاري',
        },
      ],
    });
  });

  it('Renders a Prose on Main page', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
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
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
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

    cy.get('.print-button').click();
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      _id: '639b6021b5e253099333b12c',
      qoute:
        'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
    });
  });
});
