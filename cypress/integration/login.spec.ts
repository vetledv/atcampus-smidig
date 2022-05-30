describe('Cypress login', () => {
    it('should provide a valid session', () => {
        cy.login()
        cy.visit('/')
        cy.get('.mb-12 > button')
        expect(cy.contains('Logout')).to.exist
    })
})
export {}
