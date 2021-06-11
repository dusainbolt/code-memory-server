import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ItemUpdateDTO } from './../src/models/items/dto/update-dto';
import { CreateItemDTO } from './../src/models/items/dto/create-item-dto';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemsModule } from './../src/models/items/items.module';

describe('ItemsController (e2e)', () => {
  let app;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ItemsModule,
        MongooseModule.forRoot(process.env.MONGO_DB_URL),
        EventEmitterModule.forRoot(),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const item: CreateItemDTO = {
    title: 'Great item',
    price: 10,
    description: 'Description of this great item',
  };

  let id: string = '';

  const updatedItem: ItemUpdateDTO = {
    title: 'Great updated item',
    price: 20,
    description: 'Updated description of this great item',
  };

  const createitemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createItemQuery = `
  mutation {
    createItem(input: ${createitemObject}) {
      title
      price
      description
      id
    }
  }`;

  it('createItem', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createItem;
        id = data.id;
        expect(data.title).toBe(item.title);
        expect(data.description).toBe(item.description);
        expect(data.price).toBe(item.price);
      })
      .expect(200);
  });

  it('getItems', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{items{title, price, description, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.items;
        const itemResult = data[data.length - 1];
        expect(data.length).toBeGreaterThan(0);
        expect(itemResult.title).toBe(item.title);
        expect(itemResult.description).toBe(item.description);
        expect(itemResult.price).toBe(item.price);
      })
      .expect(200);
  });

  const updateItemObject = JSON.stringify(updatedItem).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updateItem', () => {
    const updateItemQuery = `
    mutation {
      updateItem(id: "${id}", input: ${updateItemObject}) {
        title
        price
        description
        id
      }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.updateItem;
        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.price).toBe(updatedItem.price);
      })
      .expect(200);
  });

  it('deleteItem', () => {
    const deleteItemQuery = `
      mutation {
        deleteItem(id: "${id}") {
          title
          price
          description
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteItem;
        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.price).toBe(updatedItem.price);
      })
      .expect(200);
  });
});