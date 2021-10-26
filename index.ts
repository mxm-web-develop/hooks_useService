import axios, { AxiosResponse, Method, ResponseType } from "axios";
import { Ref, ref } from "vue";
interface AuthType{
    username: string;
    password: string;
}

interface UserServiceType<D,P>{
    url: string;
    method?:Method,
    baseURL?: string,
    data?:D,
    timeout?:number,
    headers?:any,
    params?:P,
    withCredentials?:boolean,
    auth?:AuthType,
    responseType?:ResponseType,
}
/**
 * @params R-返回的type
 * @params D-发送的参数type
 * @params P-发送的路由params type
 * @returns 
 */
const useService = <R,D,P>({
        url,
        method='get',
        baseURL,
        data,
        timeout=13000,
        headers,
        params,
        withCredentials=false,
        auth,
        responseType='json',
    }:UserServiceType<D,P>):{loading:Ref<boolean>,
        response:Ref<AxiosResponse<R> | string | undefined>,
        status:Ref<number>,
        uploadProgress:Ref<[number, number] | undefined>,
        downloadProgress:Ref<[number, number] | undefined>
    }=>{
    const loading = ref<boolean>(true);
    const response = ref<AxiosResponse<R> | string>()
    const uploadProgress = ref<[number,number]>()
    const downloadProgress = ref<[number,number]>()
    const status = ref<number>(0)
    axios({
        method,
        url,
        baseURL:baseURL,
        data,
        timeout,
        headers,
        params,
        withCredentials,
        auth,
        responseType,
        onUploadProgress:function(p:ProgressEvent){
            uploadProgress.value = [p.loaded,p.total]
        },
        onDownloadProgress:function(p:ProgressEvent){
            downloadProgress.value = [p.loaded,p.total]
        }
    }).then((res)=>{
        loading.value = false
        if(res.status===200){
            status.value = 1
            response.value = res.data
        }else{
            status.value = 2
            response.value = '请求有问题'
        }
    })

    return{
        loading,
        response,
        status,
        uploadProgress,
        downloadProgress
    }
}



export default useService