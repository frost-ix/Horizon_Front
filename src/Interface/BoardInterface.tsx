
interface BoardItem {
  _id: string;
  writer: string;
  title: String;
  category: String;
  content: String;
  createAt: Date;
  // updateAt: Date;
  likes: number;
  hits: number;
  commentNum:number;
  boardImageMetadata: string|null;
}

export default BoardItem;