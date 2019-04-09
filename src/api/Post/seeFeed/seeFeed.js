import { prisma } from "../../../../generated/prisma-client";

export default {
     Query: {
          seeFeed:async(_,args,{request, isAuthenticated}) => {
               isAuthenticated(request);
               const { user } = request;
               const following = await prisma.user({id: user.id}).following()
               //console.log(following.map(user => user.id).push(user.id))
               //console.log(following);
               return prisma.posts({
                    where: {
                         user: {
                              id_in: [...following.map(user => user.id), user.id]
                         }
                    },
                    orderBy:'createdAt_DESC'
               })
          }
     }
}