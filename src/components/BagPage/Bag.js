import "./Bag.css";

import BagListItems from "./BagListItems";

const Bag = (props) => {
  return (
    <div id="bag-div">
      <h1>Bag</h1>
      <BagListItems
        bagList={props.bagList}
        addTotalAmount={props.addTotalAmount}
        substractTotalAmount={props.substractTotalAmount}
        modifyCuantity={props.modifyCuantity}
        getUserBag={props.getUserBag}
        updateBagUser={props.updateBagUser}
        fromPaySteps={props.fromPaySteps}
      />
    </div>
  );
};

export default Bag;
