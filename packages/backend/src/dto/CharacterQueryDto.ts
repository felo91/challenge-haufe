export class CharacterQueryDto {
  static toUrlParams(query: { page: number }): URLSearchParams {
    const params = new URLSearchParams();
    const page = query.page;
    if (page > 1) params.append("page", page.toString());
    return params;
  }
}
