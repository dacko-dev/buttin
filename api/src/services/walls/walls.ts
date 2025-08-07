import type {
  QueryResolvers,
  MutationResolvers,
  WallRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const walls: QueryResolvers['walls'] = () => {
  return db.wall.findMany()
}

export const wall: QueryResolvers['wall'] = ({ id }) => {
  return db.wall.findUnique({
    where: { id },
  })
}

export const createWall: MutationResolvers['createWall'] = ({ input }) => {
  return db.wall.create({
    data: input,
  })
}

export const updateWall: MutationResolvers['updateWall'] = ({ id, input }) => {
  return db.wall.update({
    data: input,
    where: { id },
  })
}

export const deleteWall: MutationResolvers['deleteWall'] = ({ id }) => {
  return db.wall.delete({
    where: { id },
  })
}

export const Wall: WallRelationResolvers = {
  buttons: (_obj, { root }) => {
    return db.wall.findUnique({ where: { id: root?.id } }).buttons()
  },
}
