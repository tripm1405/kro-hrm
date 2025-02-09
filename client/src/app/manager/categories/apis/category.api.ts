import { API_DOMAIN } from '~common/utils/api.util';

export default class CategoryApi {
  static genSub = () => `${API_DOMAIN}/categories`;
  static genGetById = (id: string) => `${CategoryApi.genSub()}/${id}`;
  static genGetByOffset = () => CategoryApi.genSub();
  static genGetByRootCode = () => `${CategoryApi.genSub()}/by-root-code`;
  static genCreate = () => CategoryApi.genSub();
  static genPatchUpdate = (id: string) => `${CategoryApi.genSub()}/${id}`;
  static genDel = (id: string) => `${CategoryApi.genSub()}/${id}`;
}
