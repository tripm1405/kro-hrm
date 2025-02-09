import {IKIdEntity} from "~core/common/types/entity.type";
import { ITranslate } from '~app/manager/translates/translate.type';

export interface ISentence extends IKIdEntity {
  rootId: string;
  typeId: string;
  content: string;
  root: ITranslate;
}