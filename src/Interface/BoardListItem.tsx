interface BoardListItem {
    _id: string;
    writer: string;
    content:string;
    title: String;
    createAt: Date;
    commentNum:number;
    likes: number;
    hits: number;
  }
  
  export default BoardListItem;