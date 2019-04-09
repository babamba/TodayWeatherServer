import { prisma } from "../../../../generated/prisma-client";

export default {
     Mutation:{
          sendMessage : async(_, args, { request, isAuthenticated}) => {
               isAuthenticated(request);
               const { user } = request;
               const { roomId, message, toId } = args;

               let room;
               //console.log(roomId);
               //채팅방이 없으면 채팅방 개설
               if(roomId === undefined){
                    //나자신과 방은 만들게 하지않기위해
                    if(user.id !== toId){
                         room = await prisma.createRoom({
                              participants: {
                                   // to : 메시지 받는사람
                                   // 두번째 메세지를 보내는사람
                                   connect:[{id: toId},{id: user.id}]
                              },
                         })
                    }
               }else{
                    //채팅방이 있을경우 채팅방 찾아서 넣기
                    room = await prisma.room({ id: roomId })
               }

               if(!room){
                    throw Error("Room not found")
               }

               const getTo = room.participants.filter(participants =>
                     participants.id !== user.id
               )[0];

               return prisma.createMessage({ 
                    text : message, 
                    from:{
                         connect: { 
                              id: user.id
                         }
                    },
                    to:{
                         connect:{
                              id: roomId ? getTo.id : toId
                         }
                    },
                    room :{
                         connect:{
                              id: room.id
                         }
                    }
               });
          }
     }
     
}