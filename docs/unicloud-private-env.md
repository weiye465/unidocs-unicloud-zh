# 私有云环境项目调试部署说明文档

## 私有云环境部署说明

::: warning 注意
1. 为了与公有云保持一致，私有云环境目前仅支持`mongo 4.0` 版本数据库。
2. 私有云环境内置`node`版本为`16.20.2`。
:::

### 部署方式

uniCloud 私有化环境基于 Linux 物理机来构建的，在部署时需要将私有化环境下载至服务器上，生成 license，即可运行。

### 环境包下载

下载私有云环境包(zip文件)后，上传至服务器，并解压到指定的目录。

环境包可联系`DCloud`工作人员获取。

### 生成 license

下载获取硬件ID工具到服务器

`https://web-ext-storage.dcloud.net.cn/unicloud/private/tools/get-hardware-id`

执行`./get-hardware-id`, 获取到硬件ID

将获取到的硬件ID发送给 DCloud 生成 license 文件

将生成后的 license.txt 文件放置私有云环境根目录下即可

### 环境包下载和解压

下载私有云环境包后，上传至服务器，并解压到指定的目录。环境包可联系`DCloud`工作人员获取。

### 私有化环境启动/停止

> 在私有云环境根目录运行以下命令

启动

`./unicloud start -s [服务空间ID]`

停止

`./unicloud stop -s [服务空间ID]`


### 创建及配置服务空间

#### 创建服务空间目录

在`私有云环境根目录/spaces`目录下创建目录，并将目录命名为SpaceId。spaceId可在[uniCloud控制台](https://unicloud.dcloud.net.cn/)查看。

#### 上传云函数及数据库schema文件

将项目中的`uniCloud`目录下的`cloudfunctions`和`database`文件夹上传至服务空间目录下。

#### 服务空间配置

在服务空间目录下新增`config.json`配置文件。配置文件内容如下：

```json
//下方为配置示例，如拷贝此内容切记去除注释
{
  "default": true, //是否为默认服务空间，一套私有云环境下，只能有一个默认服务空间
  "spaceId": "pvt-xxx",//私有云服务空间编号，可在uniCloud控制台查看
  "port": 7001, //端口号，可自定义，同一台服务器下，各服务空间的端口号不可重复
  "clientSecret": "ba461799-fde8-429f-8cc4-4b6d306e2339",//客户端通讯密钥
  "mongodb": { //mongo数据库连接配置
    "url": "mongodb://127.0.0.1:27017",//数据库连接
    "database": "test", //数据库名称
    "maxPoolSize": 30, //最大连接数
    "minPoolSize": 10 //最小连接数
  },
  "storage": {//存储服务配置，如项目未使用存储服务可不配置此项
    "provider": "local",//服务商 支持local:本地存储 aliyun: 阿里云存储服务 tencent:腾讯云存储服务
    "dir": "file/upload", //文件上传目录
	"bucket": "",//存储桶名称，本地存储无需配置此项
    "cdnProtocol": "http://",//cdn协议 支持 http https
    "cdnDomain": "127.0.0.1:7001",//cdn域名
    "cdnRootPath": "/storage/file/",//cdn根目录
    "storageSecret": "xxxxxxxxxx",//本地存储服务访问密钥
  },
  "logger": { //日志服务配置
    "customLogDir": "C:\\logs\\test-space" //日志存储路径
  },
  "redis": {//redis库配置，如项目未使用redis服务可不配置此项
    "host": "127.0.0.1",//redis连接
    "port": 6379,//端口号
    "password": ""//密码
  },
  "spaceSecret": { //服务空间通讯配置
	"secretKeyId": "xxxx", //SpaceKeyID，可在uniCloud控制台查看
	"secretKey": "xxx" //SpaceSecret ，可在uniCloud控制台查看
  }
}
```

如项目中使用了存储服务，则还需额外增加存储服务的配置项。既在服务空间目录下创建`file`目录，并在`file`目录下增加`permission.json`配置文件。配置文件内容如下：

```json
//下方为配置示例，如拷贝此内容切记去除注释
{
  "*": {
    "read": true, //读权限
    "update": false,//修改权限
    "create": true,//创建权限
    "delete": "auth.uid == resource.uid"//删除权限
  }
}
```

### 域名解析及代理配置

项目测试期或上线后，通常需要以域名代替ip来访问服务空间中的云函数/云对象。下面我们提供了一个简单的域名解析和代理配置示例。配置生效后，可用`test.pvtcloud.com`代替原本的`127.0.0.1:7001`来访问服务空间中的云函数/云对象。

以`nginx`为例，配置如下：

```conf
server {
	listen        80;
	server_name  test.pvtcloud.com;
	root   D:/www/test.pvtcloud.com;
	location / {
		try_files $uri $uri/ /index.html;
	}
	location ~ (/client|/http/) {
		proxy_http_version 1.1;
		proxy_set_header Connection "keep-alive";
		proxy_set_header X-Real-IP $clientRealIp;
		proxy_set_header X-Real-PORT $remote_port;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header Scheme $scheme;
		proxy_set_header Server-Protocol $server_protocol;
		proxy_set_header Server-Name $server_name;
		proxy_set_header Server-Addr $server_addr;
		proxy_set_header Server-Port $server_port;
		proxy_pass http://127.0.0.1:7001;
	}
}

```


## 私有云项目在HBuilerX中开发、调试、发行方法说明

### 服务端配置方法说明

私有云环境的`mongo`、`redis`等数据库是由开发者自行购买或安装的，因此要想在`HBuilderX`中连接这些服务，须安装相关的插件包和npm依赖，并为项目添加数据库等服务的配置文件。

::: warning 注意
1. 由于现阶段`HBuilderX`还不支持私有云服务空间，而在`HBuilderX`中运行`uniCloud项目`必须关联服务空间，因此可以临时创建一个免费的公有云服务空间，仅做为关联使用。
2. 目前私有云还不支持`oss`、`cos`等存储服务的本地调试。
:::

#### 安装override插件包

1. 下载并解压`override插件包`，插件包可联系`DCloud`工作人员获取。

2. 将`override插件包`目录内的文件，移至`HBuilderX安装目录/plugins/unicloud/override`目录下。

3. 安装`mongo`、`redis`数据库依赖。既在`HBuilderX安装目录/plugins/unicloud`目录下，分别执行 `npm install mongodb@3.6.3` 和 `npm install redis@3.1.2`。


#### 配置数据库链接

在项目中的`uniCloud目录`下新建`config.json`文件，并按需添加配置项。

```json
//下方为配置示例，如拷贝此内容切记去除注释
{
	"mongodb": { //mongo库连接配置
	  "url": "mongodb://username:password@127.0.0.1:7001",//mongo库连接地址
	  "database": "unicloud" //数据库名称
	},
	"redis": {//redis库连接配置，项目中不使用redis服务可不配置此项
	  "host": "127.0.0.1",//host
	  "port": 6379, //端口号
	  "password": "password"//密码
	}
}
```

#### 重启HBuilderX

以上步骤完成后，需重启`HBuilderX`后方可生效。



### 客户端配置方法说明

#### 客户端连接指定的私有云服务空间调试

客户端要想连接指定的私有云服务空间，需要在项目配置文件中声明`uniCloud`服务的环境变量，配置后客户端调用`uniCloud`服务将连接配置中声明的服务空间，可用于测试环境、线上环境的本地运行调试和发行，仅在HBuilderX中本地调试无需配置此项。

私有云服务空间相关的配置信息，可在[uniCloud控制台](https://unicloud.dcloud.net.cn/)查看。

- `vue2项目`的配置文件为：`项目根目录/vue.config.js`
- `vue3项目`的配置文件为：`项目根目录/vite.config.js`

```js
//客户端私有云服务空间连接配置示例
process.env.UNI_CLOUD_PROVIDER = JSON.stringify([{
	provider: 'private',//声明为私有云服务
	spaceName: 'private-space',//服务空间名称
	spaceId: 'pvt-xxx', //服务空间编号
	clientSecret: 'ba461799-fde8-429f-8cc4-4b6d306e2339',//客户端通讯密钥
	endpoint: 'http://127.0.0.1:7001'//服务空间连接地址
}])
```
