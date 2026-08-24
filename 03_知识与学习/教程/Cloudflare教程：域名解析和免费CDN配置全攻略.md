[“赛博活佛”Cloudflare教程：域名解析和免费CDN配置全攻略 - 知乎](https://zhuanlan.zhihu.com/p/1932423212387505330)
Cloudflare是一家全球知名的[互联网基础设施](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=%E4%BA%92%E8%81%94%E7%BD%91%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiLkupLogZTnvZHln7rnoYDorr7mlr0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.BXUGoPH5PClAspXIFfcdmlNhIyjNPPBbA5zROluQEH8&zhida_source=entity)公司，**最核心的产品是一套集CDN加速、网络安全和智能DNS于一体的服务平台**。它通过分布在全球的[服务器网络](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BD%91%E7%BB%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiLmnI3liqHlmajnvZHnu5wiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.qklJygMSbKEunPkaNabYxkK9cOUx9qyRc_Ag-5oMHjQ&zhida_source=entity)，将网站的静态内容缓存到离访客最近的节点，让用户无论身处何地都能以更低延迟、更快速度访问网站，有效改善海外访问体验和移动端加载速度。

同时，Cloudflare具备强大的[DDoS攻击防护](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=DDoS%E6%94%BB%E5%87%BB%E9%98%B2%E6%8A%A4&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiJERG9T5pS75Ye76Ziy5oqkIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjYwODU0ODEyLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.sdsWbsRHz2rhXOrGk3IfMfP6ngPu21qUxO76cGC60EI&zhida_source=entity)能力和Web应用防火墙，可以自动识别并拦截恶意流量，极大降低因攻击导致的网站宕机或数据泄漏风险，保障网站安全稳定运行。

除了速度和安全优势，**Cloudflare还提供DNS解析、[高级缓存](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=%E9%AB%98%E7%BA%A7%E7%BC%93%E5%AD%98&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiLpq5jnuqfnvJPlrZgiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.QQGE-2c1Hz4tKdmNNXJ82kD0xI_7AkruuG9kBPIpgEQ&zhida_source=entity)管理、免费SSL证书、Bot管理等功能**，帮助网站更容易通过Google等搜索引擎的安全与性能评估，从而提升SEO表现。

最重要的是，**Cloudflare的入门级服务对大多数中小网站完全免费，业内戏称“大善人”、“赛博活佛”，可以说Cloudflare浑身是宝啊。**开通和配置过程也非常简单——**只需在[域名注册商](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=%E5%9F%9F%E5%90%8D%E6%B3%A8%E5%86%8C%E5%95%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiLln5_lkI3ms6jlhozllYYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.w_FKdSD1acpvxl8lQdE5wZ7f3jYP8Qudk9a9aBxETvk&zhida_source=entity)后台将域名DNS服务器切换到Cloudflare，然后在Cloudflare面板中设置解析记录指向你的主机IP即可。**

**Cloudflare适合谁使用？**对于面向海外市场的外贸站点，无论是ToB还是ToC站点，Cloudflare都是非常推荐的 CDN 解决方案。

本[Cloudflare教程](https://link.zhihu.com/?target=https%3A//ecomools.com/cloudflare-cdn/)将带你们使用Cloudflare的域名解析功能以及接入免费CDN，现在就让我们开始吧！

注意：在教程开始之前你得先拥有一个域名。

[![](https://picx.zhimg.com/v2-4a5666078eff940023d6da592f14f75b.jpg?source=7e7ef6e2&needBackground=1)外贸B2B独立站域名：注册 & 挑选指南以及DNS解析详细攻略1 赞同 · 0 评论](https://zhuanlan.zhihu.com/p/1927733269681649447) 文章

## 注册Cloudflare账号并添加站点

访问[Cloudflare网站](https://link.zhihu.com/?target=https%3A//dash.cloudflare.com/sign-up)，注册一个Cloudflare账号。如果你已经有账号，那么直接登录即可。

登录到后台，在**账户主页**中，我们点击**“添加域”**来添加我们的站点：

  

![](https://pic3.zhimg.com/v2-611d783e331dde4468d9a23783ec0992_1440w.jpg)

  

然后输入我们的[根域名](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=%E6%A0%B9%E5%9F%9F%E5%90%8D&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiLmoLnln5_lkI0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.55Bi6dz33aXS9sl705BI_f9-iaYFRtPriFRf3d6pRuA&zhida_source=entity)，选择**“快速扫描DNS记录”**，让Cloudflare自动扫描我们的DNS记录即可。

  

![](https://pic4.zhimg.com/v2-3e8cbce219c7fec75caa5feba9f5bf5f_1440w.jpg)

  

点击**“继续”**后选择我们的计划，这里选择免费的计划即可。

  

![](https://pic4.zhimg.com/v2-5ab9236433041cf5c535fb5997e9b223_1440w.jpg)

  

## 在Cloudflare中添加DNS记录

我们在上一步添加站点中选择了“快速扫描DNS记录”，Cloudflare会帮我们自动扫描域名现有的DNS记录。因为我们的域名刚注册时，默认 DNS 记录一般都是指向域名注册商的服务器，这些默认记录可以全部删除。

**删掉之后我们再单独添加两条DNS记录：@和www**

- @ 代表主域名，比如 @ 就表示 ecomools(dot)com。**这条记录添加 A 记录，指向我们的服务器公网 IP**。
- www 代表带有 www. 前缀的域名（如 www(dot)ecomools(dot)com）。**这条记录添加 CNAME 记录，指向主域名**（也就是 ecomools(dot)com）。

**这样设置后，无论用户访问 ecomools**(dot)**com 还是 www**(dot)**ecomools**(dot)**com，都能正确跳转到我的服务器和网站内容**。像下图这样：

![](https://pic4.zhimg.com/v2-ac71e08f456ffa9c73e81f6144751159_1440w.jpg)

  

我们可以**看到这两条A记录旁边都有一朵橙色的云，写着“已代理”。表示已经开启了CDN，Cloudflare会帮忙我们加速和保护流量。**

添加完这两条记录以后，点击**“继续前往激活”**进入到以下界面。这是**Cloudflare给我们提供的[名称服务器](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=%E5%90%8D%E7%A7%B0%E6%9C%8D%E5%8A%A1%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiLlkI3np7DmnI3liqHlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.m1hsgODbdKnLvaGqUHoK1WusaYcK5F-am4djiNeGONc&zhida_source=entity)（也称域名服务器）**。我们后续需要在域名注册商中将域名服务器改为Cloudflare的。

  

![](https://picx.zhimg.com/v2-eec72568905bbcadd2324499a652c831_1440w.jpg)

  

## 将域名DNS服务器切换到Cloudflare

**接下来，我们需要在域名提供商中将域名DNS服务器切换到Cloudflare。**我们这里以[NameCheap](https://zhida.zhihu.com/search?content_id=260854812&content_type=Article&match_order=1&q=NameCheap&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ3MDk3MjAsInEiOiJOYW1lQ2hlYXAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjA4NTQ4MTIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.2yueutWsbKOjz2xr8Uh9BgsoeKJVfbU7fD2kiPfFOPg&zhida_source=entity)为示例：

找到我们的域名，点击“Manage”按钮。

  

![](https://pic3.zhimg.com/v2-abfd66f83b6d1ad16181fc0b9bee0444_1440w.jpg)

  

然后找到“NAMESERVERS”选项卡，打开下拉框，选择“Custom DNS”。

  

![](https://pic3.zhimg.com/v2-55aca0b69e0854cdb44a8f9c00fdb0f8_1440w.jpg)

  

然后设置为Cloudflare给我们提供的域名服务器。

  

![](https://pic4.zhimg.com/v2-9c761eb7a57fb113c7980e09fd603f33_1440w.jpg)

  

点击“√”保存后，通常等待十分钟左右，DNS 解析就会自动生效。

好，这样就完事了，我们的网站就已经成功接入Cloudflare了。

**我们不仅成功接入了 Cloudflare，获得了额外的网站安全和 CDN 加速保护**。

但是可能你立马去访问域名的话还是没那么快能够看到我们的网站。因为我们做的DNS设置修改，这个变化不是立刻全世界都能看到。互联网的每个角落都有无数个DNS服务器，它们会“缓存”之前的解析结果。

这些缓存需要一段时间才会刷新，刷新完后，别人访问你的网站时才会用到最新的DNS设置。通常是10分钟左右就能够看到更新后的结果，绝大多数情况下在2-8小时内就能全球生效。我们可以通过[该网站](https://link.zhihu.com/?target=https%3A//www.whatsmydns.net/%23NS/)查询我们的DNS是否已经更新。

以后如果更换主机，那么我们只需要在Cloudflare里面修改即可，不需要去到域名注册商中去更改主机IP。**但是续费还是需要去域名注册商中去注册。**

## 使用Cloudflare CDN的潜在风险

### 1. 对于中国大陆用户来说是“负优化”

Cloudflare 并没有在中国大陆部署边缘节点，其节点多数位于香港、日本、新加坡、美国等。如果你的服务器在海外，你接入了Cloudflare，中国大陆用户访问网站时绕路严重，速度反而会更慢；甚至某些运营商（如移动、电信）可能会与 Cloudflare 的网络连接不稳定，出现丢包或加载失败。**所以Cloudflare比较适合出口外贸站，但不适合面向大陆用户的站点。**

### 2. 可能会出现“重定向次过多”的情况

如果网站和Cloudflare的配置不当，那么就有可能会出现重定向次过多 “ERR_TOO_MANY_REDIRECTS” 的情况。

  

![](https://pic4.zhimg.com/v2-bc6db03623c1d00f265893eedfdd624b_1440w.jpg)

  

这是由于 Cloudflare 默认 SSL 模式为“灵活（Flexible）”，而你的网站本身已经启用了 SSL（如 Let’s Encrypt 证书），并设置了 HTTP 自动跳转到 HTTPS。此时会发生以下逻辑循环：

- 访客访问 http:// yourdomain(dot)com；
- Cloudflare 与用户之间使用 HTTPS（表现看似加密）；
- Cloudflare 与源站之间使用 HTTP（因 Flexible 模式）；
- 但你的源站又强制把 HTTP 跳转到 HTTPS；
- Cloudflare 收到 HTTPS 请求后仍以 HTTP 访问；
- 又被跳转到 HTTPS，形成死循环。
- 最终导致浏览器报错：重定向次数过多（ERR_TOO_MANY_REDIRECTS）。

解决方法也很简单：**只需将 Cloudflare 中的 SSL 模式从【灵活（Flexible）】改为【完全（Full）】或【完全（严格）（Full Strict）】即可。**