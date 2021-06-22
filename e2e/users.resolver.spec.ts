// import { CreateUser } from './../src/models/users/dto/create-user-dto';
// import { UsersModule } from './../src/models/users/users.module';
// import { ConfigModule } from '@nestjs/config';
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { ItemUpdateDTO } from '../src/models/items/dto/update-dto';
// import { CreateItemDTO } from '../src/models/items/dto/create-item-dto';
// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import { MongooseModule } from '@nestjs/mongoose';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ItemsModule } from '../src/models/items/items.module';

// describe('UserResolver (e2e)', () => {
//     let app;
//     beforeAll(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [
//                 ConfigModule.forRoot(),
//                 UsersModule,
//                 MongooseModule.forRoot(process.env.MONGO_DB_URL),
//                 EventEmitterModule.forRoot(),
//                 GraphQLModule.forRoot({
//                     autoSchemaFile: 'schema.gql',
//                 }),
//             ],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         await app.init();
//     });

//     afterAll(async () => {
//         await app.close();
//     });

//     const random = Math.floor(Math.random() * 100) + 1;
//     const userName = `dutest_${random}`;
//     const email = `test${random}@gmail.com`;

//     const user: CreateUser = {
//         firstName: 'Du',
//         lastName: 'Le',
//         fullName: 'Le Huy Du',
//         userName: userName,
//         password: 'du@dev1234',
//         age: 22,
//         gender: 1,
//         email: email,
//         items: ['60b1d4528989ca82d61a810e'],
//     };

//     let id: string = '';

//     const updatedItem: ItemUpdateDTO = {
//         title: 'Great updated item',
//         price: 20,
//         description: 'Updated description of this great item',
//     };

//     const createUserObjectString = JSON.stringify(user).replace(/\"([^(\")"]+)\":/g, '$1:');

//     const createUserQuery = `
//   mutation {
//     createItem(input: ${createUserObjectString}) {
//       title
//       price
//       description
//       id
//     }
//   }`;

//     it('createUser', () => {
//         return request(app.getHttpServer())
//             .post('/graphql')
//             .send({
//                 operationName: null,
//                 query: createItemQuery,
//             })
//             .expect(({ body }) => {
//                 const data = body.data.createItem;
//                 id = data.id;
//                 expect(data.title).toBe(item.title);
//                 expect(data.description).toBe(item.description);
//                 expect(data.price).toBe(item.price);
//             })
//             .expect(200);
//     });

//     // it('getItems', () => {
//     //   return request(app.getHttpServer())
//     //     .post('/graphql')
//     //     .send({
//     //       operationName: null,
//     //       query: '{items{title, price, description, id}}',
//     //     })
//     //     .expect(({ body }) => {
//     //       const data = body.data.items;
//     //       const itemResult = data[data.length - 1];
//     //       expect(data.length).toBeGreaterThan(0);
//     //       expect(itemResult.title).toBe(item.title);
//     //       expect(itemResult.description).toBe(item.description);
//     //       expect(itemResult.price).toBe(item.price);
//     //     })
//     //     .expect(200);
//     // });

//     // const updateItemObject = JSON.stringify(updatedItem).replace(
//     //   /\"([^(\")"]+)\":/g,
//     //   '$1:',
//     // );

//     // it('updateItem', () => {
//     //   const updateItemQuery = `
//     //   mutation {
//     //     updateItem(id: "${id}", input: ${updateItemObject}) {
//     //       title
//     //       price
//     //       description
//     //       id
//     //     }
//     //   }`;

//     //   return request(app.getHttpServer())
//     //     .post('/graphql')
//     //     .send({
//     //       operationName: null,
//     //       query: updateItemQuery,
//     //     })
//     //     .expect(({ body }) => {
//     //       const data = body.data.updateItem;
//     //       expect(data.title).toBe(updatedItem.title);
//     //       expect(data.description).toBe(updatedItem.description);
//     //       expect(data.price).toBe(updatedItem.price);
//     //     })
//     //     .expect(200);
//     // });

//     // it('deleteItem', () => {
//     //   const deleteItemQuery = `
//     //     mutation {
//     //       deleteItem(id: "${id}") {
//     //         title
//     //         price
//     //         description
//     //         id
//     //       }
//     //     }`;

//     //   return request(app.getHttpServer())
//     //     .post('/graphql')
//     //     .send({
//     //       operationName: null,
//     //       query: deleteItemQuery,
//     //     })
//     //     .expect(({ body }) => {
//     //       const data = body.data.deleteItem;
//     //       expect(data.title).toBe(updatedItem.title);
//     //       expect(data.description).toBe(updatedItem.description);
//     //       expect(data.price).toBe(updatedItem.price);
//     //     })
//     //     .expect(200);
//     // });
// });
