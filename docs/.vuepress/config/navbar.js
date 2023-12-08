/**
 * text
 * target
 * link   // 有协议时是外链
 * items
 * type   // link、links。
 * rel
 * needOutbound // 是否显示外链图标
 */
export const navbar = [
  {
    text: 'uniCloud',
    type: 'link',
    link: '/'
  },
  {
    text: 'uni-app',
    link: 'https://uniapp.dcloud.io/',
    type: "link",
    target: '_blank',
    needOutbound: false
  },
  {
    text: 'uni-app x',
    link: 'https://uniapp.dcloud.io/uni-app-x/',
    type: "link",
    target: '_blank',
    needOutbound: false
  },
  {
    text: 'HBuilder',
    link: 'https://hx.dcloud.net.cn/',
    type: "link",
    target: '_blank',
    needOutbound: false
  },
  {
    text: 'uni 小程序 sdk',
    link: 'https://nativesupport.dcloud.net.cn/README',
    type: "link",
    target: '_blank',
    needOutbound: false
  },
  /* {
    text: '问答社区',
    link: 'https://ask.dcloud.net.cn/explore/',
    type: "link",
    target: '_blank',
    needOutbound: false
  },
  {
    text: '插件市场',
    type: "link",
    target: '_blank',
    link: 'https://ext.dcloud.net.cn/',
    needOutbound: false
  } */
]

export const navbarLanguage = {
  default: 0,
  items: [
    {
      text: '简体中文'
    }
  ]
}
