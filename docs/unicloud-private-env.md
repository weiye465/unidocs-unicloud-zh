# uni云开发软件版

## 产品介绍

[uniCloud官网](https://doc.dcloud.net.cn/uniCloud/)介绍的uniCloud，默认都是`uniCloud serverless版`。

`uniCloud serverless版`基于云计算的`serverless`技术实现，后端逻辑代码运行在云厂商的服务器（容器）中，服务器（容器）不跟具体开发者关联绑定，会随着终端用户量的变化自动弹性增减或收缩，开发者对服务器的具体型号、配置等无感。

现实中，部分开发者因合规要求（如数据必须在公司内网），或需要对后端服务器有更强的可控性，希望uniCloud能部署在自己机房内或自己的云厂商账号下，因此，`uni云开发软件版`应运而生。

### uni云开发软件版有哪些特点？

从开发工具、API、生态各维度，软件版和serverless版没有差别。开发者基于serverless版编写的uniCloud项目源码，可以平滑部署到软件版，前端uni-app代码、后端云函数、云对象等代码，均无需修改。

相比serverless版，`软件版`最主要的差别如下：

- 开发者需要单独购买服务器，自己安装操作系统（目前仅支持`linux`操作系统）；
- 开发者自己购买云存储、开通CDN加速产品；
- 开发者自己安装数据库，或者购买mongodb实例；
- 开发者自己处理负载均衡，自己负责日常运维。

而如上工作，`serverless版`均无需进行，serverless版通过`服务空间`的概念，将云函数、云存储、云数据库统一封装，开发者可一键开通所有业务，不需要额外去开通云存储及CDN，也无需去安装或购买云数据库实例。

进一步解释，uni云开发软件版实际上是一个`支持uniCloud语法的Node开发框架`。

你可以更具象化理解：uni云开发软件版就是`支持uniCloud语法的类Egg.js框架`。

> 和Egg.js框架差异：uni云开发软件版内置有定制版本的Node.js运行时，并且仅可在内置的定制Node.js上运行，不支持使用开发者安装的Node.js环境。

uni云开发软件版，作为一个开发框架，仅负责云函数、云对象的执行，支持在云函数中连接开发者自己的对象存储和数据库。而这些对象存储和数据库，需要开发者自己去购买开通，uni云开发软件版本身没有内置。

存储方面，uni云开发软件版目前支持如下3种存储方案：

- 本地存储：文件存储和uni云开发软件版在同一台服务器上；
- 阿里云OSS
- 腾讯云COS

数据库方面，uni云开发软件版仅支持`mongodb`，支持本地服务器上安装的mongodb，也支持在云厂商购买单独的mongodb实例。

## 安装指南

::: warning 注意

1. 为了与serverless版保持一致，软件版目前仅支持`mongo 4.0` 版本
2. uni云开发软件版内置的定制`node.js`版本为`16.20.2`
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

**环境检测**

可以逐步运行一下命令来确认服务器配置

```
uname -r            // 查看内核发行版本号
cat /etc/os-release | grep -E "^NAME=|^VERSION="  // 查看系统版本号
ldd --version           // 查看 glibc 版本号
gcc --version           // 查看 GCC 版本号
cat /proc/cpuinfo| grep "processor"     // 查看CPU信息
free -h            // 查看内存信息
df -h             // 查看磁盘信息
```

### 获取安装软件

uni云开发软件版是付费软件，根据服务器数量及应用数量进行收费。

登录uniCloud控制台，按图所示进入uni云开发软件版页面

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031627806.png)

初次使用需在uniCloud控制台进行申请开通，开通后可以创建集群后获取uniCloud安装包。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031634663.png)

同意开通后进入uni云开发软件版集群列表

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031639818.png)

目前创建集群数量暂无限制，您可以根据部署的业务来创建不同的集群。

> 什么是集群？
>
> 集群的作用是基于不同的业务划分一组服务器来进行部署，并且同一集群下的应用是共享的。
>
> 如果业务需要分布式运行可以在同一集群下添加多台服务器实现，而不需要创建新的集群。

集群创建后，需要稍等片刻，后台会在10分钟内构建最新版本的uni云开发软件版安装包。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031626507.png)

安装软件构建成功后，你需要将安装包上传到自己的服务器，可以通过网页下载后手动上传，也可以复制`wget`命令在服务器执行并下载安装包

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031644365.png)

将安装包下载到服务后运行以下命令进行解压操作，并移动到合适的文件夹内 (推荐文件夹`/uniCloud`)

```
# 创建uniCloud目录，需要root用户权限
mkdir /uniCloud
# 解压安装包
tar -zxvf [version].tar.gz -C /uniCloud
```

**离线集群版本**

如果您有内网部署需求(服务器不允许连接外网)，可以发邮件到`bd@dcloud.io`，通过商务采购方式申请开通离线集群进行部署安装使用。

### 注册 uni云开发软件版

uni云开发软件版安装完成后，需要像DCloud注册您的uni云开发软件版，注册成功后才可以正常运行。

每个账号每年(自然年)可以有5次注册试用版机会，单次试用时长为14天。

在试用版中可以体验完整的uni云开发软件版服务，并且不限制应用数量。
试用到期后如uni云开发软件版还在运行，接收到请求后将统一返回试用过期信息，请勿将试用版用于生产环境。

如需生产环境部署，请购买uni云开发软件版服务器授权。

在uni云开发软件版安装目录下运行以下命令进行激活

- `./unicloud register` 注册uni云开发软件版
- `./unicloud regsiter --trial` 注册试用uni云开发软件版

**离线集群uni云开发软件版注册方式**

由于离线uni云开发软件版没有网络连接，需要在uni云开发软件版安装目录下运行 `./uniCloud scan` 命令，会检测服务器环境信息及注册状态，如未注册状态，会在最后生成一个硬件ID

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031715273.png)

你需要登录uniCloud控制台-集群详情页面，在服务器授权处点击添加授权，输入服务器名称（用于备注服务器）和硬件ID保存，添加完成后点击"下载授权"，将会生成`[servername].LICENSE`文件并下载。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031924263.png)

将下载的授权文件上传uni云开发软件版安装根目录下，并重命名为`LICENSE`，即可完成注册。

### 添加应用授权

应用授权即授权哪些uni-app客户端可以访问uni云开发软件版，应用授权需要单独购买，
未授权的应用访问uni云开发软件版将会返回`403`错误码。

添加应用授权有两种方式，一种是在购买授权时，同时绑定应用，另外一种是只购买授权次数，在之后再绑定应用，根据实际情况选择。

添加完应用之后需要重新启动uni云开发软件版服务后生效。

**离线集群uni云开发软件版更新应用授权**

在添加应用之后，点击对应的AppId的下载授权按钮，将会生成`[AppId].LICENSE`文件并下载。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031923255.png)

如果是首次添加应用，请检查uni云开发软件版安装根目录下是否存在`app-license`文件夹，如不存在，请先创建。

将下载的授权文件上传uni云开发软件版安装根目录`app-license`文件夹内即可。

添加完应用之后需要重新启动uni云开发软件版服务后生效。

### uni云开发软件版操作命令

> 所有命令请在软件版环境根目录运行

注册uni云开发软件版

```
./unicloud register // 注册
./unicloud register --trial // 注册试用
```

启动

`./unicloud start -s [服务空间ID]`

停止

`./unicloud stop -s [服务空间ID]`

安装云函数第三方依赖

`./unicloud install -s [服务空间ID]`

初始化数据库

`./unicloud init-database -s [服务空间ID]`

扫描服务器、服务空间、注册状态等信息

`./unicloud scan`

## 开发指南

### 创建服务空间

为了和serverless版保持一致的开发体验，你需要创建服务空间：

登录[uniCloud控制台](https://unicloud.dcloud.net.cn/) 新建服务空间，版本选择 uni云开发软件版，绑定集群后即可开通。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202406031939942.png)

服务空间创建成功后，复制服务空间ID，在uni云开发软件版根目录按照以下命令创建服务空间目录

```
mkdir spaces // 如果spaces目录不存在先创建
cd spaces
mkdir [SpaceId]
```

### 配置服务空间

在你的服务空间目录下创建`config.json`配置文件，文件内容如下：

```json
//下方为配置示例，如拷贝此内容切记去除注释
{
  "default": true, //是否为默认服务空间，一套uni云开发软件版环境下，只能有一个默认服务空间
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
    "provider": "local",//服务商 支持local:本地存储 aliyun: 阿里云存储服务 tencent:腾讯云存储服务 qiniu:七牛云
    "dir": "file/upload", //文件上传目录
 "bucket": "",//存储桶名称，本地存储无需配置此项
    "cdnProtocol": "http://",//cdn协议 支持 http https
    "cdnDomain": "127.0.0.1:7001",//cdn域名
    "cdnRootPath": "/storage/file/",//cdn根目录
    "storageSecret": "xxxxxxxxxx",//本地存储服务访问密钥
  },
  "logger": { //日志服务配置
    "customLogDir": "/private-cloud-env/logs" //uni云开发软件版环境日志存储路径
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

#### 安装uni云开发软件版插件

在插件市场中下载[uni云开发软件版插件](https://ext.dcloud.net.cn/plugin?id=18520)，并在HBuilderX中安装。

uni云开发软件版插件支持以下功能：

- 创建本地调试配置文件
- 创建本地存储调试配置文件
- 打包uniCloud资源

#### 关联服务空间

> HBuilderX > 4.19 (暂定)

uni云开发软件版服务空间使用 `dcloud` 标识

如果项目内不存在`dcloud`服务空间，请在项目根目录右键-创建uniCloud环境，选择 `DCloud`创建即可。

`dcloud`服务空间文件夹全名为`uniCloud-dcloud`

在 `uniCloud-dcloud` 目录右键即可关联`dcloud`服务空间。

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

#### 配置文件存储

本地调试支持本地存储、OSS、COS、七牛云存储，
参考以下示例配置存储调试。

```json
//下方为配置示例，如拷贝此内容切记去除注释
{
 "storage": {//存储服务配置，如项目未使用存储服务可不配置此项
    "provider": "local",//服务商 支持local:本地存储 aliyun: 阿里云存储服务 tencent:腾讯云存储服务 qiniu:七牛云
    "dir": "file/upload", //文件上传目录
 "bucket": "",//存储桶名称，本地存储无需配置此项
    "cdnProtocol": "http://",//cdn协议 支持 http https
    "cdnDomain": "127.0.0.1:7001",//cdn域名
    "cdnRootPath": "/storage/file/",//cdn根目录
    "storageSecret": "xxxxxxxxxx",//本地存储服务访问密钥
  },
}
```

#### 运行项目

以上步骤完成后，运行项目即可。

切换云端云函数时，需部署到服务器后才可调用云端云函数。

### 部署

由于有uni_modules插件内包含uniCloud云函数等，需要进行uniCloud打包操作，将uni_modules插件内的云函数及数据库schema抽离出来。

在 `uniCloud-dcloud`目录右键“uni云开发软件版”-“打包uniCloud资源”，将会在`uniCloud-dcloud`服务空间目录下生成`dist`目录。

可以使用git/svn等版本管理工具进行管理，将代码上传至git/svn，在服务器拉取代码，在服务器上将`uniCloud-dcloud/dist`同步到对应服务空间目录下即可。

也可以单独对`dist`目录打包zip并上传到服务器对应的服务空间目录下解压即可。

上传代码之后需要重新启动服务空间，在uni云开发软件版根目录执行以下命令进行重启操作

```
./unicloud stop -s [服务空间ID]
./unicloud start -s [服务空间ID]
```

建议部署时采用分布式部署方案，即使用2台以上服务器部署可以保证服务的稳定性，在服务重启时也不会中断服务。

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

若你的服务器开启了防火墙功能，且需要访问如：`uni云开发软件版(联网版)`、`短信`、`一键登录`、`uni-ai`、`实人认证`、`uni-push`等在线业务，则需要将这些业务的API域名，添加到防火墙白名单中。

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

- uni云开发软件版(联网版)及付费业务API域名
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
