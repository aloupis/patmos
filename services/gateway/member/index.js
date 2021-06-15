const { authenticate } = require('../auth');
const db = require('../db');
const { memberColumns, memberRelations, memberJoins } = require('./model');
const { transformEntity } = require('../utils');
const { Sentry } = require('../sentry');

const resolvers = {
  Query: {
    members: async (_, { offset, limit, orderBy }) => {
      try {
        const members = await db.selectWithJoin(
          'member',
          memberColumns,
          memberJoins,
          null,
          offset,
          limit,
          orderBy && orderBy.field ? orderBy.field : 'member.id',
          orderBy && orderBy.direction ? orderBy.direction : 'desc'
        );
        return members.map((member) =>
          transformEntity(member, 'member', memberRelations)
        );
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    members_count: async (_, args) => {
      try {
        const total = await db.count('member', 'id');
        return total ? total.count : 0;
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    member_by_pk: async (_, { id }) => {
      try {
        const [member] = await db.selectWithJoin(
          'member',
          memberColumns,
          memberJoins,
          { 'member.id': id }
        );

        return transformEntity(member, 'member', memberRelations);
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
  },
  Mutation: {
    insert_member: async (_, { input }, { token }) => {
      try {
        // eslint-disable-next-line camelcase
        const {
          name_gr,
          name_en,
          description_gr,
          description_en,
          summary_gr,
          summary_en,
        } = input;
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        const [insertedMember] = await db.insert('member', {
          name_gr,
          name_en,
          description_gr,
          description_en,
          summary_gr,
          summary_en,
          author_id: user.id,
          created_at: new Date(),
        });
        const [member] = await db.selectWithJoin(
          'member',
          memberColumns,
          memberJoins,
          { 'member.id': insertedMember.id }
        );

        return transformEntity(member, 'member', memberRelations);
      } catch (err) {
        console.log({ err });
        Sentry.captureException(err);
        return null;
      }
    },
    update_member: async (_, { set, id }, { token }) => {
      try {
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        await db.update(
          'member',
          {
            ...set,
            editor_id: user.id,
            updated_at: new Date(),
          },
          id
        );

        const [member] = await db.selectWithJoin(
          'member',
          memberColumns,
          memberJoins,
          { 'member.id': id }
        );
        return transformEntity(member, 'member', memberRelations);
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    delete_member: async (_, { id }, { token }) => {
      try {
        authenticate(token);
        await db.deleteRecords('member', { id });
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
