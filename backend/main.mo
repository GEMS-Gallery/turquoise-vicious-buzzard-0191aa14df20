import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
  // Types
  type PostId = Nat;
  type Post = {
    id: PostId;
    title: Text;
    imageUrl: Text;
    category: ?Text;
    likes: Nat;
    comments: [Comment];
    createdAt: Time.Time;
  };
  type Comment = {
    text: Text;
    createdAt: Time.Time;
  };

  // Stable variables
  stable var posts : [Post] = [];
  stable var nextPostId : PostId = 0;

  // Mutable state
  let postsMap = HashMap.HashMap<PostId, Post>(0, Int.equal, Int.hash);

  // Helper functions
  func initializePostsMap() {
    for (post in posts.vals()) {
      postsMap.put(post.id, post);
    };
  };

  // Initialize posts map
  initializePostsMap();

  // API methods
  public func createPost(title: Text, imageUrl: Text, category: ?Text) : async Result.Result<PostId, Text> {
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
          switch (post.category) {
            case (null) { false };
            case (?postCategory) { Text.equal(postCategory, category) };
          }
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

  // Pre-upgrade
  system func preupgrade() {
    posts := Iter.toArray(postsMap.vals());
  };

  // Post-upgrade
  system func postupgrade() {
    initializePostsMap();
  };
}
