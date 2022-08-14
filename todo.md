# todo

- endpoint for 'closing' a vote -- votes should have two states: open/closed (people cannot vote if closed, READONLY)
- admin functionality: superuser can make other users admins
- admins can: make votes, close/delete their own votes (maybe reopen option?)
- superuser: can (un)admin people and close/delete all votes

- persist vote through refreshes using some kind of frontend local storage?
- make user press a button to redo vote if they have already voted ... (this choice is saved in refresh in storage)

- style admin page: menu selector for current component (create tab, active sessions with cancel, goto etc)
- style vote creation page
- show 'currently winning' in vote listing

- API key support (use JWT instead of session => auth token makes more sense in this context)
- orm migration instead of synch
	- https://wanago.io/2019/01/28/typeorm-migrations-postgres/

- more types of votes, single choice, top 3, pick 3, scoring, etc
