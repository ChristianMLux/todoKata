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
  // filter
  it("should add 3 todos, check 2 and filter them", () => {
    cy.get("[data-cy=addTodoTf").type("Test Filter");
    cy.get("[data-cy=addTodoBtn").click();
    cy.get("[data-cy=todoCheckbox").check();

    cy.get("[data-cy=radioDone").check();
    cy.get("[data-cy=todoLi").should("not.be.hidden");

    cy.get("[data-cy=radioOpen").check();
    cy.get("[data-cy=todoLi").should("be.hidden");

    cy.get("[data-cy=radioAll").check();
    cy.get("[data-cy=todoLi").should("not.be.hidden");
  });
});
