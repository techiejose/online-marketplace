import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Section.css'
import Detail from './Detail'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { DataContext } from '../Context';
import CategoryPosts from './CategoryPosts';
import { FormCheck } from 'react-bootstrap';

export class Section extends Component {
   
    state = {
        detail : [],
        search:false,
        height:true,
        nodata:false,
        result:'',
        test:''
    }
    static contextType=DataContext;

    componentDidMount() {

        let data ;
  
        axios.get("/api/product/")
        .then(res => {
            data = res.data;
            this.setState({
                detail : data  
                 
            });
        })
        .catch(err => {})
        

    }
    componentDidUpdate(prevProps, prevState){
//check if search has results
if (prevState.detail !== this.state.detail) {
const {searchName,search}=this.context;
const {detail}= this.state;

if(search){
const result=this.state.detail.filter(detail => detail.name.toUpperCase().includes(searchName.toUpperCase()))
    if(result.length==0){
        this.setState({
            nodata :true,
            result:result
             
        });
       
    }else{
        this.setState({
            nodata :false,
            result:result
             
        });
    }
   

    
    }}}
    check=(check)=>{
if(check){
    this.setState({height:false})
}
    }
    render() {
        const {search,searchName}=this.context;
        console.log(search)
        console.log(this.state.nodata);
        console.log(this.state.result);
        if(!search){
        return (
            
            <div className='grid-container'>
                <div className='grid-child category' >
                    <CategoryPosts/>
                
                </div>
               
                <div className='product grid-child'>
               
                {this.state.detail.map((detail, id) =>  (
            <div key={id} className='parentborder' >
                <div className=" grid-item ">
                <img src={detail.photo1} height="200"width="250"></img>
                </div>
                <div className="p-3">
                {detail.name  && <Link to={`/product/${detail.id}-${detail.name.replace(/\s+/g, '-')}`} className=" removeunderline placecenter"><h4 >{detail.name}</h4></Link> }
                <p className='placecenter pricecolor'>Ksh {detail.price}.00</p>
               <button className='centerbutton'onClick={()=>this.context.addTocart(detail.id)}>Add to Cart</button>
            </div>
            </div>
            )
        )}

                </div>
            </div>
        )}if(search){
            if(this.state.nodata){
                return(
                    <div className='grid-container'  >
                    <div className='grid-child category'>
                    <CategoryPosts/>
                    </div>
                    <div className='product grid-child' >
                
           <h4>Your search didnt return any results</h4>
    
                    </div>
                </div>
                )
            }
            return (
            
                <div className='grid-container'  >
                    <div className='grid-child category'>
                    <CategoryPosts/>
                    </div>
                    <div className='product grid-child'ref={ (divElement) => { this.divElement = divElement } } >
                        
                    {this.state.detail.filter(detail => detail.name.toUpperCase().includes(searchName.toUpperCase())).map(detail => (
                
                <div className='parentborder' >
                    <div className=" grid-item ">
                    
                    <img src={detail.photo1} height="200"width="250"></img>
                    </div>
                    <div className="p-3" >
                    <Link to={`/product/${detail.id}-${detail.name.replace(/\s+/g, '-')}`} className=" removeunderline placecenter"><h4 >{detail.name}</h4></Link> 
                    <p className='placecenter pricecolor'>Ksh {detail.price}.00</p>
                   <button className='centerbutton'onClick={()=>this.context.addTocart(detail.id)}>Add to Cart</button>
               
                </div>
               
                </div>
                
                )
            )}
    
                    </div>
                </div>
            )
            
        }
       
    }
}

export default Section
