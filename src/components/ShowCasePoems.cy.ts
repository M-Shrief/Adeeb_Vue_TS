import ShowCasePoems from './ShowCasePoems.vue';

describe('<ShowCasePoems />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ShowCasePoems, {
      props: {
        poems: [
          {
            _id: '6371eb6690c2ad965846c221',
            intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
            poet: {
              _id: '6371ea89885e286801faccaa',
              name: 'التهامي',
            },
            reviewed: true,
          },
          {
            _id: '6371eb6690c2ad965846c221',
            intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
            reviewed: true,
          },
        ],
      },
    });

    cy.get('.poem p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري - التهامي'
    );
    cy.get('.poem p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..'
    );
  });
});
