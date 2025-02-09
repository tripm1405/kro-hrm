import { API_DOMAIN } from '~common/utils/api.util';

export default class TranslateApi {
  static genSub = () => `${API_DOMAIN}/translates`;
  static genGetById = (id: string) => `${TranslateApi.genSub()}/${id}`;
  static genGetByOffset = () => TranslateApi.genSub();
  static genCreate = () => TranslateApi.genSub();
  static genPatchUpdate = (id: string) => `${TranslateApi.genSub()}/${id}`;
  static genUpdate = (id: string) => `${TranslateApi.genSub()}/${id}`;
  static genDel = (id: string) => `${TranslateApi.genSub()}/${id}`;
}
