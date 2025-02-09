export default class FormUtil {
  static convertObjToFormData(props: {
    formData?: FormData,
    data?: Record<string, any>,
    parentKey?: string
  }): FormData {
    const {formData, data, parentKey} = {
      formData: new FormData(),
      ...props,
    };
    
    function handle(props: {
      formData?: FormData,
      data?: any,
      parentKey?: string
    }): void {
      const {formData, data, parentKey} = {
        formData: new FormData(),
        ...props,
      };

      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          handle({
            formData: formData,
            data: data[key],
            parentKey: parentKey ? `${parentKey}[${key}]` : key,
          })
        });
      } else {
        const value = data == null ? '' : data;

        formData.append(parentKey!, value);
      }
    }

    handle({
      formData: formData,
      data: data,
      parentKey: parentKey,
    });
    return formData;
  }
}