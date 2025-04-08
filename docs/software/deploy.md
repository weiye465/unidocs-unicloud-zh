## 服务器安装部署

### 系统要求

**服务器最低配置**

- CPU >= 1核
- 内存 >= 2G
- 硬盘 >= 40G

**操作系统要求**

关键依赖软件：

- 内核版本 >= 4.18
- glibc >= 2.28
- gcc >= 8.5

具体操作系统版本：

- RHEL >= 8.1
- Ubuntu >= 20.04
- CentOS >= 8.5 (官方已停止维护，不推荐作为生产环境使用)
- 银河麒麟高级服务器操作系统V10

**环境检测**

可以使用如下命令来检查服务器环境是否满足要求。

```
// 查看内核发行版本号
uname -r     
// 查看系统版本号   
cat /etc/os-release | grep -E "^NAME=|^VERSION="  
// 查看 glibc 版本号
ldd --version           
// 查看 GCC 版本号
gcc --version           
// 查看CPU信息
cat /proc/cpuinfo| grep "processor"     
// 查看内存信息
free -h
// 查看磁盘信息   
df -h             
```

### 获取并安装uni云开发软件版

::: warning 注意

1. uni云开发软件版仅面向企业认证用户开放下载，个人认证用户若想升级为企业类型，可参考[实名认证信息变更](https://ask.dcloud.net.cn/article/39729)
2. 每次下载的安装包都是为当前账号单独生成的，内含账号的指纹信息，请勿进行破解、扩散等侵犯DCloud知识产权的行为，否则DCloud将会通过法律途径维护自己的合法权益。
:::

登录uniCloud控制台，按图所示进入uni云开发软件版页面

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061733486.png)

初次使用，需先确认uni云开发软件版的服务协议。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202408212023443.png)

同意并开通后，进入uni云开发软件版集群空间列表

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061736273.png)

创建一个[集群空间]()，创建成功后，点击右侧下载按钮，阅读“下载提示”后点击继续将会生成软件版部署包。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061748186.png)

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061749268.png)

安装包构建成功后，你可以通过浏览器手动下载安装包，也可以直接在你的服务器上，使用`wget`命令下载安装包。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061753764.png)

将安装包上传到服务器并进行解压，推荐目录为`~/uniCloud`，后文为方便表述，我们以`${uniCloud_HOME}`代指uni云开发软件版的安装根目录。

```
# 创建uniCloud安装目录，${uniCloud_HOME} 代指uni云开发软件版的安装根目录，如：mkdir ~/uniCloud
mkdir ${uniCloud_HOME}
# 解压安装包
tar -zxvf [version].tar.gz -C ${uniCloud_HOME}
```

### 初始化集群空间配置

在集群空间详情页面，复制`SpaceId`后，回到你的服务器上，在uni云开发软件版根目录下使用以下命令创建配置文件：

```
cd ${uniCloud_HOME}
./unicloud create-config -s [SpaceId]
```

> `./unicloud` 更多命令参数，[参考](#commands)

接下来，你需要在服务器上，根据自己的具体情况，通过`config.json`配置mongodb数据库、文件存储、redis等，config.json的完整配置及解释，[参考](#config)。

### 标准版软件联网激活授权

#### 服务器授权

uni云开发软件版启动时，会自动向DCloud进行注册，默认为试用版，试用有效期为15天。

每个账号每年(自然年)有5次试用机会，即允许在5台服务器上运行未激活的uni云开发软件版。

试用到期后，你需要尽快购买并激活授权，升级为正式版。

**服务器授权购买方式：** 登录[uniCloud控制台](https://unicloud.dcloud.net.cn)，从顶部导航栏下拉列表中选择“uni云开发软件版”，进入集群空间列表，选择对应集群空间，可看到该集群空间下的所有已注册服务器，选择需要激活的服务器，完成授权购买。

uniCloud控制台激活操作完成后，会在24小时内自动完成你服务器上的uni云开发软件版激活，或者你也可以通过重启的方式，让uni云开发软件版立即激活。

#### 应用授权

uniCloud试用版不校验appid，一旦你完成uni云开发软件版的正式激活，则需尽快配置该服务器允许使用的appid清单，每个appid需要一个应用授权。

未授权的应用访问uniCloud正式版将会返回`403`错误码。

添加应用授权有两种方式：

- 在购买应用授权时，同时绑定应用；
- 先购买应用授权个数，后期选择对应应用进行绑定；

绑定应用后，需重新启动uni云开发软件版，方可生效。

### 企业版软件离线激活授权

#### 服务器授权

在uni云开发软件版安装目录下运行 `./uniCloud scan` 命令，会检测服务器环境信息及注册状态，如未注册状态，会在最后生成一个硬件ID

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202408021552565.png)

你需要登录uniCloud控制台-集群详情页面，在服务器授权处点击添加授权，输入服务器名称（用于备注服务器）和硬件ID，添加完成后点击"下载授权"，将会生成`uniCloud.LICENSE`文件。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061806668.png)

下载授权文件并上传至uni云开发软件版服务器上，上传目录为`${uniCloud_HOME}/license/`，重启uni云开发软件版即可完成服务器正式激活。

#### 应用授权

你需要先完成应用授权的购买，然后手动下载应用的授权文件。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202409061808181.png)

将下载的应用授权文件上传uni云开发软件版服务器上，目录为`${uniCloud_HOME}/license/`，重启uni云开发软件版即可完成应用授权激活。


### 启动服务

```
cd ${uniCloud_HOME}
./unicloud start
```

然后使用 `curl localhost:7001`命令，若成功返回`hello uniCloud`，则表示安装成功。

接下来，就是开发自己的业务代码，部署上传到服务器即可。

### 部署程序包

在HBuilderX中开发业务代码，测试完毕后，构建服务端发行包，并通过`ssh/sftp`等方式上传到服务器中，构建包的解压目录是`${uniCloud_HOME}`，关于构建操作，[参考](#build-server-package)。

### 运维管理

#### uni云开发软件版操作命令@commands

> 所有命令，需在uniCloud软件安装根目录下执行

启动

`./unicloud start`

|参数|类型|默认值|说明|
|---|---|---|---|
|`-w, --worker`|Number|服务器 CPU 核数|启动worker数量|
|`--schedule`|Boolean|false|开启定时任务服务|

停止

`./unicloud stop`

安装云函数第三方依赖

`./unicloud install-deps`

创建集群空间配置文件

`./unicloud create-config`

|参数|类型|默认值|说明|
|---|---|---|---|
|`-s, --spaceId`|String|-|服务空间ID，必填|
|`--storage`|String|local|存储服务类型，目前支持 local、qiniu、aliyun、tencent|
|`--mongodb`|Boolean|false|创建 MongoDB 配置|
|`--redis`|Boolean|false|创建 Redis 配置|

初始化数据库

`./unicloud init-database`

扫描服务器、服务空间、注册状态等信息

`./unicloud scan`

查看 uniCloud 各服务空间运行状态

`./unicloud status`

#### 出网域名白名单

uni云开发软件版的部分业务需要从你的服务器向外网发送请求，需联网的业务包括：

|功能 |联网域名 |
|-- |-- |
|1. uni云开发软件版联网激活<br/>2. 短信 <br/> 3. 一键登录 <br/> 4. uni-ai <br/> 5. 实人认证 <br/>  |1. pucoa1.dcloud.net.cn <br/> 2. pucoa2.dcloud.net.cn <br/> 3. pucoabk.dcloud.net.cn |
|6. uni-push |restapi.getui.com |

若你的服务器开启了防火墙，或限制公网访问，同时又使用了如上业务，则你需要将如上对应域名加入防火墙白名单。

#### 跨域配置@cors

[跨域资源共享(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)配置

```
{
  "cors": {
    "origin": ["*"],
    "allowMethods": ["GET", "POST", 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH' ]
  }
}
```

#### 日志

uni云开发软件版内置简单的日志服务，日志分为启动日志与运行日志。

启动日志是记录 uniCloud 启动期间的所有输出日志。

运行日志是在 uniCloud 运行期间记录框架的输出日志和云函数输出日志。

**日志路径**

启动日志放在`${uniCloud_HOME}/logs/master`路径下，每次启动的日志独立保存。

运行时日志默认放在`${uniCloud_HOME}/logs`路径下，可以修改服务空间配置文件中的`logger.customLogDir`字段来自定义日志目录。

如果想自定义日志路径，可参考如下配置：

```json
 {
 "logger": {
  "customLogDir": "/your/custom/dir/path"
 }
 }
```

**日志分类**

启动日志

- `master-stdout.log` 标准输出日志，包含启动时所有日志。
- `master-stderr.log` 标准错误日志，启动时如遇到启动失败/异常，错误日志将写入此文件中，方便根据此日志排查问题。

运行日志

- `unicloud.log` 框架及云函数运行日志。
- `unicloud-error.log` uniCloud 中任何错误信息都会写入此文件内。

**日志切割**

启动日志按照每次启动进行自动切割。

运行日志是按天切割，在每日`00:00`按照`.log.YYYY-MM-DD`文件名进行切割。

## HBuilderX开发调试

### 安装软件版开发插件

前往插件市场，下载并安装[uni云开发软件版插件](https://ext.dcloud.net.cn/plugin?id=18520)。

uni云开发软件版插件支持以下功能：

- 创建本地调试配置文件
- 创建本地存储调试配置文件
- 打包uniCloud资源

### 关联并配置服务空间

> HBuilderX > 4.31

uni云开发软件版服务空间使用 `dcloud` 标识

### 本地调试配置

在项目中的`uniCloud`目录右键-uni云开发软件版-创建本地调试配置文件，即可生成`config.json`配置文件。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202408021527159.png)

默认配置内容如下所示

```json
{
 "mongodb": { //mongo库连接配置
   "url": "mongodb://username:password@127.0.0.1:7001",//mongo库连接地址
   "database": "unicloud" //数据库名称
 },
 "redis": {//redis库连接配置，项目中不使用redis服务可不配置此项
   "host": "127.0.0.1",//host
   "port": 6379, //端口号
   "password": "password"//密码
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
  {
    "cors": { // 跨域配置
      "origin": ["*"], // 允许跨域访问的域名，支持通配符；默认所有域名都允许
      "allowMethods": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"] // 在预检请求中允许的请求方式
    }
  }
}
```

你需要根据自己的具体情况，配置mongodb数据库、文件存储、redis等，config.json的完整配置及解释，[详见](#config)

### 远程调试

在本地运行时如果需要连接云端云函数，需要在集群空间详情页配置云端apiEndpoint后切换云端云函数访问。

![](https://web-ext-storage.dcloud.net.cn/unicloud/docs202408202042656.png)

**注意**

修改 apiEndpoint 后需要重新关联服务空间生效。

### 构建服务端发行包@build-server-package

由于有uni_modules插件内包含uniCloud云函数等，需要进行uniCloud打包操作，将uni_modules插件内的云函数及数据库schema抽离出来。

在 `uniCloud`目录右键“uni云开发软件版”-“打包uniCloud资源”，将会在`uniCloud`服务空间目录下生成`dist`目录。

可以使用git/svn等版本管理工具进行管理，将代码上传至git/svn，在服务器拉取代码后将`uniCloud-dcloud/dist`目录同步到对应服务空间下即可。

也可以单独对`dist`目录打包zip并上传到服务器对应的服务空间目录下并解压。

上传代码之后需要重新启动服务空间，在uni云开发软件版根目录执行以下命令进行重启操作

```javascript
./unicloud stop & ./unicloud start
```

建议部署时采用分布式部署方案，即使用2台以上服务器部署可以保证服务的稳定性，在服务重启时也不会中断服务。

### 云函数内跨集群空间调用@multi-space

云函数内跨集群空间调用与在公有云中跨服务空间调用方式一致，详情[参考](https://doc.dcloud.net.cn/uniCloud/concepts/space.html#multi-space)

**需要注意以下限制：**

1. 目前跨集群空间调用仅支持调用callFunction和importObject。
2. 软件版运行与应用的appId绑定，所以在调用 uniCloud.init 之后还需要调用实例化后的 setClientInfo 方法，将appId传递进去。

示例：
```js
const uniCloud2 = uniCloud.init({
  spaceId: 'dc-xxxxx', // 集群空间ID
  clientSecret: 'xxxxx-xxx-xxx-xxx-xxxxx', // 集群空间clientSecret
  endpoint: 'http://127.0.0.1:7001', // 集群空间部署地址
})

// 设置连接集群空间的appId，必须调用此方法，否则请求将报错！
uniCloud2.setClientInfo({
  APPID: "__UNI__DCloud"
})
```

## 配置文件@config

uni云开发软件版需要单独配置mongodb数据库、文件存储、redis等，所有配置全部在`config.json`中完成。

HBuilderX端开发配置、服务器端线上配置，都通过 config.json实现，且规则保持一致。

`config.json`完整模版内容如下：

```json
{
  "spaceId": "pvt-xxx",
  "startAsDaemon": true,
  "port": 7001,
  "clientSecret": "xxx",
  "mongodb": {
    "url": "mongodb://username:password@127.0.0.1:7001",
    "database": "test",
    "maxPoolSize": 30,
    "minPoolSize": 10
  },
  "storage": {
    "provider": "local",
    "dir": "file/upload",
    "bucket": "",
    "cdnProtocol": "http://",
    "cdnDomain": "127.0.0.1:7001",
    "cdnRootPath": "/storage/file/",
    "storageSecret": "xxxxxxxxxx",
  },
  "logger": {
    "customLogDir": "~/logs"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379,
    "password": ""
  },
  "spaceSecret": {
    "secretKeyId": "xxxx",
    "secretKey": "xxx"
  },
  {
    "cors": {
      "origin": ["*"],
      "allowMethods": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"]
    }
  }
}
```

|参数|类型|默认值|说明|
|---|---|---|---|
|spaceId|String|-|服务空间ID，可在uniCloud控制台查看|
|startAsDaemon|Boolean|true|仅服务器支持；是否在后台运行|
|port|Number|7001|端口号，同一台服务器下，各服务空间的端口号不可重复|
|clientSecret|String|-|仅服务器支持；客户端通讯密钥|
|mongodb|Object|-|mongo数据库连接配置|
|mongodb.url|String|-|mongo数据库连接|
|mongodb.database|String|-|数据库名称|
|mongodb.maxPoolSize|Number|100|最大连接数|
|mongodb.minPoolSize|Number|0|最小连接数|
|storage|Object|-|存储服务配置|
|storage.provider|String|local|服务商 支持local:本地存储 aliyun: 阿里云存储服务 tencent:腾讯云存储服务 qiniu:七牛云|
|storage.dir|String|file/upload|文件上传目录|
|storage.bucket|String|-|存储桶名称，本地存储无需配置此项|
|storage.cdnProtocol|String|http|cdn协议 支持 http https|
|storage.cdnDomain|String|
|storage.cdnRootPath|String|/storage/file/|cdn根目录|
|storage.storageSecret|String|-|本地存储服务访问密钥|
|storage.bucketName|String|-|仅qiniu支持；存储桶名称|
|storage.domain|String|-|仅qiniu支持；qiniu储存域名（域名地址）|
|storage.ak|String|-|仅qiniu支持；bucket ak|
|storage.sk|String|-|仅qiniu支持；bucket sk|
|logger|Object|-|日志服务配置|
|logger.customLogDir|String|/private-cloud-env/logs|uni云开发软件版环境日志存储路径|
|redis|Object|-|redis配置; 如不需要可不配置此字段|
|redis.host|String|-|redis连接host|
|redis.port|Number|6379|端口号|
|redis.password|String|-|密码|
|spaceSecret|Object|-|服务空间通讯配置|
|spaceSecret.secretKeyId|String|-|SpaceKeyID，可在uniCloud控制台查看|
|spaceSecret.secretKey|String|-|SpaceSecret ，可在uniCloud控制台查看|
|cors|Object|-|跨域配置|
|cors.origin|Array<string>|["*"]|允许跨域访问的域名，支持通配符；默认所有域名都允许|
|cors.allowMethods|Array<string>|["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"]|在预检请求中允许的请求方式|

如项目中使用了存储服务，则还需额外增加存储服务的配置项。即在服务空间目录下创建`file`目录，并在`file`目录下增加`permission.json`配置文件。配置文件内容如下：

```json
{
  "*": {
    "read": true,
    "update": false,
    "create": true,
    "delete": "auth.uid == resource.uid"
  }
}
```

|参数|类型|默认值|说明|
|---|---|---|---|
|read|Boolean|-|读权限|
|update|Boolean|-|修改权限|
|create|Boolean|-|创建权限|
|delete|String|-|删除权限|

## 错误码

|errCode|errMsg|含义|
|---|---|---|
|0|ok|正常请求|
|1|invalid request|请求异常|
|1102001|response exception {param}|请求响应异常，请联系DCloud技术支持|
|1102002|runtime exception {param}|运行环境异常，请联系DCloud技术支持|
|1101001|参数错误|参数错误|
|1101002|未找到该用户|未找到该用户，请检查DCloud账号是否正常|
|1101003|未找到该集群空间|未找到该集群空间，请检查集群空间是否被删除|
|1101004|授权数量已用完|授权数量已用完，请在uniCloud控制台购买服务器授权|
|1101005|试用授权数量已用完|试用授权数量已用完，请在uniCloud控制台购买正式服务器授权|
|1101006|授权已过期|uni云开发软件版授权已过期，请在uniCloud控制台购买服务器授权|
|1101007|uni云开发软件版尚未注册|uni云开发软件版尚未注册，请在uniCloud控制台注册|
|1101008|请开通uni云开发软件版服务|未开通uni云开发软件版服务|
|1101009|未找到该服务空间|未找到该服务空间，请检查服务空间是否被删除|
|1101010|服务空间配置错误|请检查服务空间配置文件spaceSecret.secretKeyId/secretKey配置是否正确|
|1101011|集群配置错误|集群配置错误，请检查集群配置是否正确|
|1101012|服务器时间错误|服务器时间与DCloud服务器时间存在偏差，请在服务器上同步正确的时间|

## 常见问题

### 1. 如何部署SSR项目？

uni云开发软件版支持SSR项目部署，参考 SSR 项目手动部署发行[文档](https://uniapp.dcloud.net.cn/tutorial/ssr.html#distribute)

需要注意的地方

1. vite.config.js 中的 `base` 应配置为静态资源部署地址。
2. 需要手动配置`uni-ssr`云函数URL化地址，如何配置参考[文档](https://doc.dcloud.net.cn/uniCloud/cf-functions.html#cloudfunction-config)
3. 如果需要试用自定义域名访问SSR，需要自行搭建反向代理服务器，将请求转发到`uni-ssr`云函数上。

### 2. 云函数URL化访问报错：missing csrf token

URL化路径配置错误，参考云函数package.json中[云函数配置项](https://doc.dcloud.net.cn/uniCloud/cf-functions.html#cloudfunction-config)。

**注意：**

软件版默认URL化访问路径为`/http`，在配置路径时需要添加前缀`/http`。
