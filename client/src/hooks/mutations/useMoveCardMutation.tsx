import { gql } from '../../__generated__';
import { Reference, StoreObject, useMutation } from '@apollo/client';

const MOVE_CARD = gql(/* GraphQL */`
  mutation MoveCard($moveCardInput: MoveCardInput!) {
    moveCard(moveCardInput: $moveCardInput) {
      description
      id
      label
      laneId
      position
      title
    }
  }
`);

export default function useMoveCardMutation() {
  return useMutation(MOVE_CARD, {
    update(cache, { data }, { variables }) {
      if (!data || !variables?.moveCardInput) {
        return;
      }
      const { moveCard } = data;
      const { id, laneId, oldLaneId } = variables.moveCardInput;
      const movedCard = moveCard.find((x) => x.id === id);

      // Remove card from the original lane.
      if (oldLaneId) {
        cache.modify({
          id: cache.identify({ __typename: 'Lane', id: oldLaneId }),
          fields: {
            cards(existingCardRefs: (StoreObject | Reference)[] = [], { readField }) {
              return existingCardRefs.filter(
                ref => id !== readField('id', ref)
              );
            },
          },
        });
      }

      if (!movedCard) {
        return;
      }

      cache.modify({
        id: cache.identify({ __typename: 'Lane', id: laneId }),
        fields: {
          cards(existingCardRefs: (StoreObject | Reference)[] = [], { readField }) {
            const newCardRef = cache.writeFragment({
              data: movedCard,
              fragment: gql(/* GraphQL */ `
                fragment MovedCard on Card {
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
            if (existingCardRefs.some((ref) => readField('id', ref) === movedCard.id)) {
              return existingCardRefs;
            }

            return [...existingCardRefs, newCardRef];
          },
        },
      });
    },
  });
}
