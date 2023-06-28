/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateCard($createCardInput: CreateCardInput!) {\n    createCard(createCardInput: $createCardInput) {\n      id\n      laneId\n      title\n      description\n      label\n      position\n    }\n  }\n": types.CreateCardDocument,
    "\n                fragment NewCard on Card {\n                  id\n                  title\n                  label\n                  description\n                  laneId\n                  position\n                }\n              ": types.NewCardFragmentDoc,
    "\n  mutation RemoveCard($removeCardId: String!) {\n    removeCard(id: $removeCardId) {\n      id\n      laneId\n    }\n  }\n": types.RemoveCardDocument,
    "\n  mutation MoveCard($moveCardInput: MoveCardInput!) {\n    moveCard(moveCardInput: $moveCardInput) {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n": types.MoveCardDocument,
    "\n                fragment MovedCard on Card {\n                  id\n                  title\n                  label\n                  description\n                  laneId\n                  position\n                }\n              ": types.MovedCardFragmentDoc,
    "\n  mutation UpdateCard($updateCardInput: UpdateCardInput!) {\n    updateCard(updateCardInput: $updateCardInput) {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n": types.UpdateCardDocument,
    "\n  query GetLanes {\n    lanes {\n      id\n      title\n      position\n      cards {\n        description\n        id\n        label\n        laneId\n        title\n        position\n      }\n    }\n  }\n": types.GetLanesDocument,
    "\n  subscription LanesUpdated {\n    lanesUpdated {\n      cards {\n        description\n        id\n        label\n        laneId\n        position\n        title\n      }\n      id\n      position\n      title\n    }\n  }\n": types.LanesUpdatedDocument,
    "\n  subscription CardAdded {\n    cardAdded {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n": types.CardAddedDocument,
    "\n  subscription CardUpdated {\n    cardUpdated {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n": types.CardUpdatedDocument,
    "\n  subscription CardDeleted {\n    cardDeleted {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n": types.CardDeletedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCard($createCardInput: CreateCardInput!) {\n    createCard(createCardInput: $createCardInput) {\n      id\n      laneId\n      title\n      description\n      label\n      position\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCard($createCardInput: CreateCardInput!) {\n    createCard(createCardInput: $createCardInput) {\n      id\n      laneId\n      title\n      description\n      label\n      position\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                fragment NewCard on Card {\n                  id\n                  title\n                  label\n                  description\n                  laneId\n                  position\n                }\n              "): (typeof documents)["\n                fragment NewCard on Card {\n                  id\n                  title\n                  label\n                  description\n                  laneId\n                  position\n                }\n              "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveCard($removeCardId: String!) {\n    removeCard(id: $removeCardId) {\n      id\n      laneId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCard($removeCardId: String!) {\n    removeCard(id: $removeCardId) {\n      id\n      laneId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MoveCard($moveCardInput: MoveCardInput!) {\n    moveCard(moveCardInput: $moveCardInput) {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation MoveCard($moveCardInput: MoveCardInput!) {\n    moveCard(moveCardInput: $moveCardInput) {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                fragment MovedCard on Card {\n                  id\n                  title\n                  label\n                  description\n                  laneId\n                  position\n                }\n              "): (typeof documents)["\n                fragment MovedCard on Card {\n                  id\n                  title\n                  label\n                  description\n                  laneId\n                  position\n                }\n              "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCard($updateCardInput: UpdateCardInput!) {\n    updateCard(updateCardInput: $updateCardInput) {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCard($updateCardInput: UpdateCardInput!) {\n    updateCard(updateCardInput: $updateCardInput) {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLanes {\n    lanes {\n      id\n      title\n      position\n      cards {\n        description\n        id\n        label\n        laneId\n        title\n        position\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLanes {\n    lanes {\n      id\n      title\n      position\n      cards {\n        description\n        id\n        label\n        laneId\n        title\n        position\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription LanesUpdated {\n    lanesUpdated {\n      cards {\n        description\n        id\n        label\n        laneId\n        position\n        title\n      }\n      id\n      position\n      title\n    }\n  }\n"): (typeof documents)["\n  subscription LanesUpdated {\n    lanesUpdated {\n      cards {\n        description\n        id\n        label\n        laneId\n        position\n        title\n      }\n      id\n      position\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription CardAdded {\n    cardAdded {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"): (typeof documents)["\n  subscription CardAdded {\n    cardAdded {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription CardUpdated {\n    cardUpdated {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"): (typeof documents)["\n  subscription CardUpdated {\n    cardUpdated {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription CardDeleted {\n    cardDeleted {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"): (typeof documents)["\n  subscription CardDeleted {\n    cardDeleted {\n      description\n      id\n      label\n      laneId\n      position\n      title\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;