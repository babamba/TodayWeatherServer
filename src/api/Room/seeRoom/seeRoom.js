import { prisma } from "../../../../generated/prisma-client";

export default{
     Query:{
          seeRoom: async(_,args, {request, isAuthenticated}) => {
               isAuthenticated(request);
               const { id } = args;
               const { user } = request;
               
               const canSee = await prisma.$exists.room({
                   participants_some:{
                        id: user.id
                   }
               });

               if(canSee){
                    return prisma.room({ id });
                    //return prisma.room({id}).$fragment(ROOM_FRAGMENT);
                    // const messages = await prisma.room({id}).messages();
                    // return {
                    //      room, messages
                    // }
               }else{
                    throw Error("you can't see this")
               }
          }
     }
}