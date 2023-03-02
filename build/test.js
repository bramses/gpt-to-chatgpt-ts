"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function test_toChatML() {
    console.log("Testing toChatML()");
    const result = (0, index_1.toChatML)("hello");
    const expected = [{ role: (0, index_1.roleToStr)(index_1.Role.USER), content: "hello" }];
    assertResult(result, expected);
    console.log("toChatML() passed");
}
function test_toChatML_with_options() {
    console.log("Testing toChatML() with options");
    const result1 = (0, index_1.toChatML)("hello", {
        system_messages: ["hi"],
        role: index_1.Role.ASSISTANT,
    });
    const expected1 = [
        { role: (0, index_1.roleToStr)(index_1.Role.SYSTEM), content: "hi" },
        { role: (0, index_1.roleToStr)(index_1.Role.ASSISTANT), content: "hello" },
    ];
    assertResult(result1, expected1);
    const result2 = (0, index_1.toChatML)("hello", {
        system_messages: ["hi"],
    });
    const expected2 = [
        { role: (0, index_1.roleToStr)(index_1.Role.SYSTEM), content: "hi" },
        { role: (0, index_1.roleToStr)(index_1.Role.USER), content: "hello" },
    ];
    assertResult(result2, expected2);
    console.log("toChatML() with options passed");
}
const test_response = {
    id: "chatcmpl-6p9XYPYSTTRi0xEviKjjilqrWU2Ve",
    object: "chat.completion",
    created: 1677649420,
    model: "gpt-3.5-turbo",
    usage: { prompt_tokens: 56, completion_tokens: 31, total_tokens: 87 },
    choices: [
        {
            message: {
                role: "assistant",
                content: "The 2020 World Series was played in Arlington, Texas at the Globe Life Field, which was the new home stadium for the Texas Rangers.",
            },
            finish_reason: "stop",
            index: 0,
        },
    ],
};
function test_get_message() {
    console.log("Testing get_message()");
    const result = (0, index_1.get_message)(test_response);
    const expected = "The 2020 World Series was played in Arlington, Texas at the Globe Life Field, which was the new home stadium for the Texas Rangers.";
    assertResult(result, expected);
    console.log("get_message() passed");
}
function test_get_message_with_options() {
    console.log("Testing get_message() with options");
    const result1 = (0, index_1.get_message)(test_response, {
        usage: true,
        role: true,
        isMessages: true,
    });
    const expected1 = {
        usage: { prompt_tokens: 56, completion_tokens: 31, total_tokens: 87 },
        messages: [
            "The 2020 World Series was played in Arlington, Texas at the Globe Life Field, which was the new home stadium for the Texas Rangers.",
        ],
        roles: ["assistant"],
    };
    assertResult(result1, expected1);
    const result2 = (0, index_1.get_message)(test_response, { usage: true, role: true });
    const expected2 = {
        usage: { prompt_tokens: 56, completion_tokens: 31, total_tokens: 87 },
        message: "The 2020 World Series was played in Arlington, Texas at the Globe Life Field, which was the new home stadium for the Texas Rangers.",
        role: "assistant",
    };
    assertResult(result2, expected2);
    const result3 = (0, index_1.get_message)(test_response, { usage: true });
    const expected3 = {
        usage: { prompt_tokens: 56, completion_tokens: 31, total_tokens: 87 },
        message: "The 2020 World Series was played in Arlington, Texas at the Globe Life Field, which was the new home stadium for the Texas Rangers.",
    };
    assertResult(result3, expected3);
    console.log("get_message() with options passed");
}
function assertResult(result, expected) {
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error(`Result ${JSON.stringify(result, null, 2)} does not match expected ${JSON.stringify(expected, null, 2)}`);
    }
}
console.log("Running tests");
test_toChatML();
test_toChatML_with_options();
test_get_message();
test_get_message_with_options();
console.log("All tests passed");
