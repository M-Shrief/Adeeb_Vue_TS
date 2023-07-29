# All in TypeScript, front-end for "Adeeb أديب" developed with Vuejs, Pinia and vue-router.

**Overview**: It's concerned with Arabic literature. It assumes a business model that enables you to order a specific piece of literature to be printed with especial colors and font. Then it'll be delivered to the customer, with the ability for the customer to follow up the process. And for special customers, it provides them with the ability to make bulk orders fast and easy. And if they’re willing to signup, they can review all of their past orders.

- Tech Stack:

  - Full **TypeScript**
  - **HTML, CSS & SCSS**
  - **Vite**
  - **Vuejs**
  - **Pinia** & **Vue-router**

- Characteristics:

  - form validation with _vee-validate_ & _Yup_
  - _JWT_ authentication and authorization
  - Dark/Light Theme
  - Component testing with _Cypress_
  - ... and more

**Overview, and file structure**:

- _./assets_ file for our base.css and mixins.scss

- _./components_ file for our reusable components across the app, and a
  component test for each one of them with cypress.

- _./pages_ separated pages to separate logic groups from each other, and map
  each logic group to specific route.

- _./router_ file to contain our routing.

- _./stores_ file for to manage our app state, logic and api requests, while
  leveraging its reactivity.

- _App.vue & main.ts_ files to bootstrap our SPA. g
