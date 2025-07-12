import { pgTable, uuid, varchar, text, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

// Enum for request status
const requestStatusEnum = pgEnum('status', ['pending', 'reject', 'accepted', 'finish']);

// Users Table
const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  location: varchar('location', { length: 100 }),
  profilePic: text('profilePic'), // profile picture base64
  weekday: varchar('weekday', { length: 100 }),
  isPrivate: boolean('is_private').default(false),
  totalRating: integer('total_rating').default(0),
  noOfRaters: integer('no_of_raters').default(0),
  discord: varchar('discord', { length: 100 }),
  report: integer('report').default(0),
});

// Skills Table
const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  isOffered: boolean('is_offered').default(false),
});

// Requests Table
const requests = pgTable('requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  from: uuid('from_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  to: uuid('to_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: requestStatusEnum('status').default('pending'),
  time: varchar('time', { length: 100 }),
  offeredSkill: uuid('offered_skill_id')
    .notNull()
    .references(() => skills.id, { onDelete: 'cascade' }),
  wantedSkill: uuid('wanted_skill_id')
    .notNull()
    .references(() => skills.id, { onDelete: 'cascade' }),
  msg: text('msg'),
});

export {
  users,
  skills,
  requests,
  requestStatusEnum,
};