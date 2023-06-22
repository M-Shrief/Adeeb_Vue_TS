import ShowCasePoetry from './ShowCasePoetry.vue';

describe('Renders properly', () => {
  it('a ChosenVerse on Main page with one Verse', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        chosenVerses: [
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

  it('a ChosenVerse on Poet page with two Verse', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        chosenVerses: [
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
});
