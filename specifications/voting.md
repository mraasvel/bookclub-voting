## Screen, view

- User is presented with a page to vote
- List of options: just some list of strings given as input by the user
- Each option has a set of opinions it can give
	- hate it, dislike it, no opinion (same as not selecting anything), like it, love it
- At the bottom of the list there will be a submit button for the user to submit the vote
- If a user has already voted, they can redo the vote by replacing their previous vote (this will PATCH the vote instead)

## Creation
- Admin user can only create for now (me): easy to allow others to create votes
- Creation will yield a link to the resource
	- The link will be like /vote/:id
	- The POST will return the object or at least the id of the object
	- This will be used to generate the link provided to the user
	- The user can share this with anyone and it will allow a person to vote if they have not yet done so in this vote
