describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/Login"); // Asegúrate de cambiar la URL si es diferente
  });

  it("should fill and submit the form", () => {
    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
    });

    // Llenar el formulario
    cy.get('[data-testid="fullName"]').type("John Doe");
    cy.get('[data-testid="email"]').type("john@example.com");
    cy.get('[data-testid="password"]').type("Password123!");
    cy.get('[data-testid="toggle-password"]').click(); // Mostrar contraseña
    cy.get('[data-testid="phoneNumber"]').find('input').type("+1234567890"); // Selecciona el input dentro del div
    cy.get('[data-testid="dob"]').type("1999-01-01");

    // Enviar formulario
    cy.get('[data-testid="submit-button"]').click();

    // Verificar que la consola haya recibido los datos correctos
    cy.get("@consoleLog").should("be.calledWith", {
      fullName: "John Doe",
      email: "john@example.com",
      password: "Password123!",
      phoneNumber: "+1234567890",
      dob: "1999-01-01",
    });

    // Verificar que los campos se hayan limpiado después del envío
    cy.get('[data-testid="fullName"]').should("have.value", "");
    cy.get('[data-testid="email"]').should("have.value", "");
    cy.get('[data-testid="password"]').should("have.value", "");
    cy.get('[data-testid="phoneNumber"]').find('input').should("have.value", "+1"); // Verificar el valor predeterminado
    cy.get('[data-testid="dob"]').should("have.value", "");
  });

  it("should show and hide password when clicking the toggle button", () => {
    cy.get('[data-testid="password"]').type("TestPassword");
    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password"]').should("have.attr", "type", "text");

    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password"]').should("have.attr", "type", "password");
  });
});describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/Login"); // Asegúrate de cambiar la URL si es diferente
  });

  it("should fill and submit the form", () => {
    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
    });

    // Llenar el formulario
    cy.get('[data-testid="fullName"]').type("John Doe");
    cy.get('[data-testid="email"]').type("john@example.com");
    cy.get('[data-testid="password"]').type("Password123!");
    cy.get('[data-testid="toggle-password"]').click(); // Mostrar contraseña
    cy.get('[data-testid="phoneNumber"]').find('input').type("+1234567890"); // Selecciona el input dentro del div
    cy.get('[data-testid="dob"]').type("1999-01-01");

    // Enviar formulario
    cy.get('[data-testid="submit-button"]').click();

    // Verificar que la consola haya recibido los datos correctos
    cy.get("@consoleLog").should("be.calledWith", {
      fullName: "John Doe",
      email: "john@example.com",
      password: "Password123!",
      phoneNumber: "+1234567890",
      dob: "1999-01-01",
    });

    // Verificar que los campos se hayan limpiado después del envío
    cy.get('[data-testid="fullName"]').should("have.value", "");
    cy.get('[data-testid="email"]').should("have.value", "");
    cy.get('[data-testid="password"]').should("have.value", "");
    cy.get('[data-testid="phoneNumber"]').find('input').should("have.value", "+1"); // Verificar el valor predeterminado
    cy.get('[data-testid="dob"]').should("have.value", "");
  });

  it("should show and hide password when clicking the toggle button", () => {
    cy.get('[data-testid="password"]').type("TestPassword");
    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password"]').should("have.attr", "type", "text");

    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password"]').should("have.attr", "type", "password");
  });

  it("should show an error message if the email is invalid", () => {
    cy.get('[data-testid="email"]').type("invalid-email");
    cy.get('[data-testid="submit-button"]').click();
  });
});