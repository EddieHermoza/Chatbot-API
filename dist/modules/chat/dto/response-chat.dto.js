"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseChatDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseChatDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String }, userId: { required: true, type: () => String } };
    }
}
exports.ResponseChatDto = ResponseChatDto;
//# sourceMappingURL=response-chat.dto.js.map