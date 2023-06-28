# demo resources

Apollo Client:

- [Getting Started](https://www.apollographql.com/docs/react/get-started)
- [Using TypeScript](https://www.apollographql.com/docs/react/development-testing/static-typing)




Setting up TypeScript:

```shell
yarn add -D typescript @graphql-codegen/cli @graphql-codegen/client-preset
```

Create `codegen.ts` file:

```shell
import 'dotenv/config';
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.REACT_APP_GRAPHQL_API_URL,
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;

```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "compile": "graphql-codegen",
    "watch": "graphql-codegen -w",
  }
}
```

Concurrently for watch:

https://www.npmjs.com/package/concurrently



Prepare lanes data for board:

```ts
function prepareLanesForBoard(lanes: Lane[]) {
  return lanes.map((lane): Lane => ({
    ...lane,
    cards: lane.cards?.map((card) => ({
      ...card,
      label: card.label || '',
      description: card.description || '',
    })),
  }))
}
```

board data:

```ts
const boardData = useMemo(() => data?.lanes ? { lanes: prepareLanesForBoard(cloneDeep(data.lanes)) } : defaultBoardData,
  [data?.lanes]);
```

UPDATING LOCAL DATA:

https://www.apollographql.com/docs/react/data/mutations#updating-local-data



### useCreateCardMutation:

```tsx
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
```


### useMoveCardMutation

```tsx
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

```

## Subscriptions

Websocket setup: https://www.apollographql.com/docs/react/data/subscriptions#websocket-setup

### useLanesQuery

```tsx
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

  return {
    ...result,
    subscribeToMore,
  };
}
```

### useLanesQuery FINAL

```tsx
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
```

### useDeleteMutation

```tsx
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
```



