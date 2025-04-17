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
const supabase_service_1 = require("../supabase/supabase.service");
const stack_ai_service_1 = require("../stack-ai/stack-ai.service");
let ChatController = class ChatController {
    constructor(chatService, supabaseService, stackAIService) {
        this.chatService = chatService;
        this.supabaseService = supabaseService;
        this.stackAIService = stackAIService;
    }
    sendQuery(requestChatDto) {
        const { userId, message } = requestChatDto;
        return this.chatService.doQuery({
            userId: userId,
            query: message,
        });
    }
    async sendMessage(body) {
        const { userId, message } = body;
        const channel = this.supabaseService.getClient().channel(`chat:${userId}`);
        await channel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log(`📡 Subscrito a chat:${userId}`);
            }
        });
        this.stackAIService.streamQuery({ userId, 'in-0': message }).subscribe({
            next: async (chunk) => {
                await channel.send({
                    type: 'broadcast',
                    event: 'chatStreamChunk',
                    payload: { chunk },
                });
            },
            complete: async () => {
                await channel.send({
                    type: 'broadcast',
                    event: 'chatStreamEnd',
                    payload: {},
                });
            },
            error: async (err) => {
                console.error('Error en stream:', err);
                await channel.send({
                    type: 'broadcast',
                    event: 'chatStreamError',
                    payload: { error: err.message },
                });
            },
        });
        return;
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
    (0, common_1.Post)('send'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        supabase_service_1.SupabaseService,
        stack_ai_service_1.StackAIService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map