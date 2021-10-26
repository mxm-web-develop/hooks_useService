import { getCdkById } from "./service"

const getCdkByIdService =  getCdkById({
    page:1,
    pageSize:10
  })
  
  const {response} = useService<CommonResponse<GetByIdResponse>,GetById,any>(getCdkByIdService)
  
  