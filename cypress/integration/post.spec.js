describe('POST / characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })

    it('Deve cadastrar uma personagem', function () {
        const character = {
            name: 'Wanda Maxinoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('Validar campos obrigatórios', function () {
        it('Não deve cadastrar usuário seme o name, pois se trata de um campo obrogatório', function () {
            const character = {
                age: 30,
                alias: 'Feiticeira Escarlate',
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.message).to.eql('Validation failed')
                })
        })
    
        it('Não deve cadastrar usuário sem o alias, pois se trata de um campo obrogatório', function () {
            const character = {
                name: 'Wanda Maxinoff',
                age: 30,
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.message).to.eql('Validation failed')
                })
        })
    
        it('Não deve cadastrar usuário sem o team, pois se trata de um campo obrogatório', function () {
            const character = {
                name: 'Wanda Maxinoff',
                age: 30,
                alias: 'Feiticeira Escarlate',
                active: true
            }
    
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.message).to.eql('Validation failed')
                })
        })
    
        it('Não deve cadastrar usuário sem a informação de active, pois se trata de um campo obrogatório', function () {
            const character = {
                name: 'Wanda Maxinoff',
                age: 30,
                alias: 'Feiticeira Escarlate',
                team: ['Vingadores'],
            }
    
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.message).to.eql('Validation failed')
                })
        })
    
    });

  

    context('Quando usuário já existe', function () {

        const character = {
            name: 'Pietro Maxinoff',
            alias: 'Mercurio',
            team: ['Vingadores da costa oeste'],
            active: true
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('Não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })
})

