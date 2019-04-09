import { prisma } from "../../../../generated/prisma-client"

export default{
     Query:{
          seeFullPost : async(_, args) => {
               const { id } = args;
               //return prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
               return prisma.post({id});
               //const post = await prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
               // const comments = await prisma.post({id}).comments().$fragment(COMMENT_FRAGMENT);
               
               // const files = await prisma.post({id}).files();
               //const user = await prisma.post({id}).user();
               //return {
                    //post,
                    // comments,
                    // files,
                    //user
               //}
          }
          
          // prisma.posts({
          //      where:{
          //           OR:[
          //                {caption_starts_with:args.term},
          //                {location_starts_with:args.term}
          //                // {username_contains:args.term} ,
          //                // {firstName_contains:args.term},
          //                // {lastName_contains:args.term}
          //           ]
          //      }
          // })
     }
}