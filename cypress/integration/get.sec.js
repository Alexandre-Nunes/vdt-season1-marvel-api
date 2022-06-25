/// <reference types="cypress"/> 

describe('GET / characters', function () {
    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'professor X',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['novos vingadores'],
            active: true
        }

    ]

    before(function () {
        cy.populateCharacters(characters)
    })
    it('deve retornar uma lista de personagens', function () {
        cy.getCharacters()
            .then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
                expect(response.body.length).greaterThan(0)
            })
    })

    it('deve buscar o personagem pelo nome', () => {
        cy.searchCharacters('Logan')
            .then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('Wolverine')
                expect(response.body[0].team).to.eql(['X-men'])
                expect(response.body[0].active).to.eql(true)

            })
    })
})

describe('GET / characters/ id', () => {
    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })
    const tonyStark = {
        name: "Tony Stark",
        alias: "Homem de Ferro",
        team: ["Vingadores"],
        active: true
    }

    before(function () {
        cy.postCharacter(tonyStark)
            .then(function (response) {
                Cypress.env('characterId', response.body.character_id)

            })

    })

    it('deve buscar o personagem pelo ID', () => {
        const id = Cypress.env('characterId')
        cy.getCharactersById(id)
            .then(function (response) {
                expect(response.status).to.eql(200)

            })

    })

    it('deve retornar 404 ao buscar por id não cadastrado', () => {
        const id = '62b72cb961ef0c1ce106eb2f'
        cy.getCharactersById(id)
            .then(function (response) {
                expect(response.status).to.eql(404)

            })
    })

})
