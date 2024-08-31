export const idlFactory = ({ IDL }) => {
  const PostId = IDL.Nat;
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : PostId, 'err' : IDL.Text });
  const Time = IDL.Int;
  const Comment = IDL.Record({ 'createdAt' : Time, 'text' : IDL.Text });
  const Post = IDL.Record({
    'id' : PostId,
    'title' : IDL.Text,
    'createdAt' : Time,
    'likes' : IDL.Nat,
    'imageUrl' : IDL.Text,
    'category' : IDL.Text,
    'comments' : IDL.Vec(Comment),
  });
  return IDL.Service({
    'addComment' : IDL.Func([PostId, IDL.Text], [Result], []),
    'createPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_1], []),
    'getPosts' : IDL.Func([IDL.Opt(IDL.Text)], [IDL.Vec(Post)], ['query']),
    'likePost' : IDL.Func([PostId], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
