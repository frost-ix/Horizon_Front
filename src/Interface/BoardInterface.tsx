interface BoardItem {
  _id: string;
  writer: string;
  title: string;
  category: string;
  content: string;
  createAt: Date;
  // updateAt: Date;
  likes: number;
  hits: number;
  commentNum:number;
  imageUrl: string|null;
  isMe:boolean;
}

export default BoardItem;