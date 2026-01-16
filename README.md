This project is a serverless reactive chatbot built with HTML, CSS AND JavaScript, using backend API.

I started by creating basic structure for the chat interface using HTML.
Structures for:
- A message container.
- An input field with submit button.
- A container for suggested prompt buttons.



JavaScript is used on the FRONTED to manipulate the DOM.
It:
- Renders suggested prompts as buttons.
- Displays user messages and bot responses in the message container.
- Handles buttons clicks and user messages.

Stored the suggestedPromps in an array and rendered as buttons.
When a prompt button is clicked, its text is automatically sent as a user message and shown in the message container.

The chatbot responses are managed through the /api/chat endpoint.
The frontend sends messages to this endpoint using fetch.



BACKEND
The data is stored in the qa.json.
A path is created from /api/chat to qa.json.
Used .toLowerCase() and .trim() for the user input and compared with the data in qa.json.
When a matching response is found, it is selected and returned as JSON.
The frontend receives this JSON response via fetch and automatically displays the bot reply in the message container.
