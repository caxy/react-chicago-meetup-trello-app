import { gql } from '../../__generated__';
import { Reference, StoreObject, useMutation } from '@apollo/client';

const REMOVE_CARD = gql(/* GraphQL */ `
  mutation RemoveCard($removeCardId: String!) {
    removeCard(id: $removeCardId) {
      id
      laneId
    }
  }
`);

export default function useDeleteCardMutation() {
  return useMutation(REMOVE_CARD, {
    update(cache, { data }, { variables }) {
      if (!data || !variables?.removeCardId) {
        return;
      }
      const { removeCard } = data;
      const { laneId } = removeCard;
      const cardId = variables?.removeCardId;

      // Remove card from the original lane.
      cache.modify({
        id: cache.identify({ __typename: 'Lane', id: laneId }),
        fields: {
          cards(existingCardRefs: (StoreObject | Reference)[] = [], { readField }) {
            return existingCardRefs.filter((ref) => cardId !== readField('id', ref));
          },
        },
      });
    },
  });
}
