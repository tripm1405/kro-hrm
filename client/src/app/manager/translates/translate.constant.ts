class QueryKey {
  static SUB = 'TRANSLATE';
  static DETAIL = `${QueryKey.SUB}_DETAIL`;
  static BY_OFFSET = `${QueryKey.SUB}_BY_OFFSET`;
}

export default class TranslateConstant {
  static QueryKey = QueryKey;
}