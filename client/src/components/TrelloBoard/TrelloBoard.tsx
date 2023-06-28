import React, { useCallback, useEffect, useState } from 'react';
import Board, { BoardData, DraggableCard, EventBus } from 'react-trello';

const data = require('../../data.json');

const handleDragStart = (cardId: string, laneId: string) => {
  console.log('drag started');
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId: string, sourceLaneId: string, targetLaneId: string) => {
  console.log('drag ended');
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

interface TrelloBoardProps {
}

type Props = TrelloBoardProps;

const TrelloBoard = (props: Props) => {
  const [boardData, setBoardData] = useState<BoardData>({ lanes: [] });
  let eventBus: EventBus | undefined = undefined;
  const setEventBus = (handle: EventBus) => {
    eventBus = handle;
  };

  useEffect(() => {
    const getBoard = async (): Promise<BoardData> => {
      return new Promise((resolve) => {
        resolve(data);
      });
    };
    (async () => {
      const response = await getBoard();
      setBoardData(response);
    })();
  }, []);

  const handleLaneDragEnd = useCallback((laneId: string, newPosition: number) => {
    console.log('lane drag ended');
    console.log(`laneId: ${laneId}`);
    console.log(`newPosition: ${newPosition}`);
  }, []);

  const handleCardDelete = useCallback((cardId: string, laneId: string) => {
    console.log('card deleted', `cardId: ${cardId}`, `laneId: ${laneId}`);
  }, []);

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
  const handleCardAdd = useCallback((card: DraggableCard, laneId: string) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
  }, []);

  return (
    <>
      <button onClick={completeCard} style={{ margin: 5 }}>
        Complete Buy Milk
      </button>
      <button onClick={addCard} style={{ margin: 5 }}>
        Add Blocked
      </button>
      <Board
        editable
        draggable
        data={boardData}
        onCardAdd={handleCardAdd}
        onCardDelete={handleCardDelete}
        onDataChange={handleDataChange}
        eventBusHandle={setEventBus}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleLaneDragEnd={handleLaneDragEnd}
      />
    </>
  );
};

export default TrelloBoard;
