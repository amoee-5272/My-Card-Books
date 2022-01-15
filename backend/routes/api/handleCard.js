import Card from '../../models/Card.js';
const queryCard=async(book_id)=>{
    let result= await Card.find({belong:book_id});
    return result;
}
const createCard = async(cardId,belong,front,back)=>{
    const newCard=new Card({
        cardId:cardId,
        belong:belong,
        front:front,
        back:back,
        correct:false,
    });
    newCard.save();
    return true;
}
const deleteCard = async(cardId)=>{
    console.log(cardId);
    await Card.deleteOne({cardId:cardId});
}
const deleteManyCard = async(bookId)=>{
    await Card.deleteMany({belong:bookId});
}
const updateCard=async(cardId,front,back)=>{
    await Card.update({cardId:cardId},{front:front,back:back})
}


export  {queryCard,createCard,deleteCard,deleteManyCard,updateCard}