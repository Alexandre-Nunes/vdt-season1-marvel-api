describe('DELETE / characters/ id', () => {
    const tochaHumana = {
        name: "jhony storn",
        alias: "Tocha Humada",
        team: ["Quarteto Fantástico"],
        active: true
    }

    before(function () {
        cy.postCharacter(tochaHumana)
            .then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
    })

    it('deve remover o personagem pelo ID', () => {
        const id = Cypress.env('characterId')
        cy.deleteCharactersById(id)
            .then(function (response) {
                expect(response.status).to.eql(204)
            })
    })

    it('deve retornar 404 ao remover por id não cadastrado', () => {
        const id = '62b72cb961ef0c1ce106eb2f'
        cy.deleteCharactersById(id)
            .then(function (response) {
                expect(response.status).to.eql(404)
            })
    })

})