import CartContainer from './components/CartContainer'
import NavBar from './components/NavBar';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {calculateTotals, getCartItems} from './features/cart/cartSlice'
import { RootState, AddDispatch } from './store';
import { useEffect } from 'react';
import Modal from './components/Modal';
import {url} from './features/cart/cartSlice'


function App() {
  const {cartItems, isLoading, error } = useSelector((store: RootState) => store.cart);
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const dispatch = useDispatch<AddDispatch>();
  

      useEffect(() => {
        dispatch(calculateTotals())

      },[cartItems, dispatch]);

      useEffect(() => {
          dispatch(getCartItems(url))
      }, [dispatch] );

      if (isLoading === 'pending') {
           return <div className='loading'>
               <h1>Loading...</h1>
           </div>

      };

      if(isLoading === 'rejected') {
          return <div>
            <h1>{error}</h1>
          </div>
      };
      
  return (
    <main>
       {isOpen && 
         <Modal/>
       }
      <NavBar/>
      <CartContainer/>
    </main>
  );
}

export default App;
