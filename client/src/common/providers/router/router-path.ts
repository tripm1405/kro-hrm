class Module {
  static Category = 'categories';
  static Translate = 'translates';
}

class Manager {
  static genCategoryList = () => `/manager/${RouterPath.Module.Category}`;
  static genCategoryCreate = () => `/manager/${RouterPath.Module.Category}/create`;
  static genCategoryDetail = (id: string) => `/manager/${RouterPath.Module.Category}/${id}`;
  static genTranslateList = () => `/manager/${RouterPath.Module.Translate}`;
  static genTranslateCreate = () => `/manager/${RouterPath.Module.Translate}/create`;
  static genTranslateDetail = (id: string) => `/manager/${RouterPath.Module.Translate}/${id}`;
}

export default class RouterPath {
  static Module = Module;
  static Manager = Manager;
}