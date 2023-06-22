import ShowCasePoetry from './ShowCasePoetry.vue';

describe('<ShowCasePoetry />', () => {
  it('renders', () => {
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
        onPrint: onPrintSpy,
      },
    });

    cy.get('.verse>.first').should(
      'contain',
      'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً'
    );
    cy.get('.verse>.sec').should(
      'contain',
      'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ'
    );

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
