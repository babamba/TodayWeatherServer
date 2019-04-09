import { prisma } from "../../../../generated/prisma-client";

const DELETE ="DELETE";
const EDIT = "EDIT"

export default {
     Mutation:{
          editPost : async(_,args, {request, isAuthenticated}) => {
               isAuthenticated(request);
               const { id, caption, location, action } = args;
               const { user } = request;
               
               // 현재 접속된 유저의 아이디 ,  넘어온 포스트 id
               // 두가지가 맞는 포스트가 있는지 체크 (내가쓴글이 맞는지)
               const post = await prisma.$exists.post({id, user:{id: user.id}});
               if(post){
                    if(action === EDIT){
                         return prisma.updatePost({
                              data:{
                                   caption,
                                   location
                              },
                              where:{
                                   id
                              }
                         })
                    }else if(action === DELETE){
                         return prisma.deletePost({id})
                    }
                    
               }else{
                    throw Error("You can't do that")
               }
          }
     }
}