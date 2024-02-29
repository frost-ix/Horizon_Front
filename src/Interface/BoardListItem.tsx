interface BoardListItem {
    _id: string;
    writer: string;
    content:string;
    title: String;
    createAt: Date;
    likes: number;
    hits: number;
  }
  
  export default BoardListItem;