This project is a serverless reactive chatbot built with HTML, CSS AND JavaScript, using backend API

I started by creating basic structure for the chat interface using HTML.
structures for:
- a message container
- an input field with submit button
- a container for suggested prompt buttons



JavaScript is used on the FRONTED to manipulate the DOM.
it:
- renders suggested prompts as buttons
- displays user messages and bot responses in the message container
- handles buttons clicks and user messages

stored the suggestedPromps in an array and rendered as buttons.
when a prompt button is clicked, its text is automatically sent as a user message and shown in the message container.

The chatbot responses are managed through the /api/chat endpoint.
The frontend sends messages to this endpoint using fetch.



BACKEND
qa.json is where de data is stored.
a path is created from /api/chat to qa.json.
used .toLowerCase() and .trim() for the user input and compared with the data in qa.json.
when a matching response is found, it is selected and returned as JSON.
the frontend receives this JSON response and displays the bot reply automatically in the message container.
