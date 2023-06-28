import { gql } from '../../__generated__';
import { Reference, StoreObject, useMutation } from '@apollo/client';

const CREATE_CARD = gql(/* GraphQL */ `
  mutation CreateCard($createCardInput: CreateCardInput!) {
    createCard(createCardInput: $createCardInput) {
      id
      laneId
      title
      description
      label
      position
    }
  }
`);

export default function useCreateCardMutation() {
  return useMutation(CREATE_CARD, {
    update(cache, { data }) {
      if (!data) {
        return;
      }

      const { createCard } = data;
      cache.modify({
        id: cache.identify({ __typename: 'Lane', id: createCard.laneId }),
        fields: {
          cards(existingCardRefs: (StoreObject | Reference)[] = [], { readField }) {
            const newCardRef = cache.writeFragment({
              data: createCard,
              fragment: gql(/* GraphQL */ `
                fragment NewCard on Card {
                  id
                  title
                  label
                  description
                  laneId
                  position
                }
              `),
            });

            // Quick safety check - if the new comment is already
            // present in the cache, we don't need to add it again.
            if (existingCardRefs.some((ref) => readField('id', ref) === createCard.id)) {
              return existingCardRefs;
            }

            return [...existingCardRefs, newCardRef];
          },
        },
      });
    },
  });
}
