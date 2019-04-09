import { prisma } from "../../../../generated/prisma-client"

export default {
     Mutation : {
          toggleLike : async(_, args, { request , isAuthenticated }) => {
               // 토큰이 없을때는 실행되지않도록 middleware 처음 모든요소들에 사용
               isAuthenticated(request);
               const { postId } = args;
               const { user } = request;
               const filterOptions = {
                    AND:[{user:{ id: user.id}},{post:{id:postId}}]
               }
               try{
                    const existingLike = await prisma.$exists.like(filterOptions);
                    if(existingLike){
                         //TO DO 좋아요 취소
                         // 해당 좋아요의 id를 알수 없으니 연결된 user id 나 post id 로 조건을 걸어서 삭제
                         await prisma.deleteManyLikes(filterOptions);
                    }else{
                         const newLike = await prisma.createLike({
                              user:{
                                   connect:{
                                        id: user.id
                                   },
                              },
                              post:{
                                   connect:{
                                        id: postId
                                   }
                              }
                         })
                    }
                    return true;
               } catch(error) {
                    console.log(error)
                    return false;
               }
          }
     }
}