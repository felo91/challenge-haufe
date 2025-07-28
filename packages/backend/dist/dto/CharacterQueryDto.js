"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterQueryDto = void 0;
class CharacterQueryDto {
    static toUrlParams(query) {
        const params = new URLSearchParams();
        const page = query.page || 1;
        if (page > 1)
            params.append("page", page.toString());
        return params;
    }
}
exports.CharacterQueryDto = CharacterQueryDto;
//# sourceMappingURL=CharacterQueryDto.js.map