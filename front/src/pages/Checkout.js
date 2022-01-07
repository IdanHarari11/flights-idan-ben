import React from 'react';
import { useHistory } from 'react-router-dom';
import { getItemFromLocalStorage } from '../helpers/localStorageFunc';
import './Checkout.scss';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Checkout = () => {
    const history = useHistory();
    const flight = getItemFromLocalStorage("purchase");

    let price = flight.price;
    const nights = flight.nights;
    const name = flight.name;
    const image = flight.pictures.main;
    price *= nights;

    const onPurchase = (e) => {
        e.preventDefault();
        history.replace('/purchase');
    }

    return (
      <div id="page">
        <div id="main">
          <div className="product-container">
            <h3 style={{ color: "white", textAlign: "center" }}>
              {/* Beats<sup>x</sup> */}
              {name}
            </h3>
            <img src={image} alt="" />
          </div>
          <div className="card">
            <div className="chip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 230 384.4 300.4"
                width="38"
                height="70"
              >
                <path
                  d="M377.2 266.8c0 27.2-22.4 49.6-49.6 49.6H56.4c-27.2 0-49.6-22.4-49.6-49.6V107.6C6.8 80.4 29.2 58 56.4 58H328c27.2 0 49.6 22.4 49.6 49.6v159.2h-.4z"
                  data-original="#FFD66E"
                  data-old_color="#00FF0C"
                  fill="rgb(237,237,237)"
                />
                <path
                  d="M327.6 51.2H56.4C25.2 51.2 0 76.8 0 107.6v158.8c0 31.2 25.2 56.8 56.4 56.8H328c31.2 0 56.4-25.2 56.4-56.4V107.6c-.4-30.8-25.6-56.4-56.8-56.4zm-104 86.8c.4 1.2.4 2 .8 2.4 0 0 0 .4.4.4.4.8.8 1.2 1.6 1.6 14 10.8 22.4 27.2 22.4 44.8s-8 34-22.4 44.8l-.4.4-1.2 1.2c0 .4-.4.4-.4.8-.4.4-.4.8-.8 1.6v74h-62.8v-73.2-.8c0-.8-.4-1.2-.4-1.6 0 0 0-.4-.4-.4-.4-.8-.8-1.2-1.6-1.6-14-10.8-22.4-27.2-22.4-44.8s8-34 22.4-44.8l1.6-1.6s0-.4.4-.4c.4-.4.4-1.2.4-1.6V64.8h62.8v72.4c-.4 0 0 .4 0 .8zm147.2 77.6H255.6c4-8.8 6-18.4 6-28.4 0-9.6-2-18.8-5.6-27.2h114.4v55.6h.4zM13.2 160H128c-3.6 8.4-5.6 17.6-5.6 27.2 0 10 2 19.6 6 28.4H13.2V160zm43.2-95.2h90.8V134c-4.4 4-8.4 8-12 12.8h-122V108c0-24 19.2-43.2 43.2-43.2zm-43.2 202v-37.6H136c3.2 4 6.8 8 10.8 11.6V310H56.4c-24-.4-43.2-19.6-43.2-43.2zm314.4 42.8h-90.8v-69.2c4-3.6 7.6-7.2 10.8-11.6h122.8v37.6c.4 24-18.8 43.2-42.8 43.2zm43.2-162.8h-122c-3.2-4.8-7.2-8.8-12-12.8V64.8h90.8c23.6 0 42.8 19.2 42.8 42.8v39.2h.4z"
                  data-original="#005F75"
                  className="active-path"
                  data-old_color="#005F75"
                  fill="rgba(0,0,0,.4)"
                />
              </svg>
            </div>
            <form onSubmit={(e) => onPurchase(e)}>
              <label htmlFor="number">
                Card Number
                <input
                  type="text"
                  id="number"
                  placeholder="0000 - 0000 - 0000 - 0000"
                  required
                />
              </label>
              <label htmlFor="name">
                Name
                <input type="text" id="name" placeholder="Jhon Doe" required />
              </label>
              <label htmlFor="date">
                Valid Thru
                <input type="text" id="date" placeholder="00/00" required />
              </label>
              <label htmlFor="cvc">
                cvc
                <input type="text" id="cvc" placeholder="000" required />
              </label>
              <button>
                Purchase
                <ArrowForwardIosIcon className="fa-angle-right" />
                {/* <i className="fa fa-angle-right"></i> */}
              </button>
              {/* <label htmlFor="remember">Save my information for later */}
              {/* <input type="checkbox" checked="checked" id="remember" /> */}
              {/* </label> */}
            </form>
          </div>
          <div className="price-container">
            <strong>{price} $ </strong>
            {/* <small>Inc. shipping & tax</small> */}
          </div>
        </div>
      </div>
    );
}

export default Checkout;
