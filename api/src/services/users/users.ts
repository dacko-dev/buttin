import type { Prisma } from '@prisma/client'
import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { createAudit } from 'src/services/audits/audits'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userProfile: QueryResolvers['userProfile'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      displayName: true,
      email: true,
      avatarUrl: true,
      bio: true,
      birthday: true,
      Button: true,
      ButtonClick: true,
    },
  })
}

export const userProfiles: QueryResolvers['userProfiles'] = () => {
  return db.user.findMany({
    select: {
      id: true,
      displayName: true,
      email: true,
      avatarUrl: true,
      bio: true,
      birthday: true,
      Button: true,
      ButtonClick: true,
    },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const emailUser = async ({ id }: Prisma.UserWhereUniqueInput) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  await sendTestEmail(user.email)
  await createAudit({
    input: { userId: id, log: 'Admin sent email to user' },
  })
  return user
}

function sendTestEmail(emailAddress: string) {
  const subject = 'Test Email'
  const text =
    'This is a manually triggered test email.\n\n' +
    'It was sent from a Buttin App.'
  const html =
    'This is a manually triggered test email.<br><br>' +
    'It was sent from a Buttin App.'
  return sendEmail({ to: emailAddress, subject, text, html })
}

export const User: UserRelationResolvers = {
  Button: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Button()
  },
  ButtonClick: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).ButtonClick()
  },
  Audit: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Audit()
  },
}
