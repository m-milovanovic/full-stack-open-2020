describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Milan Milovanovic',
            username: 'milanuser',
            password: 'milanpass'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        const user2 = {
            name: 'User The Second',
            username: 'user2',
            password: 'pass2'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('milanuser')
            cy.get('#password').type('milanpass')
            cy.contains('login').click()
            cy.contains('blogs')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('testFail')
            cy.get('#password').type('testFail')
            cy.contains('login').click()
            cy.get('.error').should('contain', 'invalid username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')
        })
    })

    describe('Blog app', function () {
        describe('When logged in', function () {
            beforeEach(function () {
                cy.login({ username: 'milanuser', password: 'milanpass' })
            })

            it('A blog can be created', function () {
                cy.contains('new blog').click()
                cy.get('#title').type('This is the new title')
                cy.get('#author').type('Mark Markovic')
                cy.get('#url').type('www.newtitle.com')
                cy.get('#create-blog').click()
                cy.contains('This is the new title')
            })

            describe('With one blog exisiting', function () {
                beforeEach(function () {
                    cy.contains('new blog').click()
                    cy.get('#title').type('This is the new title')
                    cy.get('#author').type('Mark Markovic')
                    cy.get('#url').type('www.newtitle.com')
                    cy.get('#create-blog').click()
                })

                it('A blog can be liked', function () {
                    cy.contains('view').click()
                    cy.get('#like-button').click()
                    cy.contains('likes 1')
                })

                it('A blog can not be deleted by user who didnt create it', function () {
                    cy.get('#logout').click()
                    cy.login({ username: 'user2', password: 'pass2' })
                    cy.contains('view').click()
                    cy.should('not.contain', 'remove')
                })

                it('A blog can be deleted by user who created it', function () {
                    cy.on('window:confirm', () => true)
                    cy.contains('view').click()
                    cy.contains('remove').click()
                    cy.contains('This is the new title').should('not.exist')
                })
            })

            describe('with 3 blogs exisiting', function () {
                beforeEach(function () {
                    cy.createBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 4 })
                    cy.createBlog({ title: 'title2', author: 'author2', url: 'url2', likes: 5 })
                    cy.createBlog({ title: 'title3', author: 'author3', url: 'url3', likes: 3 })
                })
                it('blogs should be ordered by likes', function () {
                    cy.visit('http://localhost:3000')
                    cy.get('.blog').then(list => {
                        cy.wrap(list).should('have.length', 3)
                        cy.wrap(list[0]).should('contain.text', 'title2')
                        cy.wrap(list[1]).should('contain.text', 'title1')
                        cy.wrap(list[2]).should('contain.text', 'title3')
                    })
                })
            })
        })

    })
})