import { prisma } from "../../../../generated/prisma-client";

export default{
     Query:{
          seeRooms:(_,args, {request, isAuthenticated}) => {
               isAuthenticated(request);
               const { user } = request;
               return prisma.rooms({
                    where:{
                         participants_some:{
                              id: user.id
                         }
                    }
               })
          }
     }
}