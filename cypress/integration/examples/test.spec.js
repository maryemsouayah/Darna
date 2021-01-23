
describe("test e2e",()=>{
    /*  it("first test ",()=>{
        expect(true).to.equal(true)
    }) 
   it("successfully loads",()=>{
       cy.visit("/")
    }) 
   it('Test Inscription', () => {
   cy.visit('/');
   cy.wait(1000);
   cy.get('.posting_job > ul > :nth-child(3) > a').click()
   cy.url().should("include", "/register")
   /* cy.wait(4000);
   cy.visit('/register'); 
   cy.wait(4000);
   cy.get(':nth-child(2) > .form-row > :nth-child(1) > .form-control').clear().type("iselm khemiri");
   cy.wait(4000)
   cy.get(':nth-child(2) > .form-row > :nth-child(2) > .form-control').clear().type("1995-12-23");
   cy.wait(4000)
   cy.get(':nth-child(3) > .form-control').clear().type("Islemkh@gmail.com");
   cy.wait(4000)
   cy.get(':nth-child(4) > .form-row > :nth-child(1) > .form-control').clear().type("22584741");
   cy.wait(4000)
   cy.get(':nth-child(4) > .form-row > :nth-child(2) > .form-control').clear().type("étudiante");
   cy.wait(4000)
   cy.get(':nth-child(5) > .form-row > :nth-child(1) > .form-control').clear().type("islem1234");
   cy.wait(4000)
   cy.get(':nth-child(5) > .form-row > :nth-child(2) > .form-control').clear().type("islem1234");
   cy.wait(4000)   
   const fixtureFile = 'maryem.jpg';
   //cy.get('[data-cy="file-input"]')
   cy.get('#file-input').attachFile(fixtureFile); 
   cy.get('.form-btn').click()
   cy.wait(4000)
   cy.get('.swal2-confirm').click()
   cy.wait(4000)
   cy.get(':nth-child(2) > .form-row > :nth-child(1) > .form-control').clear().type("iselm khemiri");
   cy.wait(4000)
   cy.get(':nth-child(2) > .form-row > :nth-child(2) > .form-control').clear().type("1995-12-23");
   cy.wait(4000)
   cy.get(':nth-child(3) > .form-control').clear().type("Islemkh123@gmail.com");
   cy.wait(4000)
   cy.get(':nth-child(4) > .form-row > :nth-child(1) > .form-control').clear().type("22584741");
   cy.wait(4000)
   cy.get(':nth-child(4) > .form-row > :nth-child(2) > .form-control').clear().type("étudiante");
   cy.wait(4000)
   cy.get(':nth-child(5) > .form-row > :nth-child(1) > .form-control').clear().type("islem1234");
   cy.wait(4000)
   cy.get(':nth-child(5) > .form-row > :nth-child(2) > .form-control').clear().type("islem1234");
   cy.wait(4000)
   cy.get('.form-btn').click()
   cy.wait(4000)
   cy.get('.swal2-confirm').click()
   cy.url().should("include", "/login")
   cy.get('#signin-email').clear().type("Islemkh123@gmail.com");
   cy.wait(4000)
   cy.get('#signup-password').clear().type("islem1234");
   cy.wait(4000)
   cy.get('.form-btn').click()
   cy.wait(4000)
   cy.get('.swal2-confirm').click()
   cy.wait(4000)
   });*/
    it("successfully loads",()=>{
        cy.visit("/")
     }) 
it('Test Admin login', () => {
    cy.visit("/");
    cy.get('.posting_job > ul > :nth-child(2) > a').click()
    cy.wait(4000)
    cy.get('#signin-email').clear().type("testadmin@gmail.com");
    cy.wait(4000)
    cy.get('#signup-password').clear().type("testadmin123");
    cy.wait(4000)
    cy.get('.form-btn').click()
    cy.wait(4000)
});
it('liste des demande editer', () => {
    cy.get(':nth-child(4) > .card > .company_main_wrapper > .opening_job > div > .fa-edit').click();
    cy.wait(4000);
    cy.get('.login_form_wrapper > :nth-child(1) > .form-control').clear().type("chrigui intisar")
    cy.get(':nth-child(3) > .form-control').clear().type("intissar123@gmail.com")
    cy.wait(4000);
    cy.get('.modal-footer > .btn-primary').click();
    cy.wait(4000);
    cy.get('.swal2-confirm').click()
   // wait(1000);
})
 it('delete user', () => {
    cy.get(':nth-child(3) > .card > .company_main_wrapper > .opening_job > div > .fa-trash').click();
    cy.wait(4000); 
    cy.get('.swal2-confirm').click() 
    cy.wait(4000); 
});  
it('liste des demande details', () => {
    cy.get(':nth-child(2) > .card > .company_main_wrapper > .opening_job > h1 > a').click();
    cy.wait(4000);
    cy.get('.jp_blog_single_client_cont > a > .fa').click()
})
/* it('liste des demande delete', () => {
    // wait(3000)
    cy.get(':nth-child(3) > .card > .company_main_wrapper > .opening_job > div > .fa-trash').click();
    cy.get('.swal2-confirm').click()

 }) */
/*it('accept demande user', () => {
    cy.get(':nth-child(5) > .gc_main_navigation').click()
    cy.wait(4000) 
    cy.get(':nth-child(1) > .jp_recent_resume_box_wrapper > .DemansBtnsFlex > [role="button1"] > .fa').click();
    cy.get('.swal2-confirm').click() 
    cy.wait(1000); 
});*/
/* it('accept demande user', () => {
    cy.get(':nth-child(5) > .gc_main_navigation').click()
    cy.wait(4000) 
    cy.get(':nth-child(3) > .jp_recent_resume_box_wrapper > .DemansBtnsFlex > [role="button1"] > .fa').click();
    cy.get('.swal2-confirm').click() 
    cy.wait(4000); 
}); */

it('Test User banni', () => {
    cy.get('.posting_job > ul > :nth-child(4) > a').click()
    cy.get('#signin-email').clear().type("marwar.chrigui@gmail.com");
    cy.wait(400)
    cy.get('#signup-password').clear().type("marwa2020");
    cy.wait(400)
    cy.get('.form-btn').click()
    cy.wait(4000)
    cy.get('.swal2-confirm').click()
   }); 
 
 
}); 
