import {IKIdEntity} from "~core/common/types/entity.type";
import { ISentence } from '~app/manager/sentences/sentence.type';

export interface ITranslate extends IKIdEntity {
  code: string;

  sentences: ISentence[];
}