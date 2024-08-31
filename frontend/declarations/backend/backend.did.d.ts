import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment { 'createdAt' : bigint, 'text' : string }
export interface Post {
  'id' : PostId,
  'title' : string,
  'createdAt' : bigint,
  'likes' : bigint,
  'imageUrl' : string,
  'category' : string,
  'comments' : Array<Comment>,
}
export type PostId = bigint;
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : PostId } |
  { 'err' : string };
export interface _SERVICE {
  'addComment' : ActorMethod<[PostId, string], Result>,
  'createPost' : ActorMethod<[string, string, string], Result_1>,
  'getPosts' : ActorMethod<[[] | [string]], Array<Post>>,
  'likePost' : ActorMethod<[PostId], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
