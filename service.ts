
export interface CommonResponse<CR>{
    data: CR
    message: string
    result: number 
}

function auth(){
    return 'MOCK'
}

export interface GetById{
    page:number;
    pageSize:number;
}
export function getCdkById (data:GetById){
    return{
        url:'/app/cdk/get-cdks-by-user-id',
        method:'post',
        headers:{
          "FZM-SIGNATURE":auth()
        },
        data:data
    }
}
export interface GetByIdResponse{
    "totalElements": number;
    "totalPages": number;
    "cdks": []
}