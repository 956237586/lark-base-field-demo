"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const i18n = block_basekit_server_api_1.field.t;
// 通过addDomainList添加请求接口的域名
const domainList = ['localhost'];
block_basekit_server_api_1.basekit.addDomainList(domainList);
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
};
const formItem1 = {
    key: 'indexColumn',
    label: 'indexColumn',
    component: block_basekit_server_api_1.FieldComponent.FieldSelect,
    props: {
        supportType: [block_basekit_server_api_1.FieldType.Text, block_basekit_server_api_1.FieldType.AutoNumber],
    },
    validator: {
        required: true,
    }
};
const formItem2 = {
    key: 'email',
    label: i18n('email'),
    component: block_basekit_server_api_1.FieldComponent.FieldSelect,
    props: {
        supportType: [block_basekit_server_api_1.FieldType.Text],
    },
    validator: {
        required: true,
    }
};
const formItems = [
    formItem1,
    formItem2,
];
// 定义捷径的返回结果类型
const extra = {
    icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
    },
    properties: [
        {
            key: 'id',
            isGroupByKey: true,
            type: block_basekit_server_api_1.FieldType.Text,
            title: 'id',
            hidden: true,
        },
        {
            key: 'email',
            type: block_basekit_server_api_1.FieldType.Text,
            title: i18n('email'),
            primary: true
        },
    ],
};
const reulstType = {
    type: block_basekit_server_api_1.FieldType.Object,
    extra: extra
};
// const reulstType: FieldResultType = {
//   type: FieldType.Text,
//   // extra: extra
// }
// formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
const execute = async (formItemParams, context) => {
    const { tenantKey, logID, token, timeZone, baseSignature, packID } = context;
    const baseID = context.app.baseID;
    const tableId = context.app.tableID;
    const { email } = formItemParams;
    try {
        console.log(`logID:${logID},tenantKey:${tenantKey},token:${token},packID:${packID},baseID:${baseID},tableID:${tableId},baseSignature:${baseSignature},formItemParams:`);
        console.log(formItemParams);
        const { fetch } = context;
        // 发起带Query的请求文本数据
        const query = new URLSearchParams({
            param1: 'value1',
        });
        // 发起 POST 请求text数据
        const payload = {
            param2: 'value2',
        };
        fetch(`http://localhost:8000?${query.toString()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }, 'feishu').then(res => res.text());
        const emailAddress = email[0].text;
        const mockText = +new Date() + '' + emailAddress;
        const data = {
            id: mockText,
            email: mockText
        };
        // const data = mockText
        const code = block_basekit_server_api_1.FieldCode.Success;
        const result = { code: code, data: data };
        console.log(result);
        return result;
    }
    catch (e) {
        return {
            code: block_basekit_server_api_1.FieldCode.Error,
        };
    }
};
const feishuAuth = {
    id: 'feishu', // 授权的id，用于context.fetch第三个参数以区分该请求使用哪个授权
    platform: 'feishu_user', // 需要与之授权的平台,比如baidu(必须要是已经支持的三方凭证,不可随便填写,如果想要支持更多的凭证，请填写申请表单)
    type: block_basekit_server_api_1.AuthorizationType.HeaderBearerToken,
    required: true, // 设置为选填，用户如果填了授权信息，请求中则会携带授权信息，否则不带授权信息
    instructionsUrl: "https://www.feishu.com", // 帮助链接，告诉使用者如何填写这个apikey
    label: '飞书授权',
    icon: {
        light: '',
        dark: ''
    }
};
const resultField = { authorizations: [feishuAuth], i18n: i18nMap, formItems: formItems, resultType: reulstType, execute: execute };
block_basekit_server_api_1.basekit.addField(resultField);
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBOE07QUFDOU0sTUFBTSxJQUFJLEdBQUcsZ0NBQUssQ0FBQyxDQUFDLENBQUE7QUFDcEIsMkJBQTJCO0FBQzNCLE1BQU0sVUFBVSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDMUMsa0NBQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFbEMsZ0JBQWdCO0FBQ2hCLE1BQU0sT0FBTyxHQUFHO0lBQ2QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO0tBQ0Y7Q0FDRixDQUFBO0FBU0QsTUFBTSxTQUFTLEdBQWM7SUFDM0IsR0FBRyxFQUFFLGFBQWE7SUFDbEIsS0FBSyxFQUFFLGFBQWE7SUFDcEIsU0FBUyxFQUFFLHlDQUFjLENBQUMsV0FBVztJQUNyQyxLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLElBQUksRUFBQyxvQ0FBUyxDQUFDLFVBQVUsQ0FBQztLQUNuRDtJQUNELFNBQVMsRUFBRTtRQUNULFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFBO0FBQ0QsTUFBTSxTQUFTLEdBQWM7SUFDM0IsR0FBRyxFQUFFLE9BQU87SUFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNwQixTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO0lBQ3JDLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRSxDQUFDLG9DQUFTLENBQUMsSUFBSSxDQUFDO0tBQzlCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUE7QUFDRCxNQUFNLFNBQVMsR0FBZ0I7SUFDN0IsU0FBUztJQUNULFNBQVM7Q0FDVixD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