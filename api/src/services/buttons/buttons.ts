import type {
  QueryResolvers,
  MutationResolvers,
  ButtonRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const buttons: QueryResolvers['buttons'] = () => {
  return db.button.findMany()
}

export const button: QueryResolvers['button'] = ({ id }) => {
  return db.button.findUnique({
    where: { id },
  })
}

export const createButton: MutationResolvers['createButton'] = ({ input }) => {
  return db.button.create({
    data: input,
  })
}

export const updateButton: MutationResolvers['updateButton'] = ({
  id,
  input,
}) => {
  return db.button.update({
    data: input,
    where: { id },
  })
}

export const deleteButton: MutationResolvers['deleteButton'] = ({ id }) => {
  return db.button.delete({
    where: { id },
  })
}

export const Button: ButtonRelationResolvers = {
  creator: (_obj, { root }) => {
    return db.button.findUnique({ where: { id: root?.id } }).creator()
  },
  wall: (_obj, { root }) => {
    return db.button.findUnique({ where: { id: root?.id } }).wall()
  },
  ButtonClick: (_obj, { root }) => {
    return db.button.findUnique({ where: { id: root?.id } }).ButtonClick()
  },
  Tag: (_obj, { root }) => {
    return db.button.findUnique({ where: { id: root?.id } }).Tag()
  },
}
