interface BookListItem {
    _id: string;
    title: string;
    writer: string;
    content: string;
    createAt: Date;
    imageUrl: string;
    hit:number;
    price:number;
  }
  
  export default BookListItem;