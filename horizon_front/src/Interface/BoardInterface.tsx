interface BoardItem {
    num: number;
    writer: string;
    title: String;
    category: String;
    content: String;
    dateofCreate: Date;
    likes: number;
    hits: number;
    boardImageMetadata: object;
  }

export default BoardItem;