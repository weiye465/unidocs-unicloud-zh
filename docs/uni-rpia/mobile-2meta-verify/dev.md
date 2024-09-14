# 开发指南

> 注意：暂只支持连接云端运行，不支持本地调试

## 接口说明

通过对比权威数据源，对用户上传的姓名、手机号进行验证，校验此二要素是否一致

- 只支持移动，电信，联通下发的手机卡，广电号暂不支持

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

### 获取手机号二要素认证结果@mobile2metaverify

接口名：mobile2MetaVerify

你可以在调用 extStorageManager.mobile2MetaVerify 前执行一些自己的业务逻辑，判断用户是否有权限执行此API等等

**云端代码**

```js
const uniVerifyManager = uniCloud.getUniVerifyManager({
	provider: "univerify"
});
let verifyRes = await uniVerifyManager.mobile2MetaVerify({
	realName: "姓名",
	mobile: "手机号",
});
console.log('认证结果: ', verifyRes.data);
```

**请求参数**

|参数名		|类型		|必填	|默认值	|说明		|
|:-				|:-:		|:-:	|:-:		|:-			|
|realName	|String	|是		|-			|姓名		|
|mobile		|String	|是		|-			|手机号	|

**响应参数**

响应字段如下，响应通用字段已省略，详细见[响应公共字段](#publicreturn)

|名称				|类型		|必须返回	|描述																																												|
|:-					|:-:		|:-:			|:-																																													|
|status			|Number	|是				|认证结果，1-通过 2-不通过 3-查无结果 0-待定																										|
|reasonType	|Number	|否				|原因详情：<br/>2-认证不一致	<br/>3-查无此手机号	<br/>4-认证信息格式错误	<br/>7-结果获取失败，请重试	|
|logId			|String	|是				|本次请求日志id，可以根据该标识在控制台查询结果																									|
|isPayed		|Number	|是				|本次请求是否收费标识，1代表收费，0代表不收费																										|
|mobileType	|String	|是				|运营商类型：1-移动，2-联通，3- 电信，9,-未知																										|

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