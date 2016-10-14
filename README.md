# Personal Capital Frontend Test

## Implemented features
* Search does not begin until at least 3 characters entered to show more relevant results
* Search starts after user pauses typing to reduce number of API calls
* When browser is narrow, layout changes to 1-column layout
* Results categorized by type
* Results truncated

## To do
* Ignore duplicates in data (better to fix in backend)

## Instructions
Write a single page app that allows us users to search for financial institutions of their interest. You will be provided a data feed that contains a list of financial institutions in a json format (sample format below). The app should contain a text input. When the user enters some text into the text input, the app should use the provided data feed to search product names for the term the user entered into the text input. When the results are returned you should display the results in the same page. We don't expect the results to look gorgeous, but some thought should be put into how the results are displayed so they are understandable by the user and follow responsive layout. Here are few guidelines for user interaction and design.
Each product has a type such as bank, credit card, etc. Use this data to further organize search results.

## Additional Requirements
You may use a javascript library like jQuery, angular, etc. to do DOM manipulation and make AJAX requests as well as any plugins you like that provide additional interesting functionality. You may not use any plugin that already does for you a core part of this challenge, specifically, no autocomplete plugins.

## Deliverables
A github repo containing all html, css and js files you are using in the project as well as a readme.md with any additional notes you want us to consider.

## Sample format of the data feed (the entire data feed will be provided)
```json
{
    "products": [
        {
            "name": "American Express Cards (US)",
            "url": "https://www.americanexpress.com",
            "type": "CREDIT_CARD"
        },
        {
            "name": "ADP Retirement Services - 401k (US)",
            "url": "http://www.adp.com/solutions/employer-services/retirement-services.aspx",
            "type": "INVESTMENT"
        },
        {
            "name": "American Express Bank (Personal Savings) (US) - Bank",
            "url": "https://www.americanexpress.com/?inav=NavLogo",
            "type": "BANK"
        }
    ]
}
```
