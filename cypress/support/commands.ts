// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login' as any, () => {
    cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session')

    // Set the cookie for cypress.
    // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
    // This step can probably/hopefully be improved.
    // We are currently unsure about this part.
    // We need to refresh this cookie once in a while.
    // We are unsure if this is true and if true, when it needs to be refreshed.
    cy.setCookie(
        'next-auth.session-token',
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..NULUAEKJI8eoucxt.TxeUO7aoT92iB_WtxIWq-LPYtG3lGB5PDL8n56fKYHF-ZdR-vy4UUVwJqk4AQvdYcVroF0ZfVsSq8I3Hm-79Ggo2pooAsWaJKo9WO3kj3ZXFNuyemtCnabAqHzR_banzNYvHfz9MY1HyfDf3uxlsDpNJBlyrkpcdnWWZLobi__GtBZdwShlPwVBdIOfNZfz57QD5iIBUdl_ahI8hxYGefiHsJEAmuVG-DTTfZ3lyzxiVz8_po-E7fQb6shT3-zDox29VZzXaywFgcRu2tm0ziqqL_XxCFLDNut9zhFejJESBkbebG0RVVWIi9Fjg2O2yNrtB__hZJIHmi4W8c8O10e7CcfuXmJwzP1qTzWUH6MmQWSHkUTlDeB0LbW3iMOWIJlLrhgzw3-Q11jQOLu2_PHGxNH5MnjXutyqcEe2m1V9H2NFAXWku9I5QiGLD0chlQwcawD1iugwNy9tLR0zPQZP8xM7S4o6x3sxDmeuBZ2L_vDqNHpg-Iz2V8JajZBUYKYImLP5rwEOa-YB2wQHVEJnN73FyMI8AtmDFIA3D5C3X-NCFJbGkQC5_HPO96hWopLpB1gYTzJ9qsk9WtUVGOmtLsQijFAtKlNpIYxcXKFB-FY8DNtU7owpKq4wqmxGL1NJdt9jk_PLuPbrDaPjYAh9gjH3tkHWwGC3X0y9ioPxFekAgnUD9kQDh4wWUj0J08nDXRIg7PUq4jgwTaQ7GIvInHAs-Rc3G5i78NwnPlm0lEtQ4VzFsdZtbH-HOAwfEHJ1GqEvZfglzqmG4c6uLT9aUcECBzQUMC6mWFkDNpI9oKYjC4IlycsqcunUgKdBc9wu9vvZc4MgTAmyQIHxgwEPQ3aItT9_PLDjfjpWL6Ww.duPhd4obxOPPoqVfnfi9kw'
    )
    Cypress.Cookies.preserveOnce('next-auth.session-token')
})
declare namespace Cypress {
    interface Chainable<Subject> {
        login(): void
    }
}
export {}
