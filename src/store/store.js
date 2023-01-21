
import { proxy, useSnapshot } from 'valtio';
import axios from "axios";
export const state = proxy(
    {
        apiUrl:"http://localhost:8080",
        month:["January","February","March","April","May","June","July","August","September","October","November","December"],
        
        list: [
            // {"name":"Sathish",
            // "mobileNo":9486692825,
            // "gpayNo":9486692825},
            // {"name":"Rani",
            // "mobileNo":8888855555,
            // "gpayNo":8888866666},
            // {"name":"Jeni",
            // "mobileNo":999991111,
            // "gpayNo":888881111},
            // {"name":"Ben",
            // "mobileNo":777771111,
            // "gpayNo":777881111},
            // {"name":"Jeff",
            // "mobileNo":666991111,
            // "gpayNo":888666111}, 
            // {"name":"Surya",
            // "mobileNo":5555592825,
            // "gpayNo":9486655555},
            // {"name":"Harish",
            // "mobileNo":6688855555,
            // "gpayNo":9988866666},
            // {"name":"John",
            // "mobileNo":557771111,
            // "gpayNo":557881111},
            // {"name":"Vijay",
            // "mobileNo":5050505050,
            // "gpayNo":9595959595}, 
            ],
        radius: 75, // PIXELS
        rotate: 0, // DEGREES
        easeOut: 0, // SECONDS
        angle: 0, // RADIANS
        top: null, // INDEX
        offset: null, // RADIANS
        net: null, // RADIANS
        result: null, // INDEX
        spinning: false

    });
export const actions = {

    auth(){
        console.log("auth");
        axios.get(state.apiUrl + "/getUsers").then(res=>{
            state.list = res.data;
        }).catch(err=>{
            console.log(err)
        })
    },
    addContact(){
        var Obj = {
            name:"Velayutham",
            mobileNo:9486692825,
            gpayNo:9360300552
        }
        axios.post(state.apiUrl + "/addContact", Obj).then(res=>{
            alert(res);
        }).catch(err=>{
            alert(err);
        })
    }

}