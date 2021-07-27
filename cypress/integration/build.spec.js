// welcome, this is an todo app kata

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  // check initial 'checked'-state
  it("radio all should be checked", () => {
    cy.get("[data-cy=radioAll").should("be.checked");
  });
});
