# uniCloud 软件版

## 产品介绍

[uniCloud官网](https://doc.dcloud.net.cn/uniCloud/)介绍的uniCloud，默认都是`uniCloud serverless版`。

`uniCloud serverless版`基于云计算的`serverless`技术实现，后端逻辑代码运行在云厂商的服务器（容器）中，服务器（容器）不跟具体开发者关联绑定，会随着终端用户量的变化自动弹性增减或收缩，开发者对服务器的具体型号、配置等无感。

现实中，部分开发者因合规要求（如数据必须在公司内网），或需要对后端服务器有更强的可控性，希望uniCloud能部署在自己机房内或自己的云厂商账号下，因此，`uniCloud软件版`应运而生。

### uniCloud软件版有哪些特点？

从开发工具、API、生态各维度，软件版和serverless版没有差别。开发者基于serverless版编写的uniCloud项目源码，可以平滑部署到软件版，前端uni-app代码、后端云函数、云对象等代码，均无需修改。

相比serverless版，`软件版`最主要的差别如下：
- 开发者需要单独购买服务器，自己安装操作系统（目前仅支持`linux`操作系统）；
- 开发者自己购买云存储、开通CDN加速产品；
- 开发者自己安装数据库，或者购买mongodb实例；
- 开发者自己处理负载均衡，自己负责日常运维。

而如上工作，`serverless版`均无需进行，serverless版通过`服务空间`的概念，将云函数、云存储、云数据库统一封装，开发者可一键开通所有业务，不需要额外去开通云存储及CDN，也无需去安装或购买云数据库实例。

进一步解释，uniCloud软件版实际上是一个`支持uniCloud语法的Node开发框架`。

你可以更具象化理解：uniCloud软件版就是`支持uniCloud语法的类Egg.js框架`。

> 和Egg.js框架差异：uniCloud软件版内置有定制版本的Node.js运行时，并且仅可在内置的定制Node.js上运行，不支持使用开发者安装的Node.js环境。

uniCloud软件版，作为一个开发框架，仅负责云函数、云对象的执行，支持在云函数中连接开发者自己的对象存储和数据库。而这些对象存储和数据库，需要开发者自己去购买开通，uniCloud软件版本身没有内置。

存储方面，uniCloud软件版目前支持如下3种存储方案：
- 本地存储：文件存储和uniCloud软件版在同一台服务器上；
- 阿里云OSS
- 腾讯云COS

数据库方面，uniCloud软件版仅支持`mongodb`，支持本地服务器上安装的mongodb，也支持在云厂商购买单独的mongodb实例。

## 安装指南

::: warning 注意
1. 为了与serverless版保持一致，软件版目前仅支持`mongo 4.0` 版本
2. uniCloud软件版内置的定制`node.js`版本为`16.20.2`
:::


### 系统要求

**系统最低配置**

CPU >= 4核

内存 >= 4G

硬盘 >= 40G

**操作系统要求**

> 要求内核版本 >= 4.18, glibc >= 2.28

RHEL >= 8.1 或更高版本

Ubuntu >= 20.04 或更高版本

CentOS >= 8.5 或更高版本 (官方已停止维护，不推荐作为生成环境使用)

银河麒麟高级服务器操作系统V10 

**Linux 安装先决条件**

- gcc >= 8.5 或更高版本

可以通过 Linux 包管理工具安装：

- CentOS、RHEL: `sudo yum install gcc`
- Ubuntu: `sudo apt-get install gcc`

### 获取安装软件

uniCloud软件版是付费软件，你需要先发邮件到`bd@dcloud.io`，通过商务采购后才能获得。

获得安装软件后，你需要将安装包上传到自己的服务器，然后登录服务器，进行文件解压；

```
# 创建uniCloud目录，需要root用户权限
mkdir /uniCloud
# 解压安装包
tar -zxvf [version].tar.gz -C /uniCloud
```


### 获取激活license

uniCloud软件版的license是和服务器硬件绑定的，激活软件之前需要先执行扫描操作：
- 下载[uniCloud-scan](https://web-ext-storage.dcloud.net.cn/unicloud/private/tools/uniCloud-scan)
- 上传 uniCloud-scan到服务器
- 在服务器上执行`./uniCloud-scan`
- 将扫描结果发给DCoud商务经理，由DCloud侧生成`LICENSE`文件
- 将`LICENSE`文件上传至`/uniCloud/`目录下

### 软件操作命令

> 所有命令请在软件版环境根目录运行

启动

`./unicloud start -s [服务空间ID]`

停止

`./unicloud stop -s [服务空间ID]`

安装云函数第三方依赖

`./unicloud install -s [服务空间ID]`


## 开发指南

### 创建服务空间

为了和serverless版保持一致的开发体验，你需要创建服务空间：
- 登录[uniCloud控制台](https://unicloud.dcloud.net.cn/) 创建DCloud服务空间，复制新建空间的SpaceId
- 登录部署uniCloud软件版的服务器，创建空间目录：
```
cd /uniCloud/spaces/
mkdir [SpaceId]
```

### 配置服务空间

在你的服务空间目录下创建`config.json`配置文件，文件内容如下：

```json
//下方为配置示例，如拷贝此内容切记去除注释
{
  "default": true, //是否为默认服务空间，一套uniCloud软件版环境下，只能有一个默认服务空间
  "spaceId": "pvt-xxx",//DCloud服务空间编号，可在uniCloud控制台查看
  "startAsDaemon": true, // 是否在后台运行; 默认 true
  "port": 7001, //端口号，可自定义，同一台服务器下，各服务空间的端口号不可重复
  "clientSecret": "xxx",//客户端通讯密钥
  "mongodb": { //mongo数据库连接配置
    "url": "mongodb://username:password@127.0.0.1:7001",//mongo数据库连接
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
    "customLogDir": "/private-cloud-env/logs" //uniCloud软件版环境日志存储路径
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


### 使用HBuilerX开发调试

> 软件版暂不支持`oss`、`cos`等存储服务的本地调试。

#### 安装override插件包

软件版环境的`mongo`、`redis`等数据库是由开发者自行购买或安装的，因此要想在`HBuilderX`中连接这些服务，需安装相关的插件包和npm依赖，并为项目添加数据库等服务的配置文件。

1. 下载并解压`override插件包`，插件包可联系`DCloud`工作人员获取。

2. 将`override插件包`目录内的文件，移至`HBuilderX安装目录/plugins/unicloud/override`目录下。

3. 安装`mongo`、`redis`数据库依赖：在`HBuilderX安装目录/plugins/unicloud`目录下，分别执行 `npm install mongodb@3.6.3` 和 `npm install redis@3.1.2`。


#### 关联服务空间

`HBuilderX`中运行`uniCloud项目`，必须关联服务空间，但HBuilderX暂不支持关联DCloud服务空间，此时你需要按照如下操作进行：
- 创建一个免费的serverless版服务空间，仅做为关联使用，无需担心费用；
- 修改配置文件：`vue2项目`的配置文件为：`vue.config.js`，`vue3项目`的配置文件为：`vite.config.js`，内容如下：

```js
//客户端DCloud服务空间连接配置示例
process.env.UNI_CLOUD_PROVIDER = JSON.stringify([{
	provider: 'dcloud',//声明为DCloud服务空间
	spaceName: 'private-space',//服务空间名称
	spaceId: 'pvt-xxx', //服务空间编号
	clientSecret: 'ba461799-fde8-429f-8cc4-4b6d306e2339',//客户端通讯密钥
	endpoint: 'http://127.0.0.1:7001'//DCloud服务空间的访问地址
}])
```

关于spaceId、clientSecret等DCloud服务空间相关信息，可在[uniCloud控制台](https://unicloud.dcloud.net.cn/)查看。

HBuilderX会尽快发版，支持关联DCloud服务空间。

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

## 运维指南

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

//注意，上述配置中用到的$clientRealIp变量并非是内置变量，需在nginx.conf文件的http模块定义后才可使用，以下为配置示例：
http {
	## Get Client Real IP
	map $http_x_forwarded_for  $clientRealIp {
		""   $remote_addr;
		~^(?P<firstAddr>[0-9\.]+),?.*$  $firstAddr;
	}
}

```


### 防火墙白名单配置

若你的服务器开启了防火墙功能，且需要访问如：`uniCloud软件版(联网版)`、`短信`、`一键登录`、`uni-ai`、`实人认证`、`uni-push`等在线业务，则需要将这些业务的API域名，添加到防火墙白名单中。

以`CentOS系统`为例，配置方式如下

```conf

# 添加域名白名单，实际配置时，请将 “DCloud API域名1/2” 替换为具体域名
sudo firewall-cmd --permanent --zone=public --add-rich-rules='rule family="ipv4" source address="DCloud API域名1" accept'
sudo firewall-cmd --permanent --zone=public --add-rich-rules='rule family="ipv4" source address="DCloud API域名2" accept'
# 添加更多域名...

# 重新加载firewalld配置：
sudo firewall-cmd --reload

```


#### 各业务API域名

- uniCloud软件版(联网版)及付费业务API域名
- - pucoa1.dcloud.net.cn
- - pucoa2.dcloud.net.cn
- - pucoabk.dcloud.net.cn

- uni-push业务API域名
- - restapi.getui.com


### 日志

uniCloud 私有云内置了完善的日志服务支持，日志分为启动日志与运行日志。

启动日志是记录 uniCloud 启动期间的所有输出日志，包括启动失败的错误日志。

运行日志是在 uniCloud 运行期间记录框架的输出日志和云函数输出日志。

#### 日志路径

启动日志放在`${HOMEDIR}/logs/${spaceId}/master`路径下，每次启动的日志独立保存。

运行时日志默认放在`${HOMEDIR}/logs/${spaceId}`路径下，可以修改服务空间配置文件中的`logger.customLogDir`字段来自定义日志目录。

如果想自定义日志路径，可参考如下配置：

```json
 {
 "logger": {
  "customLogDir": "/your/custom/dir/path"
 }
 }
```

#### 日志分类

启动日志

- `master-stdout.log` 标准输出日志，包含启动时所有日志。
- `master-stderr.log` 标准错误日志，启动时如遇到启动失败/异常，错误日志将写入此文件中，方便根据此日志排查问题。

运行日志

- `logs/client/cloudfunctions.log` 云函数运行日志。
- `${spaceId}-web.log` uniCloud 框架运行相关日志。
- `egg-web.log` uniCloud 基于 Eggjs 框架开发，Eggjs 框架内核、插件日志。
- `egg-agent.log` Eggjs 多进程模型 agent 进程日志。
- `common-error.log` uniCloud 中任何错误信息都会写入此文件内。

#### 日志切割

启动日志按照每次启动进行自动切割。

运行日志是按天切割，在每日`00:00`按照`.log.YYYY-MM-DD`文件名进行切割。

