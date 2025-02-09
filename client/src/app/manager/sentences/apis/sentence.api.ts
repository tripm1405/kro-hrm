import { API_DOMAIN } from '~common/utils/api.util';

const Sentence_Api = `${API_DOMAIN}/sentences`;

export default class SentenceApi {
  static genGetByOffset = () => Sentence_Api;
  static genUpdate = (id: string) => `${Sentence_Api}/${id}`;
}
