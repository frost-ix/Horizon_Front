interface UpdateBoardItem {
    _id: string;
    title: string;
    category: string;
    content: string;
    imageName: string|null;
    isAnonymous: boolean;
  }
  
  export default UpdateBoardItem;