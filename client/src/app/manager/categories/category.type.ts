import {IKIdEntity} from "~core/common/types/entity.type";

export interface ICategory extends IKIdEntity {
  code: string;
  name: string;
  description?: string;
  rootId?: string;
  isDefault: boolean;
  index: number;
  createdAt: Date;
  createdById: string;
}