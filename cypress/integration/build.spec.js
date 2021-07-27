// welcome, this is an todo app kata

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  // check initial 'checked'-state
  it("radio all should be checked", () => {
    cy.get("[data-cy=radioAll").should("be.checked");
  });
  // add new todo
  it("should add a new todo to the list", () => {
    cy.get("[data-cy=addTodoTf").type("Test Todo");
    cy.get("[data-cy=addTodoBtn").click();
    cy.get("[data-cy=todoList]")
      .should("have.length", 1)
      .last()
      .should("have.text", "Test Todo");
  });
});
