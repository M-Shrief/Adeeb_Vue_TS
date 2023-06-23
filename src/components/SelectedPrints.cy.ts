import SelectedPrints from './SelectedPrints.vue';

describe('renders SelectedPrints properly', () => {
  it('when all types of prints', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SelectedPrints, {
      props: {
        prints: [
          {
            _id: '6371f4f6ac76f350635f7025',
            verses: [
              {
                first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
              },
              {
                first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
                sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
              },
            ],
          },
          {
            poem: '6371ec50df3fa96d1a941c5d',
            _id: '6371ec50df3fa96d1a941c63',
            verses: [
              {
                first: 'عَجائِباً زَعَموا الأَيّامَ مُجفِلَةً',
                sec: 'عَنهُنَّ في صَفَرِ الأَصفارِ أَو رَجَبِ',
              },
            ],
          },
          {
            _id: '639b5fd6b5e253099333b128',
            qoute:
              'لا حياة لأمة بغير لسان، واللسان كالنهر الجارف، يجمع كل محصول الأمة، كالغيث منهمر، آلاف القرون يتكون منه هذا النهر، فإذا انقطع تيار هذا النهر فقد وقعت في خيبة.',
          },
        ],
        isPartner: false,
      },
    });

    cy.get('.title').should('have.attr', 'to', '/ordering');

    cy.get('.prints-item>p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..'
    );
    cy.get('.prints-item>p').should(
      'contain',
      'عَجائِباً زَعَموا الأَيّامَ مُجفِلَةً..'
    );
    cy.get('.prints-item>p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..'
    );
    cy.get('.prints-item>p').should('contain', 'لا حياة لأمة بغ..');
  });

  it('when isPartner = false', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SelectedPrints, {
      props: {
        prints: [],
        isPartner: false,
      },
    });

    cy.get('.title').should('have.attr', 'to', '/ordering');
  });
  it('when isPartner = true', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SelectedPrints, {
      props: {
        prints: [],
        isPartner: true,
      },
    });

    cy.get('.title').should('have.attr', 'to', '/partners/ordering');
  });
});
