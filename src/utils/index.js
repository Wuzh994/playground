// 加载assets目录下的资源文件
export function loadAssetsFile(url) {
  // 网络图片
  if (url.startsWith('http'))
    return url

  return new URL(`../assets/${url}`, import.meta.url).href
}
