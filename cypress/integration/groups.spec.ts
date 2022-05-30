describe('Groups page', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })

    it('should display the groups page', () => {
        cy.get('.flex-row > :nth-child(1)').eq(0).click()
        cy.get('[href="/groups"]').eq(1).click({ force: true })
        expect(cy.contains('Kollokviegrupper')).to.exist
    })

    it('should display the second tab', () => {
        cy.visit('/groups')
        cy.get('.h-12 > .justify-between > .flex > :nth-child(2) > .h-full')
            .eq(0)
            .click()
        expect(cy.contains('Lag ny Gruppe')).to.exist
    })
    it('should navigate to create new group', () => {
        cy.visit('/groups')
        cy.get(
            '.h-12 > .justify-between > .flex > :nth-child(2) > .h-full'
        ).click()
        cy.get('.flex-wrap > :nth-child(2)').click({ force: true })
        expect(cy.contains('Lag ny Gruppe')).to.exist
    })
})

export {}
