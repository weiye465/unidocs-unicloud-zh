# 开发指南

## 接口说明

通过对比权威数据源，对用户上传的姓名、身份证号和手机号进行验证，校验此三要素是否一致

- 支持携号转网，支持阿里宝卡、腾讯王卡等互联网公司与运营合作推出的手卡
- 只支持移动，电信，联通下发的手机主卡，广电号暂不支持
- 不支持物联网卡、虚拟运营商卡（如阿里小号）

## 添加 uni-cloud-verify 扩展库依赖

在需要调用此API的云函数或云对象右键，添加依赖

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/b866f119-1427-49ba-b3a1-7915cebd5624.png)

勾选 uni-cloud-verify 扩展库依赖

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/665b7307-7506-42ad-ad3f-6c7c1d59569f.png)

## API@api

### 响应公共字段@publicreturn

|字段		|类型		|说明																											|
|:-:		|:-:		|:-																												|
|errCode|Number	|为0代表请求成功，其他均为请求失败，注意，请求成功不代表验证通过	|
|errMsg	|String	|请求失败的错误描述																					|
|data		|Object	| 请求成功时，服务端返回的数据																					|

### 获取uni认证管理对象@getuniverifymanager

云端在操作前，需要先获取 uniVerifyManager 对象实例，然后再通过 uniVerifyManager.xxx 调用对应的API

**云端代码**

```js
const uniVerifyManager = uniCloud.getUniVerifyManager({
	provider: "univerify"
});
```

**请求参数**

|参数名		|类型		|必填	|默认值	|说明														|
|:-:			|:-:		|:-:	|:-:		|:-															|
|provider	|String	|是		|-			|必填，当前固定填写 univerify	即可	|

### 获取手机号三要素认证结果@mobile3metaverify

接口名：mobile3MetaVerify

你可以在调用 extStorageManager.mobile3MetaVerify 前执行一些自己的业务逻辑，判断用户是否有权限执行此API等等

**云端代码**

```js
const uniVerifyManager = uniCloud.getUniVerifyManager({
	provider: "univerify"
});
let verifyRes = await uniVerifyManager.mobile3MetaVerify({
	realName: "姓名",
	idCard: "身份证",
	mobile: "手机号",
});
console.log('认证结果: ', verifyRes.data);
```

**请求参数**

|参数名		|类型		|必填	|默认值	|说明		|
|:-				|:-:		|:-:	|:-:		|:-			|
|realName	|String	|是		|-			|姓名		|
|idCard		|String	|是		|-			|身份证	|
|mobile		|String	|是		|-			|手机号	|

**响应参数**

响应字段如下，响应通用字段已省略，详细见[响应公共字段](#publicreturn)

|名称				|类型		|必须返回	|描述																																																																					|
|:-					|:-:		|:-:			|:-																																																																						|
|status			|Number	|是				|认证结果，1-通过 2-不通过 3-查无结果 0-待定																																																			|
|reasonType	|Number	|否				|原因详情：<br/>2-认证不一致	<br/>3-该手机号查询无记录	<br/>4-认证信息有误		<br/>5-号码状态异常（空号、停机等）<br/>6-解析手机号运营商失败<br/>7-其他出错	|
|logId			|String	|是				|本次请求日志id，可以根据该标识在控制台查询结果																																																	|
|isPayed		|Number	|是				|本次请求是否收费标识，1代表收费，0代表不收费																																																			|
|mobileType	|String	|是				|运营商类型：1-移动，2-联通，3- 电信，9,-未知																																																			|

**响应体示例**

```json
{
	"errCode": 0,
	"errMsg": "",
	"data": {
		"status": 1,
		"reasonType": 1,
		"logId": "9f9def8638c74506b3f5ef17f893c8b9",
		"isPayed": 1,
		"mobileType": "3",
		"note": ""
	}
} 
```