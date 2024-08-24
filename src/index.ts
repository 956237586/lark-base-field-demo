import { basekit, FieldType, field, FieldComponent, FieldCode, IFormItem, FieldResultType, Field, FieldContext } from '@lark-opdev/block-basekit-server-api';
const i18n = field.t
// 通过addDomainList添加请求接口的域名
const domainList: string[] = ['api.exchangerate-api.com']
basekit.addDomainList(domainList);

// 定义捷径的i18n语言资源
const i18nMap = {
  messages: {
    'zh-CN': {
      'email': '邮箱',
    },
    'en-US': {
      'email': 'Email',
    },
  }
}
// 定义捷径的入参
type ITextValue = {
  type: 'text';
  text: string;
}
interface ParamType {
    email: ITextValue;
}
const formItem: IFormItem = {
  key: 'email',
  label: i18n('email'),
  component: FieldComponent.FieldSelect,
  props: {
    supportType: [FieldType.Text],
  },
  validator: {
    required: true,
  }
}
const formItems: IFormItem[] = [formItem]
// 定义捷径的返回结果类型
const extra = {
  icon: {
    light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
  },
  properties: [
    {
      key: 'id',
      isGroupByKey: true,
      type: FieldType.Text,
      title: 'id',
      hidden: true,
    },
    {
      key: 'email',
      type: FieldType.Text,
      title: i18n('email'),
      primary: true
    },
  ],
}
const reulstType: FieldResultType = {
  type: FieldType.Object,
  extra: extra
}
// const reulstType: FieldResultType = {
//   type: FieldType.Text,
//   // extra: extra
// }
// formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
const execute = async (formItemParams: ParamType, context: FieldContext) => {
  const { tenantKey, logID, token, timeZone, } = context
  const { email } = formItemParams;
  try {
    console.log(`logID:${logID},tenantKey:${tenantKey},token:${token},formItemParams:`)
    console.log(formItemParams)
    const emailAddress = email[0].text
    const mockText = + new Date() + '' + emailAddress
    const data = {
      id: mockText,
      email: mockText
    }
    // const data = mockText
    const code = FieldCode.Success
    const result = { code: code, data: data }
    console.log(result)
    return result
  } catch (e) {
    return {
      code: FieldCode.Error,
    }
  }
}
const resultField: Field = { i18n: i18nMap, formItems: formItems, resultType: reulstType, execute: execute }
basekit.addField(resultField);
export default basekit;