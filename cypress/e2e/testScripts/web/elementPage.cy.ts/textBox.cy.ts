describe("Test Suite for the Text Box Section", () => {

    interface Info {
        elements: string[],
        title: string
    }
    let info: Info;

    before(() => {
        cy.fixture("testData.json").then((data: Info) => {
            info = data;
            cy.wrap(info).as("info");
        });
    });

    it("Verify the UI of the Element page", () => {
        cy.visit("/");
        cy.get(".top-card").first().click();
        cy.url().should('include', '/elements');
        cy.get('.main-header').should("have.text", "Elements");
        cy.get('.left-pannel').should("be.visible");
        cy.get("div.col-md-6").should("have.text", "Please select an item from left to start practice.");
    })

    it.only("Verify the TextBox form", () => {
        cy.visit("/");
        cy.get(".top-card").first().click();
        cy.get('span:contains("Text Box")').click();
        cy.get('form#userForm').should("be.visible");
        cy.get("#userName-label").should("have.text","Full Name");
        cy.get("#userEmail-label").should("have.text","Email");
        cy.get("#currentAddress-label").should("have.text","Current Address");
        cy.get("#permanentAddress-label").should("have.text","Permanent Address");
        cy.get("#submit").should("have.text","Submit");

    })
})