# COVID-app
A site built to allow users to check the most up-to-date coronavirus information in their local authority area.

As well as the data, the site has a symptom checker and an area that gives movie suggestions if users are bored in lockdown.

## Contents
Section | Description
------------ | -------------
[Screenshot](#screenshot) | Screenshots of the covidwise site and links to the working site & repo.
[Functionality](#functionality) | Information on the functionality of the weather app.
[Licence](#licence) | Licence for the source code

## Screenshot
![Screenshot of working homepage](/Assets/Images/covidwise-home.PNG)
![Screenshot of working symptom tracker](/Assets/Images/covidwise-symptom-tracker.PNG)
![Screenshot of working movie page](/Assets/Images/covidwise-movies.PNG)

You can access the site via [this link](https://kvtemadden.github.io/covidwise/)

And you can access the GitHub Repo via [this link](https://github.com/kvtemadden/covidwise/)

## Functionality
On first visit, the user lands on the page and is presented with the ability to search for their local authority in order to receive information on COVID-19 cases in their area.

When a user searches, their search is added to their "search history", which displays below the form as a maximum of their three most recent searches.

This is also stored in local storage, so that when a user revisits the page (unless they clear their results or clear their local storage), their last (up to three) searches are displayed in the search history still.

Users are also able to use the symptom tracker page to select one of the three main symptoms of COVID-19. 

If they select one of these options, they're presented with the advice given by the Government and NHS to book themselves in for a test. 

Otherwise, if a user clicks search and hasn't got any symptoms then the pop up modal just displays general advice and guidance, again provided by the NHS and Government.

Finally, on the movies page, users are presented with 9 genres they can choose from to generate suggestions as to what they could watch.

Users are restricted to selecting up to 5 of the 9 genres at any one time, and can reset their search in order to pick other genres if they'd prefer to.

## Licence
> This site was created under the standard MIT licence.

![GitHub](https://img.shields.io/github/license/kvtemadden/portfolio?color=%23203333&label=LICENCED%20AS&style=for-the-badge)
