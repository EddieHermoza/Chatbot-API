"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const request_chat_dto_1 = require("./dto/request-chat.dto");
const rxjs_1 = require("rxjs");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    sendQuery(requestChatDto) {
        const { userId, message } = requestChatDto;
        return this.chatService.doQuery({
            userId: userId,
            query: message,
        });
    }
    sendStreamQuery(requestChatDto) {
        const { userId, message } = requestChatDto;
        return this.chatService.doSreamQuery({
            userId: userId,
            query: message,
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('/query'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_chat_dto_1.RequestChatDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendQuery", null);
__decorate([
    (0, common_1.Post)('/stream-query'),
    (0, common_1.Sse)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_chat_dto_1.RequestChatDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChatController.prototype, "sendStreamQuery", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map