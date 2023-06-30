import { gql } from '../../__generated__';
import { useMutation } from '@apollo/client';

const UPDATE_CARD = gql(/* GraphQL */`
  mutation UpdateCard($updateCardInput: UpdateCardInput!) {
    updateCard(updateCardInput: $updateCardInput) {
      description
      id
      label
      laneId
      position
      title
    }
  }
`);

export default function useUpdateCardMutation() {
  return useMutation(UPDATE_CARD);
}
