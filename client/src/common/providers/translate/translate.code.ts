enum Module {
  Common = 'Common',
  Translate = 'Translate',
  Category = 'Category',
  Sentence = 'Sentence',
}

class Common {
  static Create_Button = `${Module.Common}_Create_Button`;
}

class Translate {
  static Module = Module.Translate;
  static Code = `${this.Module}_Code`;
  static List_Heading = `${this.Module}_List_Heading`;
  static Detail_Heading = `${this.Module}_Detail_Heading`;
  static Create_Heading = `${this.Module}_Create_Heading`;
  static Sider_Label = `${this.Module}_Sider_Label`;
}

class Category {
  static Module = Module.Category;
  static Code = `${this.Module}_Code`;
  static Name = `${this.Module}_Name`;
  static Description = `${this.Module}_Description`;
  static IsDefault = `${this.Module}_IsDefault`;
  static List_Heading = `${this.Module}_List_Heading`;
  static Detail_Heading = `${this.Module}_Detail_Heading`;
  static Create_Heading = `${this.Module}_Create_Heading`;
  static Sider_Label = `${this.Module}_Sider_Label`;
}

class Sentence {
  static Module = Module.Sentence;
}

export default class TranslateCode {
  static Common = Common;
  static Translate = Translate;
  static Category = Category;
  static Sentence = Sentence;
}