describe("Login Form E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Başarılı form doldurunca success sayfası açılır", () => {
    cy.get('[data-cy="email"]').type("test@example.com");
    cy.get('[data-cy="password"]').type("StrongPass1");
    cy.get('[data-cy="terms"]').check();
    cy.get('[data-cy="submit"]').should("not.be.disabled").click();
    cy.url().should("include", "/success");
    cy.get('[data-cy="success-title"]').should("contain", "Giriş başarılı");
  });

  it("Email yanlışsa hata mesajı gösterir ve buton disabled olur", () => {
    cy.get('[data-cy="email"]').type("wrongmail");
    cy.get('[data-cy="password"]').type("StrongPass1");
    cy.get('[data-cy="terms"]').check();
    cy.get('[data-cy="error-email"]').should("be.visible");
    cy.get('[data-cy="submit"]').should("be.disabled");
  });

  it("Email ve password yanlışsa 2 hata mesajı gösterir ve buton disabled olur", () => {
    cy.get('[data-cy="email"]').type("wrongmail");
    cy.get('[data-cy="password"]').type("short");
    cy.get('[data-cy="terms"]').check();
    cy.get('[data-cy="error-email"]').should("be.visible");
    cy.get('[data-cy="error-password"]').should("be.visible");
    cy.get('[data-cy="submit"]').should("be.disabled");
  });

  it("Email ve password doğru fakat şartlar kabul edilmezse buton disabled olur", () => {
    cy.get('[data-cy="email"]').type("test@example.com");
    cy.get('[data-cy="password"]').type("StrongPass1");
    cy.get('[data-cy="terms"]').uncheck();
    cy.get('[data-cy="submit"]').should("be.disabled");
  });
});