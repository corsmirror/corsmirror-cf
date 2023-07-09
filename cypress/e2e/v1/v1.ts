import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

const RESPONSE_ALIAS = 'response';

const getResponse = () =>
  cy.get<Cypress.Response<object>>(`@${RESPONSE_ALIAS}`);

Given('I make a GET request to {string}', (url: string) => {
  cy.request({ url, failOnStatusCode: false }).as(RESPONSE_ALIAS);
});

Then('I see response status {int}', (status: number) => {
  getResponse().should((response) => {
    expect(response.status).to.eq(status);
  });
});

Then('I see response body {string}', (body: string) => {
  getResponse().should((response) => {
    expect(response.body).to.eq(body);
  });
});
