import React, { useState, useEffect, useContext } from 'react';
import './Food.css'
import FoodItem from './FoodItem';
import { UserContext} from '../auth/useAuth'
import { withRouter, useParams } from 'react-router-dom';

const Food = (props) => {
    
    const {cart} = useContext(UserContext)
    const pdId = useParams();
    const [disabled, setDisabled] = useState(true)
    useEffect(()=> {
                if(cart.length >0) {
                    setDisabled(false)
                }
    },[cart])


    const [activeCatagories, setActiveCatagories] = useState(
        {
            lunchActive: true,
            dinnerActive: false,
            breakfastActive: false
        }
    )
    // item select category
    const [selectedItem, setSelectedItem] = useState('lunch')
    //  initials set data 
    const [items, setItems] = useState([])


    useEffect(() => {        
        fetch('https://murmuring-island-63468.herokuapp.com/products/')
        .then(res => res.json())
        .then(data => {
            setItems(data)
        })
    }, [selectedItem])

    const foodItems = items.filter(item => item.catagories === selectedItem)
    console.log(foodItems);

    // conditionally set data when click catagories
    const selectHandler = item => {
        if (item === 'breakfast') {
            let previousState = activeCatagories;
            previousState.breakfastActive = true
            previousState.lunchActive = false
            previousState.dinnerActive = false
            setActiveCatagories(previousState)
        } else if (item === 'dinner') {
            let previousState = activeCatagories;
            previousState.breakfastActive = false
            previousState.lunchActive = false
            previousState.dinnerActive = true
            setActiveCatagories(previousState)
        } else if (item === 'lunch') {
            let previousState = activeCatagories;
            previousState.breakfastActive = false
            previousState.lunchActive = true
            previousState.dinnerActive = false
            setActiveCatagories(previousState)
        }
        setSelectedItem(item)
    }

    const { lunchActive, dinnerActive, breakfastActive } = activeCatagories;

    return (
        <section className="food-catagories-aria">
            <div className="container">
                <div className="row">
                    <div className="catagories m-auto py-5">
                        <ul className="d-flex ">
                            <li><button className={breakfastActive ? 'active btn' : 'btn'}
                                onClick={() => selectHandler('breakfast')}
                            >Breakfast</button></li>
                            <li><button className={lunchActive ? 'active btn' : 'btn'}
                                onClick={() => selectHandler('lunch')}
                            >Lunch</button></li>
                            <li><button className={dinnerActive ? 'active btn' : 'btn'}
                                onClick={() => selectHandler('dinner')}
                            >Dinner</button></li>
                        </ul>
                       
                    </div>
                    <div className="f-right d-flex align-items-center text-danger">
                    <p className="see-all" onClick={()=> props.history.push('/foods')} >See All</p>
                    </div>
                </div>
                <div className="row food-items">
                    {
                        foodItems.map(item => <FoodItem 
                            key={item.key} 
                            item={item} 
                        />)
                    }
                    <div className="w-100"></div>
                    <div className="checkout-btn-aria m-auto">
                        <button 
                            onClick={()=>props.history.push('/cart')}
                            className={disabled ? 'btn disabled my-4 text-center text-capitalize' :'btn checkout-btn  my-4 text-center text-capitalize' } 
                         disabled={disabled} >Checkout your food</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Food);