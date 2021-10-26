# Vue3 版本hooks更新


### hooks可返回值
- loading（布尔值）是否还在加载,
- response (泛型) 返回值的对象,
- status (状态<number>) 请求返回的状态,
- uploadProgress (上传进度[已上传进度，总进度]) 返回进度数组,
- downloadProgress (下载进度[已上传进度，总进度]) 返回进度数组


### 依赖需求
- 改版本适配vue3 hook模式，也可以改为react hook模式，依赖ts,vue,axios
