import React, { useCallback, useMemo, useRef } from 'react';
import Board, { BoardData, DraggableCard, EventBus, Lane as TrelloLane } from 'react-trello';
import cloneDeep from 'lodash/cloneDeep';
import useLanesQuery from '../../hooks/queries/useLanesQuery';
import useCreateCardMutation from '../../hooks/mutations/useCreateCardMutation';
import { Card, Lane } from '../../__generated__/graphql';
import useMoveCardMutation from '../../hooks/mutations/useMoveCardMutation';
import useUpdateCardMutation from '../../hooks/mutations/useUpdateCardMutation';
import useDeleteCardMutation from '../../hooks/mutations/useDeleteCardMutation';

function laneSortFunction(card1: DraggableCard<CardMetadata>, card2: DraggableCard<CardMetadata>): number {
  return (card1.metadata?.position || 0) - (card2.metadata?.position || 0);
}

const handleDragStart = (cardId: string, laneId: string) => {
  console.log('drag started');
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

type CardMetadata = Card;

function prepareLanesForBoard(lanes: Lane[]): TrelloLane<CardMetadata>[] {
  console.log('prepareLanesForBoard');
  return lanes.map((lane): TrelloLane<CardMetadata> => {
    const newLane = {
      ...lane,
      cards: lane.cards?.map((card) => ({
        id: card.id,
        title: card.title,
        label: card.label || '',
        description: card.description || '',
        metadata: card,
      })),
    };
    newLane.cards?.sort(laneSortFunction);

    return newLane;
  });
}

const defaultBoardData = { lanes: [] };

interface TrelloBoardProps {}

type Props = TrelloBoardProps;

const TrelloBoard = (props: Props) => {
  const { loading, error, data } = useLanesQuery();
  const boardData: BoardData<CardMetadata> = useMemo(
    () => (data?.lanes ? { lanes: prepareLanesForBoard(cloneDeep(data.lanes)) } : defaultBoardData),
    [data?.lanes],
  );
  const [createCard] = useCreateCardMutation();
  const [updateCard] = useUpdateCardMutation();
  const [moveCard] = useMoveCardMutation();
  const [deleteCard] = useDeleteCardMutation();

  const eventBusRef = useRef<EventBus | undefined>();
  const eventBus = eventBusRef.current;
  const setEventBus = (handle: EventBus) => {
    eventBusRef.current = handle;
  };

  const handleDragEnd = useCallback((cardId: string, sourceLaneId: string, targetLaneId: string, position: number, card: DraggableCard<CardMetadata>) => {
    console.log('drag ended');
    console.log(`cardId: ${cardId}`);
    console.log(`sourceLaneId: ${sourceLaneId}`);
    console.log(`targetLaneId: ${targetLaneId}`);
    if (card.metadata) {
      card.metadata.position = position;
    }
    moveCard({
      variables: {
        moveCardInput: {
          id: cardId,
          laneId: targetLaneId,
          oldLaneId: sourceLaneId,
          newPosition: position,
        },
      },
    });
  }, [moveCard]);

  const handleLaneDragEnd = useCallback((laneId: string, newPosition: number) => {
    console.log('lane drag ended');
    console.log(`laneId: ${laneId}`);
    console.log(`newPosition: ${newPosition}`);
  }, []);

  const handleCardDelete = useCallback((cardId: string, laneId: string) => {
    console.log('card deleted', `cardId: ${cardId}`, `laneId: ${laneId}`);
    deleteCard({
      variables: {
        removeCardId: cardId,
      },
    });
  }, [deleteCard]);

  const completeCard = useCallback(() => {
    eventBus?.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    });
    eventBus?.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    });
  }, [eventBus]);

  const addCard = useCallback(() => {
    eventBus?.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    });
  }, [eventBus]);

  const handleDataChange = useCallback((nextData: unknown) => {
    console.log('Data has been changed');
    console.log(nextData);
  }, []);

  const handleCardAdd = useCallback(
    async (card: DraggableCard, laneId: string) => {
      console.log(`New card added to lane ${laneId}`);
      console.dir(card);
      const { data } = await createCard({
        variables: {
          createCardInput: {
            id: card.id,
            laneId,
            title: card.title,
            label: card.label,
            description: card.description,
          },
        },
      });
      if (data?.createCard) {
        card.metadata = data.createCard;
        eventBus?.publish({
          type: 'UPDATE_CARD',
          laneId: laneId,
          card,
        });
      }
    },
    [createCard, eventBus],
  );

  const handleCardUpdate = useCallback(
    async (laneId: string, card: DraggableCard) => {
      console.log(`Card updated in lane: ${laneId}`);
      console.dir(card);
      if (card.id) {
        await updateCard({
          variables: {
            updateCardInput: {
              id: card.id,
              title: card.title,
              label: card.label,
              description: card.description,
            },
          },
        });
      }
    },
    [updateCard],
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return (
    <Board<CardMetadata>
      editable
      draggable
      data={boardData ?? defaultBoardData}
      onCardAdd={handleCardAdd}
      onCardUpdate={handleCardUpdate}
      onCardDelete={handleCardDelete}
      onDataChange={handleDataChange}
      eventBusHandle={setEventBus}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      handleLaneDragEnd={handleLaneDragEnd}
    />
  );
};

export default TrelloBoard;
