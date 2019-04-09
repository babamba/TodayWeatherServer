import { prisma } from "../../../generated/prisma-client";

 //db필드에는 없는  computed 혹은 custom field(임의) 
// resolver 에 있으니까 custom resolver
// parent 는 resolver를 call하는 resolver
// 여기서의 fullname의 parent는 위 resolver의 리턴된 user 
// schema.js 에서 resolver들을 하나로 merge 하고있기때문에 다른 api에서도 fullName을 호출할 수 있다.

export default {
     User:{
          posts: ({ id }) => prisma.user({ id }).posts(),
          following: ({ id }) => prisma.user({ id }).following(),
          followers: ({ id }) => prisma.user({ id }).followers(),
          likes: ({ id }) => prisma.user({ id }).likes(),
          comments: ({ id }) => prisma.user({ id }).comments(),
          rooms: ({ id }) => prisma.user({ id }).rooms(),
          followingCount: ({ id }) =>
            prisma
              .usersConnection({ where: { followers_some: { id } } })
              .aggregate()
              .count(),
          followersCount: ({ id }) =>
            prisma
              .usersConnection({ where: { following_none: { id } } })
              .aggregate()
              .count(),

          //fullName:(_, args, { request }) => {
          //parent 로 부터 모든걸 받을 수있다.
          fullName: (parent) => {
               console.log("parent", parent)
               //console.log(request);
               return `${parent.firstName} ${parent.lastName}` ;
          },
          // 내가 요청한 아이디를 팔로잉하고있는지
          isFollowing: async(parent, _ , {request}) => {
               console.log("parentId : ", parentId)

               // 요청한 유저  
               const { user } = request;

               // id
               const { id: parentId } = parent;

               try {
                    //const exist = await prisma.$exists.user({
                    return prisma.$exists.user({
                         AND: [
                              {id: user.id},
                              {following_some:{
                                   id: parentId
                              }}  //팔로잉 리스트에 있는 id 중 내 id가 있는지
                         ]
                    })
     
                    // if(exist){
                    //      return true;
                    // }else{
                    //      return false;
                    // }
               } catch (error) {
                    console.log(error)
                    return false;
               }
               
               
          },
          // 요청한 사람이 같은 사람인지 
          // ( 내가 내 프로필을 보는건지 남이 내프로필을 보는건지  프로필 수정 버튼노출을 위해?)
          isSelf:(parent , _ , {request}) => {
               const { user } = request;
               const { id: parentId } = parent;
               return user.id === parentId; 
          }
     },
}
