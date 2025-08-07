import type {
  QueryResolvers,
  MutationResolvers,
  ButtonClickRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const buttonClicks: QueryResolvers['buttonClicks'] = () => {
  return db.buttonClick.findMany()
}

export const buttonClick: QueryResolvers['buttonClick'] = ({ id }) => {
  return db.buttonClick.findUnique({
    where: { id },
  })
}

export const createButtonClick: MutationResolvers['createButtonClick'] = ({
  input,
}) => {
  return db.buttonClick.create({
    data: input,
  })
}

export const updateButtonClick: MutationResolvers['updateButtonClick'] = ({
  id,
  input,
}) => {
  return db.buttonClick.update({
    data: input,
    where: { id },
  })
}

export const deleteButtonClick: MutationResolvers['deleteButtonClick'] = ({
  id,
}) => {
  return db.buttonClick.delete({
    where: { id },
  })
}

export const ButtonClick: ButtonClickRelationResolvers = {
  button: (_obj, { root }) => {
    return db.buttonClick.findUnique({ where: { id: root?.id } }).button()
  },
  user: (_obj, { root }) => {
    return db.buttonClick.findUnique({ where: { id: root?.id } }).user()
  },
}
