const messages = [
  {
    _id: 1,
    text: "Hello! How are you?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "John Doe",
      avatar: "https://placeimg.com/140/140/people",
    },
  },
  {
    _id: 2,
    text: "Here is a cool picture I took!",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "You",
      avatar: "https://placeimg.com/140/140/any",
    },
    image: "https://placeimg.com/500/500/nature",
  },
  {
    _id: 3,
    text: "Check out this video!",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "John Doe",
      avatar: "https://placeimg.com/140/140/people",
    },
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
  },
  {
    _id: 4,
    text: "Listen to this audio clip!",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "You",
      avatar: "https://placeimg.com/140/140/any",
    },
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Sample audio URL
  },
  {
    _id: 5,
    text: "That's all for now!",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "John Doe",
      avatar: "https://placeimg.com/140/140/people",
    },
  },
];

export default messages