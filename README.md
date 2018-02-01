[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Blisst

A simple to-do list application that makes API requests to get information
on a specific user's lists and tasks.

- [API](https://github.com/quidprocrow/rails-api-project)

## Technologies Used
- Ruby on Rails - [see here](https://github.com/quidprocrow/rails-api-project).
- Javascript
- JSON
- HTML5
- CSS3
- PostgreSQL

## User Stories

As a user, I want to be able to create a list, and access it again later.
As a user, I want to name my list.
As a user, I want to be able to make more than one list.
As a user, I want to add items to my list.
As a user, I want to be able to delete items.
As a user, I want to be able to update items.
As a user, I want to be able to destroy lists, and so all list items.

## Wireframes

See [here](https://ibb.co/nzhk1w).

## Development Journey
Unfortunately, this has not yet reached my dream: my hope was to make list items
archiveable, because the best part of a to-do list is watching things check off.
Hence the title, #Blisst, like bliss and hashtag-blessed. You're in a good place
when you're getting things done and still have more to do.

As it is, after building the API, I wanted most actions to be grounded in the lists
themselves. I wanted list items to be editable (everyone makes mistakes), and deleteable.
The success of most API actions initiates some sort of get request, so that
the information on the page always reflects the most accurate version.


## Future Development

1. Archiving
2. Catharsis page (loads item, asks why it isn't done, asks if you did your best.)

## Gratitude

1. Shaun White, Sarah Burke and Brian Keegan all kindly reviewed my deployments for errors.
2. Kostant Stanton was a tremendous help with serialization issues, then later
advised me on how best to change validation on my API.
