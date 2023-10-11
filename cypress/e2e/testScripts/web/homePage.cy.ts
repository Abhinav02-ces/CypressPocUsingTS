describe("Test Suite for the HomeScreen", () => {

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

    it("Verify the page title", () => {
        cy.visit("/");
        cy.title().should("eq",info.title);
    })

    it("Verify the cards count", () => {
        cy.visit("/");
        cy.get(".top-card").should("have.length", 6);
    })

    it("Verify the Cards names", () => {
        cy.visit("/");
        cy.get(".top-card").each((data: JQuery, index) => {
            expect(data.text()).equal(info.elements[index])
        })
    })
})