import axios, { AxiosResponse, Method, ResponseType } from "axios";
import { Ref, ref } from "vue";
interface AuthType{
    username: string;
    password: string;
}

enum InternetStatus {
    PENDING,
    OK,
    ERROR,
    TIMEOUT,
}

interface UserServiceType<D,P>{
    url?: string;
    method?:string,
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
const useService = <R,D,P>(
    {url,method='get',baseURL='/proxyApi',data,timeout=30000, headers,params,withCredentials=false,auth,responseType='json'}:UserServiceType<D,P>,
    manually?:boolean,
    ):{
        loading:Ref<boolean>,
        response:Ref<R|undefined>,
        status:Ref<number>,
        uploadProgress:Ref<[number, number] | undefined>,
        downloadProgress:Ref<[number, number] | undefined>,
        run:(data?:any)=>Promise<any>
    }=>{
    const loading = ref<boolean>(true);
    const response = ref<R>()
    const uploadProgress = ref<[number,number]>()
    const downloadProgress = ref<[number,number]>()
    const status = ref<number>(InternetStatus.PENDING)



    const run= (data:any)=> {
        const request = axios.request<R,AxiosResponse<R>,any>({
            url,
            method:method as Method,
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
        }).then((res)=> {
            loading.value = false
            if(res.status===200){
                status.value = InternetStatus.OK
                response.value =  res.data
                return res.data
            }else{
                status.value = InternetStatus.ERROR 
                throw new Error(res.statusText)
            }
        }) 
        console.log('这里是请求函数里面了',data,request);
        
        return request
    }   
    
    !manually? run(data):''


    return{
        run,
        loading,
        response,
        status,
        uploadProgress,
        downloadProgress
    }
}



export default useService