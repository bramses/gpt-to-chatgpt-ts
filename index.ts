export enum Role {
  SYSTEM,
  USER,
  ASSISTANT,
}

interface ToChatMLOptions {
  system_messages?: Array<string>;
  role?: Role;
}

interface GetMessageOptions {
  usage?: boolean;
  role?: boolean;
  isMessages?: boolean;
}

interface Message {
  role: string;
  content: string;
}

interface Response {
  id: string;
    object: string;
    created: number;
    model: string;
    usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
    choices: Array<{
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
        index: number;
    }>;
}

function strToRole(role: string): Role {
  switch (role) {
    case "system":
      return Role.SYSTEM;
    case "user":
      return Role.USER;
    case "assistant":
      return Role.ASSISTANT;
    default:
      throw new Error("Invalid role");
  }
}

export function roleToStr(role: Role): string {
  switch (role) {
    case Role.SYSTEM:
      return "system";
    case Role.USER:
      return "user";
    case Role.ASSISTANT:
      return "assistant";
    default:
      throw new Error("Invalid role");
  }
}

interface ResponseDict {
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  message?: string;
  messages?: Array<string>;
  roles?: Array<string>;
  role?: string;
}

export function toChatML(original: string, options: ToChatMLOptions = {}): Array<Message> {
  const messages: Array<Message> = [];

  if (options.system_messages !== undefined) {
    messages.push(...options.system_messages.map((msg) => ({ role: roleToStr(Role.SYSTEM), content: msg })));
  }

  const role = options.role !== undefined ? roleToStr(options.role) : roleToStr(Role.USER);
  messages.push({ role, content: original });

  return messages;
}

export function get_message(response: Response, options: GetMessageOptions = {}): ResponseDict | string {
  const response_dict: ResponseDict = {};

  if (options.usage === true) {
    response_dict.usage = response.usage;
  }

  if (options.isMessages === true) {
    response_dict.messages = response.choices.map((choice) => choice.message.content);

    if (options.role === true) {
      response_dict.roles = response.choices.map((choice) => choice.message.role);
    }
  }

  // if response_dict is not empty
  if (Object.keys(response_dict).length !== 0) {
    if (!options.isMessages || (options.isMessages && !options.isMessages)) {
      response_dict.message = response.choices[0].message.content;

      if (options.role === true) {
        response_dict.role = response.choices[0].message.role;
      }
    }

    return response_dict;
  }

  // base case just return the message
  return response.choices[0].message.content;
}
