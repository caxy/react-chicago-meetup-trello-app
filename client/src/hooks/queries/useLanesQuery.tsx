import { useQuery } from '@apollo/client';
import { gql } from '../../__generated__';
import { useEffect } from 'react';

const GET_LANES = gql(/* GraphQL */ `
  query GetLanes {
    lanes {
      id
      title
      position
      cards {
        description
        id
        label
        laneId
        title
        position
      }
    }
  }
`);

const LANES_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription LanesUpdated {
    lanesUpdated {
      cards {
        description
        id
        label
        laneId
        position
        title
      }
      id
      position
      title
    }
  }
`);

const CARD_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription CardAdded {
    cardAdded {
      description
      id
      label
      laneId
      position
      title
    }
  }
`);

const CARD_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription CardUpdated {
    cardUpdated {
      description
      id
      label
      laneId
      position
      title
    }
  }
`);

const CARD_DELETED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription CardDeleted {
    cardDeleted {
      description
      id
      label
      laneId
      position
      title
    }
  }
`);

export default function useLanesQuery() {
  const { subscribeToMore, ...result } = useQuery(GET_LANES);

  useEffect(() =>
    subscribeToMore({
      document: LANES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const updatedLanes = subscriptionData.data.lanesUpdated;

        const newLanes = updatedLanes.filter((updatedLane) => !prev.lanes.find((x) => x.id === updatedLane.id));

        return Object.assign({}, prev, {
          lanes: [
            ...prev.lanes.map((lane) => {
              const updatedLane = updatedLanes.find((x) => x.id === lane.id);
              return updatedLane ? Object.assign({}, lane, updatedLane) : lane;
            }),
            ...newLanes,
          ],
        });
      },
    }),
  );

  useEffect(() => subscribeToMore({
    document: CARD_ADDED_SUBSCRIPTION,
  }));

  useEffect(() => subscribeToMore({
    document: CARD_UPDATED_SUBSCRIPTION,
  }));

  useEffect(() => subscribeToMore({
    document: CARD_DELETED_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const deletedCard = subscriptionData.data.cardDeleted;
      const { id: deletedCardId, laneId} = deletedCard;

      return Object.assign({}, prev, {
        lanes: prev.lanes.map((lane): typeof lane => {
          if (lane.id !== laneId) {
            return lane;
          }

          return Object.assign({}, lane, {
            cards: lane.cards?.filter((x) => x.id !== deletedCardId),
          });
        }),
      });
    },
  }));

  return {
    ...result,
    subscribeToMore,
  };
}
