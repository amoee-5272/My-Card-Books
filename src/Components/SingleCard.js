import { Card, Typography } from "antd";
import { DeleteOutlined, PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const {Paragraph} =Typography;

function SingleCards(props) {
  const { cardInfo, type, onClick, updateFunc, deleteFunc } = props;

  const [title, setTitle] =useState(cardInfo ? cardInfo.front : "");
  const [description, setDescription] =useState(cardInfo ? cardInfo.back : "");

  const cardStyle = {
    width: 240,
    margin: 4,
    minWidth: 240,
    display: "inline-block",
  };
  const cardCreatorStyle = {
    width: 240,
    margin: 10,
    backgroundColor: "rgb(240, 242,245)",
    minWidth: 240,
    display: "inline-block",
  };

  const handleTitleEdit =(value) =>
  {
    setTitle(value);
    console.log(11111);
    updateFunc(cardInfo.cardId, value, description);
  }

  const handleDescriptionEdit =(value) =>
  {
    setDescription(value)
    updateFunc(cardInfo.cardId, title, value);
  }

  if (type === "card-creater")
    return (
      <Card
        className="card"
        bordered={false}
        style={cardCreatorStyle}
        onClick={onClick}
      >
        <div style={{ textAlign: "center" }}>
          <PlusCircleOutlined style={{ margin: "auto", fontSize: 50 }} />
        </div>
      </Card>
    );

  return (
    <Card
      className="card"
      hoverable
      style={cardStyle}
      title={<Paragraph
                editable={{onChange: handleTitleEdit, triggerType: ["text"]}}
                style ={{display: "flex", justifyContent: "space-between", fontSize: "24px"}}>
          {cardInfo.front}
        </Paragraph>}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Paragraph
                editable={{onChange: handleDescriptionEdit, triggerType: ["text"]}}
                style ={{display: "flex", justifyContent: "space-between"}}>
          {cardInfo.back}
        </Paragraph>
        <DeleteOutlined
          style={{ fontSize: 20 , marginTop: 10}}
          onClick={() => deleteFunc()}
        />
      </div>
    </Card>
  );
}

export default SingleCards;