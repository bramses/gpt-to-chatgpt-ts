"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_message = exports.toChatML = exports.roleToStr = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["SYSTEM"] = 0] = "SYSTEM";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["ASSISTANT"] = 2] = "ASSISTANT";
})(Role = exports.Role || (exports.Role = {}));
function strToRole(role) {
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
function roleToStr(role) {
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
exports.roleToStr = roleToStr;
function toChatML(original, options = {}) {
    const messages = [];
    if (options.system_messages !== undefined) {
        messages.push(...options.system_messages.map((msg) => ({ role: roleToStr(Role.SYSTEM), content: msg })));
    }
    const role = options.role !== undefined ? roleToStr(options.role) : roleToStr(Role.USER);
    messages.push({ role, content: original });
    return messages;
}
exports.toChatML = toChatML;
function get_message(response, options = {}) {
    const response_dict = {};
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
exports.get_message = get_message;
