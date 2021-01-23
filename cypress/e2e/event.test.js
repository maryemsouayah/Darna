describe("test e2e",()=>{
     it("first test ",()=>{
        expect(true).to.equal(true)
    }) 
   it("successfully loads",()=>{
       cy.visit("/")
    }) 
    it("email incorrect",()=>{
        cy.get('.posting_job > ul > :nth-child(1) > a').click();
        cy.wait(2000);
        cy.get('#signin-email').clear().type("test@gmail.com");
        cy.wait(2000);
        cy.get('#signup-password').clear().type("test55555");
        cy.wait(2000);
        cy.get('.form-btn').click()
        cy.wait(2000);
        cy.get('.swal2-confirm').click()
        
     }) 
    it("successfully connect admin",()=>{
        cy.get('.posting_job > ul > :nth-child(1) > a').click();
        cy.wait(2000);
        cy.get('#signin-email').clear().type("testadmin@gmail.com");
        cy.wait(2000);
        cy.get('#signup-password').clear().type("testadmin123");
        cy.wait(2000);
        cy.get('.form-btn').click()
     }) 
    it("add event test",()=>{
        cy.get(':nth-child(2) > .gc_main_navigation').click();
        cy.wait(2000);
        cy.visit('/Event'); 
        cy.get('.btn').click();
        cy.get('.login_form_wrapper > :nth-child(1) > .form-control').clear().type("event test darna");
        cy.wait(2000);
        cy.get(':nth-child(3) > .form-control').clear().type("description test event");
        cy.wait(2000);
        cy.get(':nth-child(4) > :nth-child(1) > .form-control').clear().type("2021-01-08");
        cy.wait(3000);
        cy.get(':nth-child(4) > :nth-child(2) > .form-control').clear().type("2021-01-10");
        cy.wait(2000);
        cy.get(':nth-child(5) > .form-control').clear().type("20");
        cy.wait(2000);
        cy.get(':nth-child(6) > .form-control').clear().type("tunis");
        cy.wait(2000);
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').clear().type("2021-01-01");
        cy.wait(2000);
        cy.get(':nth-child(7) > :nth-child(2) > .form-control').clear().type("2021-01-05");
        cy.wait(2000);
        cy.get('.modal-footer > .btn-primary').click()
        cy.wait(2000);
        cy.get('.swal2-confirm').click();
        cy.wait(2000);

     }) 
    it("edit event",()=>{
        cy.get(':nth-child(1) > .card > .card-footer > .inline > :nth-child(3) > a > .fas').click();
        cy.wait(2000);
        cy.get('.login_form_wrapper > :nth-child(1) > .form-control').clear().type("test event edit");
        cy.wait(2000);
        cy.get('.login_form_wrapper > :nth-child(2) > .form-control').clear().type("description event edit");
        cy.wait(2000);
        cy.get(':nth-child(3) > .form-control').clear().type("tunis");
        cy.wait(2000);
        cy.get(':nth-child(5) > .form-control').clear().type("10"); 
        cy.wait(2000);
        cy.get('.modal-footer > .btn-primary').click()
        cy.wait(2000);
        cy.get('.swal2-confirm').click();
        cy.wait(2000);
     }) 
    it('delete event',()=>{
        cy.get(':nth-child(4) > .card > .card-footer > .inline > :nth-child(2) > a > .fas').click();
        cy.wait(2000);
        cy.get('.swal2-confirm').click();
        cy.wait(2000);
        cy.get('.swal2-confirm').click();
        cy.wait(2000);
     })
    it('search event',()=>{
        cy.visit('/Event'); 
        cy.get('.form-inline > .form-control').clear().type("Test Event Edit");
        cy.wait(2000);
        cy.get('.form-inline > .form-control').clear()
        cy.wait(2000);
     })
    it('details event',()=>{
        cy.get(':nth-child(1) > .card > .card-header > .card-title > a').click();
        cy.wait(2000);
        cy.get('.nice-select').click();
        cy.wait(2000);
        cy.get('.list > :nth-child(2) > a').click()
    })
    it("successfully connect member",()=>{
        cy.visit('/login'); 
        cy.get('#signin-email').clear().type("emna@gmail.com");
        cy.wait(2000);
        cy.get('#signup-password').clear().type("123456");
        cy.wait(2000);
        cy.get('.form-btn').click()
        cy.wait(2000);

     }) 
    xit("participate event member",()=>{
        cy.visit('/Event'); 
        cy.get('.kv_sub_menu > .gc_main_navigation').click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .card > .card-footer > .btn').click();
        cy.wait(2000);
        cy.get('.swal2-confirm').click();
        cy.wait(2000);
     })   
}) 