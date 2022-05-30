
describe('Findgroup page', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })
    it('should display error at step 1', () => {
        cy.visit('/groups/findgroup')
        cy.scrollTo('bottom')
        cy.contains('Gå videre').eq(0).click()
        expect(cy.contains('Du må velge en skole først!')).to.exist
    })
    it('should navigate through the first step, fail second step', () => {
        cy.visit('/groups/findgroup')
        cy.get('[tabindex="0"] > .flex').click()
        cy.get(':nth-child(1) > .w-full > .px-3').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        expect(cy.contains('Velg et fag først!')).to.exist
    })
    it('should navigate through the first 2 steps, error step 3', () => {
        cy.visit('/groups/findgroup')
        cy.get('[tabindex="0"] > .flex').click()
        cy.get(':nth-child(1) > .w-full > .px-3').click()
        cy.contains('Gå videre').click()
        cy.get('.grid > :nth-child(3) > .flex').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
    })
    it('Cypress find a group, then leave', () => {
        cy.login()
        cy.visit('/groups/findgroup')
        cy.get('div').contains('Høyskolen Kristiania').click()
        cy.get('div').contains('Gå videre').click()
        cy.get('div').contains('Programmering').click()
        cy.get('div').contains('Gå videre').click()
        cy.get('div').contains('Bestått').click()
        cy.get('div').contains('Ha det gøy').click()
        cy.get('div').contains('Gå videre').click()
        cy.get('div').contains('AtCampus Testgruppe').click()
        cy.get('div').contains('Bli med').click()
        cy.get('div').contains('Gå til gruppe').click()
        cy.visit('/groups/6294a36c9fed637dcea27856')
        cy.get('div').contains('Forlat gruppe').click()
        cy.get('div').contains('Ja, jeg er sikker').click()
        cy.visit('/')
        cy.get('div').contains('Logout').click()
        expect(cy.contains('Logout')).to.exist
    })
})
export { }

