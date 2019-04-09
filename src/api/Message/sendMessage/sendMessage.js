import { prisma } from "../../../../generated/prisma-client";

export default {
     Mutation: {
     sendMessage: async (_, args, { request, isAuthenticated }) => {
          isAuthenticated(request);
          const { user } = request;
          const { roomId, message, toId } = args;
          let room;
          let createRoomId;
          let createRoomParticipants;

          if (roomId === undefined) {
               if (user.id !== toId) {
                    room = await prisma.createRoom({
                    participants: {
                         // to : 메시지 받는사람
                         // 두번째 메세지를 보내는사람
                         connect: [{ id: toId }, { id: user.id }]
                    }
                    });
               }

               createRoomId = room.id
               createRoomParticipants = await prisma.room({id:createRoomId}).participants()
               console.log("createRoom",room)
               console.log("createRoomId",createRoomParticipants);

          } else {
               room = await prisma.room({ id: roomId });
               createRoomParticipants = await prisma.room({id:roomId}).participants()
               console.log("createRoom",room)
               console.log("createRoomId",createRoomParticipants);

          }

          if (!room) {
               throw Error("Room not found");
          }

      

          const getTo = createRoomParticipants.filter(
               participant => participant.id !== user.id
          )[0];
          return prisma.createMessage({
               text: message,
               from: {
                    connect: { id: user.id }
               },
               to: {
                    connect: {
                    id: roomId ? getTo.id : toId
                    }
               },
               room: {
                    connect: {
                    id: room.id
                    }
               }
          });
          }
     }
};