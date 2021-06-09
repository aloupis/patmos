const { authenticate } = require('../auth');
const db = require('../db');
const { serviceColumns, serviceRelations, serviceJoins } = require('./model');
const { transformEntity } = require('../utils');
const { Sentry } = require('../sentry');

const resolvers = {
  Query: {
    services: async (_, { offset, limit, orderBy }) => {
      try {
        const services = await db.selectWithJoin(
          'service',
          serviceColumns,
          serviceJoins,
          null,
          offset,
          limit,
          orderBy && orderBy.field ? orderBy.field : 'service.id',
          orderBy && orderBy.direction ? orderBy.direction : 'desc'
        );
        return services.map((service) =>
          transformEntity(service, 'service', serviceRelations)
        );
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    services_count: async (_, args) => {
      try {
        const total = await db.count('service', 'id');
        return total ? total.count : 0;
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    service_by_pk: async (_, { id }) => {
      try {
        const [service] = await db.selectWithJoin(
          'service',
          serviceColumns,
          serviceJoins,
          {
            'service.id': id,
          }
        );

        return transformEntity(service, 'service', serviceRelations);
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
  },
  Mutation: {
    insert_service: async (_, { input }, { token }) => {
      try {
        // eslint-disable-next-line camelcase
        const { name_gr, name_en, content_gr, content_en, category_id, price } =
          input;
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        const [insertedService] = await db.insert('service', {
          name_gr,
          name_en,
          content_gr,
          content_en,
          author_id: user.id,
          category_id,
          price,
          created_at: new Date(),
        });
        const [service] = await db.selectWithJoin(
          'service',
          serviceColumns,
          serviceJoins,
          {
            'service.id': insertedService.id,
          }
        );

        return transformEntity(service, 'service', serviceRelations);
      } catch (err) {
        console.log({ err });
        Sentry.captureException(err);
        return null;
      }
    },
    update_service: async (_, { set, id }, { token }) => {
      try {
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        await db.update(
          'service',
          {
            ...set,
            editor_id: user.id,
            updated_at: new Date(),
          },
          id
        );

        const [service] = await db.selectWithJoin(
          'service',
          serviceColumns,
          serviceJoins,
          {
            'service.id': id,
          }
        );
        return transformEntity(service, 'service', serviceRelations);
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    delete_service: async (_, { id }, { token }) => {
      try {
        authenticate(token);
        await db.deleteRecords('service', { id });
        return {
          success: true,
        };
      } catch (err) {
        Sentry.captureException(err);
        return {
          success: false,
          message: err,
        };
      }
    },
  },
};

module.exports = resolvers;
