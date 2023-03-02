# gpt-to-chatgpt-ts
Convert GPT Completion call to a ChatGPT call


PYTHON VERSION HERE -> https://github.com/bramses/gpt-to-chatgpt-py

## Installation

```bash
npm i gpt-to-chatgpt
```

## Functions

```ts
toChatML(text: string, options?: { system_messages?: string[], role?: Role }): Message[]
```

This function converts a string of text into an array of chat messages in ChatML format, which can be used to display a chat conversation. The options parameter allows you to specify additional options, including:

- `system_messages`: An optional array of system messages that should be included in the chat conversation.
- `role`: An optional role to assign to the chat message. The default is Role.USER.

```ts
get_message(response: any, options?: { usage?: boolean, role?: boolean, isMessages?: boolean }): string | { usage: Usage, messages?: string[], message?: string, roles?: string[] }
```

This function extracts the chat message from a GPT chat response object. The response object is expected to contain a choices array with at least one element, each of which should contain a message field with the chat message. The options parameter allows you to specify additional options, including:


- `usage`: A boolean that indicates whether to include usage statistics for the chat response. The default is false.
- `role`: A boolean that indicates whether to include the role assigned to the chat message. The default is false.
- `isMessages`: A boolean that indicates whether to return the messages as an array. The default is false.


## Usage

To use these functions, simply import them from the module:

```ts
import { toChatML, get_message, Role } from "./index";

// Use the functions here
```

## Tests

This module includes a test file that can be run using the following command:

```bash
npm test
```

The tests cover the basic functionality of the toChatML() and get_message() functions, as well as some additional options.
