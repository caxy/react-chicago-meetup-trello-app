/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Card = {
  __typename?: 'Card';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lane?: Maybe<Lane>;
  laneId: Scalars['String']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type CreateCardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  laneId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateLaneInput = {
  title: Scalars['String']['input'];
};

export type Lane = {
  __typename?: 'Lane';
  cards?: Maybe<Array<Card>>;
  id: Scalars['String']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type MoveCardInput = {
  id: Scalars['String']['input'];
  laneId: Scalars['String']['input'];
  newPosition: Scalars['Float']['input'];
  oldLaneId?: InputMaybe<Scalars['String']['input']>;
};

export type MoveLaneInput = {
  id: Scalars['String']['input'];
  newPosition: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCard: Card;
  createLane: Lane;
  moveCard: Array<Card>;
  moveLane: Array<Lane>;
  removeCard: Card;
  removeLane: Lane;
  updateCard: Card;
  updateLane: Lane;
};


export type MutationCreateCardArgs = {
  createCardInput: CreateCardInput;
};


export type MutationCreateLaneArgs = {
  createLaneInput: CreateLaneInput;
};


export type MutationMoveCardArgs = {
  moveCardInput: MoveCardInput;
};


export type MutationMoveLaneArgs = {
  moveLaneInput: MoveLaneInput;
};


export type MutationRemoveCardArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveLaneArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCardArgs = {
  updateCardInput: UpdateCardInput;
};


export type MutationUpdateLaneArgs = {
  updateLaneInput: UpdateLaneInput;
};

export type Query = {
  __typename?: 'Query';
  card: Card;
  cards: Array<Card>;
  lane: Lane;
  lanes: Array<Lane>;
};


export type QueryCardArgs = {
  id: Scalars['String']['input'];
};


export type QueryLaneArgs = {
  id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cardAdded: Card;
  cardDeleted: Card;
  cardUpdated: Card;
  laneDeleted: Lane;
  lanesUpdated: Array<Lane>;
};

export type UpdateCardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLaneInput = {
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCardMutationVariables = Exact<{
  createCardInput: CreateCardInput;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'Card', id: string, laneId: string, title: string, description?: string | null, label?: string | null, position: number } };

export type NewCardFragment = { __typename?: 'Card', id: string, title: string, label?: string | null, description?: string | null, laneId: string, position: number } & { ' $fragmentName'?: 'NewCardFragment' };

export type RemoveCardMutationVariables = Exact<{
  removeCardId: Scalars['String']['input'];
}>;


export type RemoveCardMutation = { __typename?: 'Mutation', removeCard: { __typename?: 'Card', id: string, laneId: string } };

export type MoveCardMutationVariables = Exact<{
  moveCardInput: MoveCardInput;
}>;


export type MoveCardMutation = { __typename?: 'Mutation', moveCard: Array<{ __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, position: number, title: string }> };

export type MovedCardFragment = { __typename?: 'Card', id: string, title: string, label?: string | null, description?: string | null, laneId: string, position: number } & { ' $fragmentName'?: 'MovedCardFragment' };

export type UpdateCardMutationVariables = Exact<{
  updateCardInput: UpdateCardInput;
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard: { __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, position: number, title: string } };

export type GetLanesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanesQuery = { __typename?: 'Query', lanes: Array<{ __typename?: 'Lane', id: string, title: string, position: number, cards?: Array<{ __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, title: string, position: number }> | null }> };

export type LanesUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LanesUpdatedSubscription = { __typename?: 'Subscription', lanesUpdated: Array<{ __typename?: 'Lane', id: string, position: number, title: string, cards?: Array<{ __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, position: number, title: string }> | null }> };

export type CardAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CardAddedSubscription = { __typename?: 'Subscription', cardAdded: { __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, position: number, title: string } };

export type CardUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CardUpdatedSubscription = { __typename?: 'Subscription', cardUpdated: { __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, position: number, title: string } };

export type CardDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CardDeletedSubscription = { __typename?: 'Subscription', cardDeleted: { __typename?: 'Card', description?: string | null, id: string, label?: string | null, laneId: string, position: number, title: string } };

export const NewCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<NewCardFragment, unknown>;
export const MovedCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MovedCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<MovedCardFragment, unknown>;
export const CreateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCardInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const RemoveCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}}]}}]}}]} as unknown as DocumentNode<RemoveCardMutation, RemoveCardMutationVariables>;
export const MoveCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moveCardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoveCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"moveCardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moveCardInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<MoveCardMutation, MoveCardMutationVariables>;
export const UpdateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCardInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateCardMutation, UpdateCardMutationVariables>;
export const GetLanesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLanes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lanes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<GetLanesQuery, GetLanesQueryVariables>;
export const LanesUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LanesUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lanesUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<LanesUpdatedSubscription, LanesUpdatedSubscriptionVariables>;
export const CardAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CardAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CardAddedSubscription, CardAddedSubscriptionVariables>;
export const CardUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CardUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CardUpdatedSubscription, CardUpdatedSubscriptionVariables>;
export const CardDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CardDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"laneId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CardDeletedSubscription, CardDeletedSubscriptionVariables>;