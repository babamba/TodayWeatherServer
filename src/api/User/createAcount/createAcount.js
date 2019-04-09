import { prisma } from "../../../../generated/prisma-client"

export default{
     Mutation:{
          createAcount : async(_, args,) => {
               //console.log(prisma)
               const { username, email, firstName="", lastName="", bio="" } = args;
               const exist = await prisma.$exists.user({username})
               if(exist){
                    throw Error("This username is already taken")
               }

               // try {
                    await prisma.createUser({
                         username,
                         email, 
                         firstName, 
                         lastName, 
                         //bio
                    })
                    return true;
               // } catch (error) {
               //      console.log(error);
               //      return false;
               // }
               
               //return null
          }
     }
}