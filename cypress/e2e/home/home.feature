Feature: Home
  Scenario: I can see the homepage
    Given I visit "/"
    Then I see document title "CORSmirror"
      And I see text "CORSmirror is a RESTful API that provides a proxy to URLs with CORS enabled."
