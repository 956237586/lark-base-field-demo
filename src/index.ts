import { basekit, FieldType, field, FieldComponent, FieldCode, IFormItem, FieldResultType, Field, FieldContext, AuthorizationType, Authorizations,Authorization } from '@lark-opdev/block-basekit-server-api';
const i18n = field.t
// 通过addDomainList添加请求接口的域名
const domainList: string[] = ['localhost']
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
const formItem1: IFormItem = {
  key: 'indexColumn',
  label: 'indexColumn',
  component: FieldComponent.FieldSelect,
  props: {
    supportType: [
      FieldType.AutoNumber
    ],
  },
  validator: {
    required: true,
  }
}
const formItem2: IFormItem = {
  key: 'email',
  label: i18n('email'),
  component: FieldComponent.FieldSelect,
  props: {
    supportType: [
      FieldType.Text
    ],
  },
  validator: {
    required: true,
  }
}
const formItems: IFormItem[] = [
  // formItem1,
  formItem2,
]
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
  const { tenantKey, logID, token, timeZone, baseSignature, packID } = context
  const baseID = context.app.baseID;
  const tableId = context.app.tableID;
  const { email } = formItemParams;
  try {
    console.log(`logID:${logID},tenantKey:${tenantKey},token:${token},packID:${packID},baseID:${baseID},tableID:${tableId},baseSignature:${baseSignature},formItemParams:`)
    console.log(formItemParams)
    const { fetch } = context;
    // 发起带Query的请求文本数据
    const query = new URLSearchParams({
      param1: 'value1',
    });
    // 发起 POST 请求text数据
    const payload = {
      param2: 'value2',
    }
    fetch(`http://localhost:8000?${query.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, 'feishu').then(res => res.text());
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
const feishuAuth: Authorization = {
  id: 'feishu',// 授权的id，用于context.fetch第三个参数以区分该请求使用哪个授权
  platform: 'feishu_user',// 需要与之授权的平台,比如baidu(必须要是已经支持的三方凭证,不可随便填写,如果想要支持更多的凭证，请填写申请表单)
  type: AuthorizationType.HeaderBearerToken,
  required: true,// 设置为选填，用户如果填了授权信息，请求中则会携带授权信息，否则不带授权信息
  instructionsUrl: "https://www.feishu.com",// 帮助链接，告诉使用者如何填写这个apikey
  label: '飞书授权',
  icon: {
    light: '',
    dark: ''
  }
}
const resultField: Field = { authorizations:  [feishuAuth], i18n: i18nMap, formItems: formItems, resultType: reulstType, execute: execute }
basekit.addField(resultField);
export default basekit;