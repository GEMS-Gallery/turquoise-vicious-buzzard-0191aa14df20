import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
  type PostId = Nat;
  type Post = {
    id: PostId;
    title: Text;
    imageUrl: Text;
    category: Text;
    likes: Nat;
    comments: [Comment];
    createdAt: Int;
  };
  type Comment = {
    text: Text;
    createdAt: Int;
  };

  stable var posts : [Post] = [];
  stable var nextPostId : PostId = 0;

  let postsMap = HashMap.HashMap<PostId, Post>(0, Nat.equal, Int.hash);

  func initializePostsMap() {
    for (post in posts.vals()) {
      postsMap.put(post.id, post);
    };
  };

  initializePostsMap();

  public func createPost(title: Text, imageUrl: Text, category: Text) : async Result.Result<PostId, Text> {
    let postId = nextPostId;
    let newPost : Post = {
      id = postId;
      title = title;
      imageUrl = imageUrl;
      category = category;
      likes = 0;
      comments = [];
      createdAt = Time.now();
    };
    postsMap.put(postId, newPost);
    nextPostId += 1;
    #ok(postId)
  };

  public query func getPosts(categoryFilter: ?Text) : async [Post] {
    let allPosts = Iter.toArray(postsMap.vals());
    switch (categoryFilter) {
      case (null) { allPosts };
      case (?category) {
        Array.filter<Post>(allPosts, func (post) {
          Text.equal(post.category, category)
        })
      };
    }
  };

  public func likePost(postId: PostId) : async Result.Result<(), Text> {
    switch (postsMap.get(postId)) {
      case (null) { #err("Post not found") };
      case (?post) {
        let updatedPost = {
          post with likes = post.likes + 1
        };
        postsMap.put(postId, updatedPost);
        #ok()
      };
    }
  };

  public func addComment(postId: PostId, text: Text) : async Result.Result<(), Text> {
    switch (postsMap.get(postId)) {
      case (null) { #err("Post not found") };
      case (?post) {
        let newComment : Comment = {
          text = text;
          createdAt = Time.now();
        };
        let updatedPost = {
          post with comments = Array.append<Comment>(post.comments, [newComment])
        };
        postsMap.put(postId, updatedPost);
        #ok()
      };
    }
  };

  system func preupgrade() {
    posts := Iter.toArray(postsMap.vals());
  };

  system func postupgrade() {
    initializePostsMap();
  };
}
