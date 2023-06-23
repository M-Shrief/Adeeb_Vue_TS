# All in TypeScript, front-end for "Adeeb أديب" developed with Vuejs, Pinia and vue-router.

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

### Currently Working on

- Making better component tests and follow best practices.
- Handling authentication cookies and tokens better.
- using OpenProps for styling, and adding Dark/light modes.
