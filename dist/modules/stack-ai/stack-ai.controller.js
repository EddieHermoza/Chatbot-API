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
exports.StackAIController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const stack_ai_service_1 = require("./stack-ai.service");
const analytics_query_params_1 = require("./query-params/analytics-query-params");
const file_interceptor_decorator_1 = require("../../common/decorators/file-interceptor.decorator");
const upload_images_decorator_1 = require("../../common/decorators/upload-images.decorator");
const upload_websites_dto_1 = require("./dto/upload-websites.dto");
let StackAIController = class StackAIController {
    constructor(Stack) {
        this.Stack = Stack;
    }
    getDocuments() {
        return this.Stack.getDocuments();
    }
    uploadDocuments(files) {
        return this.Stack.uploadDocument(files);
    }
    getWebsites() {
        return this.Stack.getWebsites();
    }
    uploadWebsites(urls) {
        return this.Stack.uploadWebsites(urls);
    }
    getAnalytics(query) {
        return this.Stack.getAnalytics(query);
    }
};
exports.StackAIController = StackAIController;
__decorate([
    (0, common_1.Get)('/documents'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StackAIController.prototype, "getDocuments", null);
__decorate([
    (0, file_interceptor_decorator_1.UseFilesInterceptor)(),
    (0, common_1.Post)('/upload-documents'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, upload_images_decorator_1.UploadFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], StackAIController.prototype, "uploadDocuments", null);
__decorate([
    (0, common_1.Get)('/websites'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StackAIController.prototype, "getWebsites", null);
__decorate([
    (0, common_1.Post)('/upload-websites'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_websites_dto_1.UploadWebsitesDto]),
    __metadata("design:returntype", void 0)
], StackAIController.prototype, "uploadWebsites", null);
__decorate([
    (0, common_1.Get)('/Analytics'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_params_1.AnalyticsQueryParams]),
    __metadata("design:returntype", void 0)
], StackAIController.prototype, "getAnalytics", null);
exports.StackAIController = StackAIController = __decorate([
    (0, common_1.Controller)('stack-ai'),
    __metadata("design:paramtypes", [stack_ai_service_1.StackAIService])
], StackAIController);
//# sourceMappingURL=stack-ai.controller.js.map