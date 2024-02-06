interface BoardListItem {
    _id: string;
    writer: string;
    title: String;
    createAt: Date;
    // updateAt: Date;
    likes: number;
    hits: number;
  }
  
  export default BoardListItem;