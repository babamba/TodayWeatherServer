import { prisma } from "../../../../generated/prisma-client";

export default {
     Query : {
          me: async(_, args , {request, isAuthenticated}) => {
               //console.log(" me parent " , _)
               isAuthenticated(request);
               const { user } = request;
               //return prisma.user({id: user.id}).$fragment(USER_FRAGMENT);
               const userProfile = await prisma.user({id: user.id});
               const posts = await prisma.user({id: user.id}).posts();

               // graphql 이 prisma 구문을 이해하지 못하기 때문에 
               // fragments 에 쿼리문을 작성해서 하는방법이 있고
               // 해당 모델을 추가로 적어주는 방법이 있다.
               return {
                    user:userProfile, 
                    posts
               };
          }
     },
     //db필드에는 없는  computed 혹은 custom field(임의) 
     // resolver 에 있으니까 custom resolver

     // parent 는 resolver를 call하는 resolver
     // 여기서의 fullname의 parent는 위 resolver의 리턴된 user 

     // schema.js 에서 resolver들을 하나로 merge 하고있기때문에 다른 api에서도 fullName을 호출할 수 있다.
     // User:{
     //      //fullName:(_, args, { request }) => {
     //      //parent 로 부터 모든걸 받을 수있다.
     //      fullName: (parent) => {
     //           console.log("parent", parent)
     //           //console.log(request);
     //           return `${parent.firstName} ${parent.lastName}` ;
     //      }
     // },
};