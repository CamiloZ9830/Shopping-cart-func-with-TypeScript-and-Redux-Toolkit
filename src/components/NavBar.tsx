import {CartIcon} from '../icons';
import { useSelector } from "react-redux";
import { RootState } from "../store";



function NavBar () {
      
     const {amountCart} = useSelector((store: RootState) => store.cart);
           

     
      

      return (
               <nav>
                  <div className="nav-center">
                    <h3>redux toolkit</h3>
                    <div className="nav-container">
                        <CartIcon/>
                        <div className="amount-container">
                            <p className="total-amount">{amountCart}</p>
                        </div>
                    </div>

                  </div>


               </nav>

      );


};


export default NavBar