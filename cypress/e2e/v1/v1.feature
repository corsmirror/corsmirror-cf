Feature: v1
  Scenario: I get 400 error when I don't pass URL querystring
    Given I make a "GET" request to "/v1"
      | failOnStatusCode | false |
    Then I see response status 400
      And I see response body "Invalid URL string."

  Scenario: I see example page
    Given I visit "/v1?url=http://example.com"
      | failOnStatusCode | false |
    Then I see heading "Example Domain"
