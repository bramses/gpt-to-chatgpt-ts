# gpt-to-chatgpt-ts
Convert GPT Completion style message to a ChatGPT call


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


### Full Example Using OpenAI TS API

```ts
const { Configuration, OpenAIApi } = require("openai");
const { toChatML, get_message } = require("gpt-to-chatgpt")
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: toChatML('this is a test')
}).then((data) => {
  console.log((get_message(data.data)));
});

// As an AI language model, I cannot provide a specific answer to the prompt, as it is too broad. However, I confirm that this is a test.
```

## Tests

This module includes a test file that can be run using the following command:

```bash
npm test
```

The tests cover the basic functionality of the toChatML() and get_message() functions, as well as some additional options.


## About the Developer

This repository was written by Bram Adams, a writer and programmer based out of NYC. 

Bram publishes a Zettelkasten, with a twice/weekly newsletter (which you can subscribe to [here](https://www.bramadams.dev/#/portal/)), is a community developer ambassador for OpenAI and does freeleance contracts (for hire!) related to AI/web dev/AR+VR. 

Bram is also the creator of [Stenography](https://stenography.dev), a API and [VSC Extension](https://marketplace.visualstudio.com/items?itemName=Stenography.stenography) that automatically documents code on save.

You can learn more about him and his work on his [website](https://www.bramadams.dev/about/).
