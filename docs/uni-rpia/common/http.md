## 通过http方式调用接口

1. 新建云对象 `uni-cloud-verify-co`，云对象名字可自己修改，这里以 `uni-cloud-verify-co` 为例。

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/56e57aba-9c24-4482-b0f0-328e3b88242d.png)

在弹窗的窗口中选择云对象，输入名称 uni-cloud-verify-co

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/f1575aef-48de-4ea9-bee7-4e73ce8325dc.png)

2. 修改云对象下的 `package.json` 文件，完整替换内容如下

```js
{
  "name": "uni-cloud-verify-co",
  "dependencies": {},
  "extensions": {
    "uni-cloud-verify": {}
  },
	"cloudfunction-config": {
	  "concurrency": 1,
	  "memorySize": 512,
	  "path": "/http/uni-cloud-verify-co",
	  "timeout": 60,
	  "triggers": [],
	  "runtime": "Nodejs18"
	}
}
```

3. 修改云对象下的 `index.obj.js` 文件，完整替换内容如下
 
**注意：请修改变量apiKey的值为你的通讯密钥**

如果你自己有更好的安全验证逻辑，可自行修改 `_before` 内的逻辑

```js
const apiKey = "xxxxxx"; // 请替换为你的通讯密钥

const uniVerifyManager = uniCloud.getUniVerifyManager({
	provider: "univerify",
});

class MyError extends Error {
	constructor(err) {
		super();
		this.err = err;
	}
}

module.exports = {
	_before: function() {
		const params = this.getParams();
		const data = params[0] || params;
		// 验证通讯密钥
		if (data.key !== apiKey) {
			throw new MyError({
				code: -1,
				msg: "非法请求"
			});
		}
	},
	_after: function(error, result) {
		if (error) {
			if (error.err) {
				return error.err;
			}
			throw error;
		}
		return result
	},
	// 手机号三要素认证（简版）
	async mobile3MetaVerify(data) {
		let {
			realName,
			idCard,
			mobile,
		} = data;

		const res = await uniVerifyManager.mobile3MetaVerify({
			realName,
			idCard,
			mobile
		});

		return res;
	},
	// 手机号三要素认证（详版）
	async mobile3MetaVerifyPro(data) {
		let {
			realName,
			idCard,
			mobile,
		} = data;

		const res = await uniVerifyManager.mobile3MetaVerifyPro({
			realName,
			idCard,
			mobile
		});

		return res;
	},
	// 手机号二要素认证
	async mobile2MetaVerify(data) {
		let {
			realName,
			idCard,
			mobile,
		} = data;

		const res = await uniVerifyManager.mobile2MetaVerify({
			realName,
			idCard,
			mobile
		});

		return res;
	}

}
```

4. 上传云对象 `uni-cloud-verify-co`

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/828ae99b-21b1-4967-a987-26ef9eea4824.png)

5. 查看http接口地址，登录 [uniCloud控制台](https://unicloud.dcloud.net.cn/)，进入空间详情，点击左侧菜单 - 云函数/云对象 - 函数/对象列表，进入 uni-cloud-verify-co 的详情

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/8bd9c241-fdea-41a1-9547-86ce03005257.png)

6. 进入详情后点击右下方的复制路径按钮

![](https://web-ext-storage.dcloud.net.cn/unicloud/uni-rpia/133c5359-503f-4d4b-b648-cdf86b5a4c66.png)

假设复制的路径是：`https://xxxxxxxxxx.next.bspapp.com/http/uni-cloud-verify-co`

则

请求手机号三要素认证（简版）的完整http请求地址为：

GET请求

```
https://xxxxxxxxxx.next.bspapp.com/http/uni-cloud-verify-co/mobile3MetaVerify?realName=姓名&idCard=身份证&mobile=手机号&key=通讯密钥
```

请求手机号三要素认证（详版）的完整http请求地址为：

GET请求

```
https://xxxxxxxxxx.next.bspapp.com/http/uni-cloud-verify-co/mobile3MetaVerifyPro?realName=姓名&idCard=身份证&mobile=手机号&key=通讯密钥
```

请求手机号二要素认证的完整http请求地址为：

GET请求

```
https://xxxxxxxxxx.next.bspapp.com/http/uni-cloud-verify-co/mobile2MetaVerify?realName=姓名&mobile=手机号&key=通讯密钥
```

