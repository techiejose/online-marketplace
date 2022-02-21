import React, { Component } from 'react'
import menu from '../svg/bars-solid.svg'
import {Link} from 'react-router-dom'
import close from '../svg/times-solid.svg'
import cartImg from '../svg/cart-plus-solid.svg'
import searchIcon from '../svg/search-solid.svg'
import './Header.css'
import { DataContext } from '../Context';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router-dom";

export class Header1 extends Component {
    static contextType=DataContext;
    state={
        toggle:false,
        search:''
    }
    menuToggle=()=>{
        this.setState({toggle:!this.state.toggle});
        console.log(this.state.toggle);
    }
    searchName=(e)=>{
        e.preventDefault();
        if(this.state.search.trim().length>0){
        const {setSearchName,setSearch}=this.context;
        setSearchName(this.state.search);
        setSearch();
        console.log('hello world');
        this.props.history.push("/") ;
     
        }
    }
changeSearch=(e)=>{
    this.setState({search:e.target.value});
}
    render() {
        const tongle=this.state;
        const {cart,items}=this.context;
        return (
            <header>
                
                <div className='logo'>
               <Link to='/'> <h1>CAKESOKO</h1></Link>
                </div>
                <nav>
                <form class="example" >
  <input type="text" placeholder="What are you looking for.." name="search"value={this.state.search} onChange={this.changeSearch}/>
 <div onClick={this.searchName}> <button type="button" className='iconcolor'><img  src={searchIcon}  width='15'/></button></div>
</form>
                    <div className='nav-cart'>
                    <span>{items}</span>
                    <Link to='/cart'>
                    <img src={cartImg} width='20'/>
                    </Link>
                    </div>
                </nav>
            </header>
        )
    }
}

export default withRouter (Header1)
