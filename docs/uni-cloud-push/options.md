> 需要HBuilderX 3.5.1 及其以上版本支持

options 参数主要用于实现部分厂商支持但不常用的功能。详情查看：[https://docs.getui.com/getui/server/rest_v2/third_party/](https://docs.getui.com/getui/server/rest_v2/third_party/)

需注意，个推文档中的示例代码与在 uni-push 中的使用存在差异。个推代码示例如下：
```js
{
  "android":{
    "ups":{
      "notification":{
        // ...其他push_channel参数略
      },
      "options":{
        "HW":{
          "/message/android/ttl":"86400s"
        }
      }
    }
  }
}
```

而 uni-push 简化了代码，无需 “android.ups”。例如，要实现发送消息时在小米通道上对 app 版本号进行筛选，完整示例代码为：
```js
const pushManager = uniCloud.getPushManager({"appId":"__UNI__TEST123"})
return await pushManager.sendMessage({
  title:"消息标题",
  content:"消息内容",
  // ...其他参数略，可参考：https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#%E5%85%A5%E5%8F%82%E8%AF%B4%E6%98%8E
  options: {
    "XM": {
      "/extra.app_version": "v3.3.0"
    }
  }
})
```




<div class="weixin-support">
    <div class="weixin-support-focus">
        <img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/weixin.png" alt="" class="weixin-support-icon">
        联系
        <br>
        个推
    </div>
    <div class="weixin-support-content">
		<img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/support.jpg" alt="" class="weixin-support-icon">
       微信扫一扫
		<br>
        随时联系个推技术支持
    </div>
</div>

<style>
.weixin-support {
  position: fixed;
  z-index: 10;
  bottom: calc(10% + 265px);
  right: 230px;
}
@media screen and (max-width: 1499px) {
	.weixin-support {
	  right: 10px;
	}
}
.weixin-support img{
	background: #0591F0;
}
.weixin-support-focus {
  padding: 10px 8px;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  background: #0591F0;
  box-shadow: 0px 4px 8px rgba(0, 105, 202, 0.24);
  border-radius: 2px;
}
.weixin-support-focus .iconfont{
  display: block;
  font-size: 16px;
  text-align: center;
}
.weixin-support-icon{
  width: 30px;
  display: block;
  margin-bottom: 2px;
  margin-top: -4px;
}
.weixin-support-content {
  z-index: 10;
  display: none;
  position: absolute;
  right: 50px;
  top: -100px;
  background-color: #fff;
  padding: 20px;
  margin-right: 10px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 200px;
  font-size: 14px;
  box-shadow: 0 0 10px #ccc;
}
.weixin-support:hover .weixin-support-content{
  display: block;
}
.weixin-support-content img{
  display: block;
  height: 200px;
  width: 200px;
}
</style>