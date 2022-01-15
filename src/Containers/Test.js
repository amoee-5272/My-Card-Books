
import React, { useState ,useEffect} from "react";
import ReactCardFlip from "react-card-flip";
import {Card,Button,Progress,Result} from 'antd';
import {SmileOutlined,LoadingOutlined,CheckOutlined,CloseOutlined} from '@ant-design/icons';
import instance from '../instance';

const CardFlip = (props) => {
  const {the_card, isFlipped} =props;

  const contentStyle = {
    height: "380px",
    color: "#fff",
    lineHeight: '380px',
    textAlign: "center",
    fontSize: "75px",
    padding: 0,
    margin: 0,
    background: "#545b62",
  };

  return (
    <>
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card
        style={{margin: 0, padding:0, width: "80%", minWidth: 700, margin: "auto"}}
        hoverable={true}
      >
        {the_card.front=="default1"?<LoadingOutlined/>:<h1 style ={contentStyle}>{the_card.front}</h1>}
      </Card>

      <Card
        bordered={false} 
        hoverable={true}
        style={{margin: 0, padding:0, width: "80%", minWidth: 700, margin: "auto"}}
      >
        <h1 style ={contentStyle}>{the_card.back}</h1>
      </Card>
    </ReactCardFlip>
    </>
  );
};
function Exam(props){
  const {bookId} =props;
  //{front:"a1",back:"a2"}
  const [cards, setCards] =useState([{front:"default1",back:"default2"}]);
  const [length,setLength]=useState(1);
  const [currentCard, setCurrentCard]=useState(cards[0]);
  const [isFlip, setIsFlip] = useState(false);
  const [endGame,setEndGame]=useState(false);

  const buttonStyle =
  {
    width: "48%",
    margin: 0,
    height: 60,
    fontSize: 26,
  };

  const getCard = async(bookId) => {
    console.log(bookId);
    const {
      data: {message, data},
    } = await instance.get('/api/allCards', {params: {id: bookId},
    });
    setCards(data);
    setLength(data.length);
  };

  useEffect(()=>{setCurrentCard(cards[0]);console.log(cards)},[cards]);

  useEffect(async ()=>
  {
    console.log("a");
    await getCard(bookId);
    //setCurrentCard(cards[0]);
    console.log("cards 3 "+cards);
    console.log(cards.length);
  }
  ,[]);

  const handleClick = () => {
    setIsFlip(!isFlip);
  };

  const handleCorrect =() =>
  {
    //最前面刪掉
    // currentCard 更新
    // flip turn to false
    let newCards =cards;
    newCards =newCards.slice(1);

    let newCurrentCard =newCards[0];

    setCards(newCards);
    setCurrentCard(newCurrentCard);
    setIsFlip(false);

    if(newCards.length === 0)
      setEndGame(true);
  };

  const handleFailed =() =>
  {
    // 把第一項cards[0]搬到最後面
    let newCards =cards;
    newCards =[...newCards.slice(1), newCards[0]];
    
    setCards(newCards);
    setCurrentCard(newCards[0]);
    setIsFlip(false);
  };

  return(
    <div style ={{margin: "50px auto 20px auto", width: "80%"}}>
    {endGame?
    <>
    <Result
    icon={<SmileOutlined style ={{fontSize: 200}}/>}
    title={<span style ={{fontSize: 42}}>Congratulation, you have finished this Card Book!</span>}
  />
    <Progress percent={100-cards.length/length*100} showInfo={false} />
    </>
    :
    <>
    <div onClick={handleClick}>
      <CardFlip  the_card={currentCard} isFlipped={isFlip}/>
    </div>

    
      <div>
        <div style ={{margin: "20px auto 20px auto", width: "100%", minWidth: 700, display: "flex", justifyContent: "space-evenly"}}>
          <Button type="text" style ={buttonStyle} onClick={handleFailed}>
            <span style ={{color: "#ff0000"}}><CloseOutlined />Uncertain.</span>
          </Button>

          <Button type="text" style ={buttonStyle} onClick={handleCorrect}>
            <span style ={{color: "#52C41A"}}><CheckOutlined />Got it!</span>
          </Button>
        </div>

        <Progress percent={100-cards.length/length*100} showInfo={false} />
      </div>
    </>
    }
    
    </div>)
}

export default Exam;

//Exam bookId="cf6d34a6-dd5c-4b65-8acf-f11cf70657e5"