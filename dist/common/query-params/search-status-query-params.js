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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchStatusQueryParams = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const paginated_query_params_1 = require("./paginated-query-params");
const class_transformer_1 = require("class-transformer");
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["en"] = "en";
    StatusEnum["dis"] = "dis";
    StatusEnum["all"] = "all";
})(StatusEnum || (StatusEnum = {}));
class SearchStatusQueryParams extends paginated_query_params_1.PaginatedQueryParams {
    constructor() {
        super(...arguments);
        this.query = '';
        this.status = null;
    }
}
exports.SearchStatusQueryParams = SearchStatusQueryParams;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Texto de búsqueda', example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchStatusQueryParams.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado',
        enum: StatusEnum,
        example: 'all',
        default: 'all',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({
        message: 'el status debe ser uno de los siguientes valores = en, dis, all',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        if (value === 'en')
            return true;
        if (value === 'dis')
            return false;
        if (value === 'all')
            return null;
        return value;
    }),
    __metadata("design:type", Boolean)
], SearchStatusQueryParams.prototype, "status", void 0);
//# sourceMappingURL=search-status-query-params.js.map