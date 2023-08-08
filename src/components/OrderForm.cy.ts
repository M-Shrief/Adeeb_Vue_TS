import OrderForm from './OrderForm.vue'



describe('Confirming Customer order successfully', () => {
  it('Guest order', () => {
    // see: https://on.cypress.io/mounting-vue
    const onGuestOrderSpy = cy.spy().as('onGuestOrderSpy');
    cy.mount(OrderForm, {
      props: {
        products: [{
          "print": {
            "_id":"6371f4f6ac76f350635f7026",
            "verses":[
              {"first":"فاِقضوا مآرِبكم عُجَالاً إِنَّما","sec":"أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"},
              {"first":"وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا","sec":"إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"}
            ]},
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
          },
          {
            "print":{
              "_id":"639b6095b5e253099333b134",
              "qoute":"وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
            },
            "fontType":"نسخ",
            "fontColor":"#000",
            "backgroundColor":"#fff"
          },
          {
            "print":{
              "poem":"6371ebccdf3fa96d1a941b8e",
              "_id":"6371ebccdf3fa96d1a941b91",
              "verses":[
                {"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}
              ]
            },
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#2c3e50"
          }
        ],
        onGuestOrder: onGuestOrderSpy
      }
    })
    cy.get('#name').type('Component testing');
    cy.get('#phone').type('01322445566');
    cy.get('#address').type('10th street nowhere');

    cy.get('button[type=submit]').click()
    cy.get('@onGuestOrderSpy').should('be.calledOnce');
    cy.get('@onGuestOrderSpy').should('have.been.calledWith',
      {
        name: 'Component testing',
        phone: '01322445566',
        address: '10th street nowhere',
        products: [{
          "print": {
            "_id":"6371f4f6ac76f350635f7026",
            "verses":[
              {"first":"فاِقضوا مآرِبكم عُجَالاً إِنَّما","sec":"أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"},
              {"first":"وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا","sec":"إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"}
            ]},
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
          },
          {
            "print":{
              "_id":"639b6095b5e253099333b134",
              "qoute":"وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
            },
            "fontType":"نسخ",
            "fontColor":"#000",
            "backgroundColor":"#fff"
          },
          {
            "print":{
              "poem":"6371ebccdf3fa96d1a941b8e",
              "_id":"6371ebccdf3fa96d1a941b91",
              "verses":[
                {"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}
              ]
            },
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#2c3e50"
          }
        ]
      })
  })

  it('Partner order', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPartnerOrderSpy = cy.spy().as('onPartnerOrderSpy');
    cy.mount(OrderForm, {
      props: {
        partner: {
          _id: '24124152251521512',
          name: 'component testing',
          phone: '01322445566',
        },
        productGroups: [
          {
            "prints":[
              {
                "_id":"6371f4f6ac76f350635f7026",
                "verses":[
                  {"first":"فاِقضوا مآرِبكم عُجَالاً إِنَّما","sec":"أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"},
                  {"first":"وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا","sec":"إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"}
                ]
              },
              {
                "_id":"639b6095b5e253099333b134",
                "qoute":"وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
              },
              {
                "poem":"6371ebccdf3fa96d1a941b8e",
                "_id":"6371ebccdf3fa96d1a941b91",
                "verses":[
                  {"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}
                ]
              }
            ],
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
          },
          {
            "prints":[
              {
                "_id":"639b5fc6b5e253099333b126",
                "qoute":"وإلفُ القبيحِ مَتلفةٌ للإحساسِ والعقلِ جميعا."
              },
              {
                "_id":"639b60b3b5e253099333b136",
                "qoute":"إنّ حياة الأمم في ألسنتها."
              },
              {
                "_id":"639b61e3b5e253099333b146",
                "qoute":"الأندلس، كلمةٌ واحدةٌ توقظ في دم كلّ عربيٍّ تاريخًا من المجد والجمال والعلم والأدب، وتوقِد فيه نيرانًا من الألم والغيظ والغضب والحسرة.."},{"_id":"639b6109b5e253099333b13c","qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."},{"_id":"639b6051b5e253099333b130","qoute":"إنَّ الجسد ليذهب إلى البِلى، وإنّ الروح لتخلد"
              }
            ],
            "fontType":"نسخ",
            "fontColor":"#000",
            "backgroundColor":"#fff"
          }
        ],
        onPartnerOrder: onPartnerOrderSpy
      }
    })

    cy.get('#address').type('10th street nowhere');
    cy.get('button[type=submit]').click()
    cy.get('@onPartnerOrderSpy').should('be.calledOnce');
    cy.get('@onPartnerOrderSpy').should('have.been.calledWith', 
    {
      partner: "24124152251521512",
      name: "component testing",
      phone: "01322445566",
      address: "10th street nowhere",
      products: [
        {
          "prints": [
            {
              "_id": "6371f4f6ac76f350635f7026",
              "verses": [
                {
                  "first": "فاِقضوا مآرِبكم عُجَالاً إِنَّما",
                  "sec": "أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"
                },
                {
                  "first": "وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا",
                  "sec": "إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"
                }
              ]
            },
            {
              "_id": "639b6095b5e253099333b134",
              "qoute": "وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
            },
            {
              "poem": "6371ebccdf3fa96d1a941b8e",
              "_id": "6371ebccdf3fa96d1a941b91",
              "verses": [
                {
                  "first": "تَجورُ بِذي اللُبانَةِ عَن هَواهُ",
                  "sec": "إِذا ما ذاقَها حَتّى يَلينا"
                }
              ]
            }
          ],
          "fontType": "نسخ",
          "fontColor": "#fff",
          "backgroundColor": "#000"
        },
        {
          "prints": [
            {
              "_id": "639b5fc6b5e253099333b126",
              "qoute": "وإلفُ القبيحِ مَتلفةٌ للإحساسِ والعقلِ جميعا."
            },
            {
              "_id": "639b60b3b5e253099333b136",
              "qoute": "إنّ حياة الأمم في ألسنتها."
            },
            {
              "_id": "639b61e3b5e253099333b146",
              "qoute": "الأندلس، كلمةٌ واحدةٌ توقظ في دم كلّ عربيٍّ تاريخًا من المجد والجمال والعلم والأدب، وتوقِد فيه نيرانًا من الألم والغيظ والغضب والحسرة.."
            },
            {
              "_id": "639b6109b5e253099333b13c",
              "qoute": "فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
            },
            {
              "_id": "639b6051b5e253099333b130",
              "qoute": "إنَّ الجسد ليذهب إلى البِلى، وإنّ الروح لتخلد"
            }
          ],
          "fontType": "نسخ",
          "fontColor": "#000",
          "backgroundColor": "#fff"
        }
      ]
    })
  })
})