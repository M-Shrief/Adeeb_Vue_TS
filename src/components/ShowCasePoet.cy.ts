import ShowCasePoet from './ShowCasePoet.vue';

describe('<ShowCasePoet />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ShowCasePoet, {
      props: {
        details: {
          _id: '6371e9ce885e286801facca2',
          name: 'عنترة بن شداد',
          time_period: 'العصر الجاهلي',
          bio: 'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.',
        },
      },
    });

    cy.get('.poet>h2').should('contain', 'عنترة بن شداد - العصر الجاهلي');
    cy.get('.poet>.bio').should(
      'contain',
      'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة'
    );
  });
});