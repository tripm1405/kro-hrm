enum Code {
  LANGUAGE_TYPE = 'LANGUAGE_TYPE',
}

class QueryKey {
  static SUB = 'CATEGORY';
  static DETAIL = `${QueryKey.SUB}_DETAIL`;
  static BY_OFFSET = `${QueryKey.SUB}_BY_OFFSET`;
  static BY_ROOT_CODE = `${QueryKey.SUB}_BY_ROOT_CODE`;
}

export default class CategoryConstant {
  static QueryKey = QueryKey;
  static Code = Code;
}