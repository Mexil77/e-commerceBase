import "./BagListItems.css";

import BagItem from "./BagItem";

const BagListItems = (props) => {
  return (
    <div id="bagListItems-div">
      <ul id="bagListItems-ul">
        {props.bagList.map((item) => {
          return (
            <BagItem
              key={item.idProduct}
              idProduct={item.idProduct}
              cuantity={item.cuantity}
              addTotalAmount={props.addTotalAmount}
              substractTotalAmount={props.substractTotalAmount}
              modifyCuantity={props.modifyCuantity}
              getUserBag={props.getUserBag}
              updateBagUser={props.updateBagUser}
              fromPaySteps={props.fromPaySteps}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default BagListItems;
