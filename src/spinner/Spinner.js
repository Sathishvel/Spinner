
import { snapshot, useSnapshot } from 'valtio';
import { useState, useEffect } from 'react';
import { state, actions } from '../store/store';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const Spinner = ()=>{
    let navigate = useNavigate();
    const snap = useSnapshot(state);
    useEffect(() => { 
        componentDidMount();     
      });

      const componentDidMount=()=>{
        // generate canvas wheel on load
        renderWheel(); 
      }

        const renderWheel=()=> {
            // determine number/size of sectors that need to created
            let numOptions = snap.list.length;
            let arcSize = (2 * Math.PI) / numOptions;
            
            state.angle = arcSize;

            // get index of starting position of selector
            topPosition(numOptions, arcSize);

            // dynamically generate sectors from state list
            let angle = 0;
            for (let i = 0; i < numOptions; i++) {
            let text = state.list[i].name;
            renderSector(i + 1, text, angle, arcSize, getColor());
            angle += arcSize;
            }
        }

        
            const topPosition = (num, angle) => {
                // set starting index and angle offset based on list length
                // works upto 9 options
                let topSpot = null;
                let degreesOff = null;
                if (num === 9) {
                topSpot = 7;
                degreesOff = Math.PI / 2 - angle * 2;
                } else if (num === 8) {
                topSpot = 6;
                degreesOff = 0;
                } else if (num <= 7 && num > 4) {
                topSpot = num - 1;
                degreesOff = Math.PI / 2 - angle;
                } else if (num === 4) {
                topSpot = num - 1;
                degreesOff = 0;
                } else if (num <= 3) {
                topSpot = num;
                degreesOff = Math.PI / 2;
                }
                
                state.top = topSpot - 1;
                state.offset= degreesOff;
            }



            const renderSector=(index, text, start, arc, color)=> {
                // create canvas arc for each list element
                let canvas = document.getElementById("wheel");
                let ctx = canvas.getContext("2d");
                let x = canvas.width / 2;
                let y = canvas.height / 2;
                let radius = state.radius;
                let startAngle = start;
                let endAngle = start + arc;
                let angle = index * arc;
                let baseSize = radius * 3.33;
                let textRadius = baseSize - 150;

                ctx.beginPath();
                ctx.arc(x, y, radius, startAngle, endAngle, false);
                ctx.lineWidth = radius * 2;
                ctx.strokeStyle = color;

                ctx.font = "17px Arial";
                ctx.fillStyle = "black";
                ctx.stroke();

                ctx.save();
                ctx.translate(
                baseSize + Math.cos(angle - arc / 2) * textRadius,
                baseSize + Math.sin(angle - arc / 2) * textRadius
                );
                ctx.rotate(angle - arc / 2 + Math.PI / 2);
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            const   getColor=()=>{
                // randomly generate rbg values for wheel sectors
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);
                return `rgba(${r},${g},${b},0.4)`;
            }




            const spin = () => {
                // set random spin degree and ease out time
                // set state variables to initiate animation
            
                // alert( " Rotate " + state.rotate + " " +  state.easeOut + " " + state.spinning);  
                let randomSpin = Math.floor(Math.random() * 900) + 500;
                
                // dispatch({type:'SPIN',payload:randomSpin})
                  state.rotate =  randomSpin;
                  state.easeOut = 2;
                  state.spinning= true;
                
            // alert("randomSpin " + randomSpin + " Rotate " + state.rotate + " " +  state.easeOut + " " + state.spinning);  
                // calcalute result after wheel stops spinning
                setTimeout(async() => {
                  await getResult(randomSpin);
                  
                }, 2000);
 
               


              };
            
              const getResult = async(spin) => {
                
                // find net rotation and add to offset angle
                // repeat substraction of inner angle amount from total distance traversed
                // use count as an index to find value of result from state list
                // const { angle, top, offset, list } = state;
                let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
                let travel = netRotation + state.offset;
                let count = state.top + 1;
            
                // alert("netRotation " + netRotation + "trave" + travel + "Count" + count);  
                while (travel > 0) {
                  travel = travel - state.angle;
                  count--;
                }
                let result;
                if (count >= 0) {
                  result = count;
                } else { 
                    result = state.list.length + count; 
                  }   
             
                // set state variable to display result 
                  state.net= netRotation;
                  state.result= result;
                  
                  Swal.fire({ 
                    title: "Congratulations " + state.list[result].name, 
                    showConfirmButton: false,
                    timer: 5000
                });
                // state.list.splice(result, 1);    
                
              };
            
              const reset = () => {
                // alert(this.state.list[this.state.result]);
                // this.state.list.splice(this.state.result, 1);
                // alert(JSON.stringify(this.state.list))
                // this.state.list.pop(this.state.list[this.state.result]);   
                // reset wheel and result 
                // alert();    
                  state.rotate= 0;
                  state.easeOut= 0;
                  state.result= null;
                  state.spinning= false;
                  

                  const indexOfObject = state.list.findIndex(object => {
                    return object.id === snap.result ;
                  });

                  alert(indexOfObject);
                  state.list.splice(indexOfObject, 1);  
                  navigate("/");
              };



    return(
        <div className='container-fluid'>

            <div className="row">

                <div className="col-md-3 d-none">




                <div class="card mt-3">
                    <div class="card-header">
                        Members
                    </div>
                    <div class="card-body">
                        <ol class="list-group list-group-numbered">
                            {state.list.map((member)=>{
                                return(
                                    <li class="list-group-item">{member.name}</li>   
                                )
                            })} 
                        </ol>
                    </div>
                </div>  
 
                                {/* {state.spinning ? ( 
                                            <div class="alert alert-primary mt-2 d-none" role="alert">
                                            {state.month[new Date().getMonth()]} winner is  <b>{state.list[snap.result].name}</b>
                                            </div>  
                                ):("")} */}
 



                </div>

                <div className="col-md-12">

                        <div className="container-fluid"> 
                            <div className="row spinner-row">
                                <div className="col-md-12 text-center spinner-selector"> 
                                <span id="selector">&#9660;</span>
                                </div>

                                <div className="col-md-12 text-center spinner-block"> 
                                <canvas
                                        id="wheel"
                                        width="500"
                                        height="500"
                                        style={{
                                        WebkitTransform: `rotate(${snap.rotate}deg)`,
                                        WebkitTransition: `-webkit-transform ${
                                            state.easeOut
                                        }s ease-out`
                                        }}
                                    />                    
                                </div>
                                <div className='col-md-12  text-center actionblock'> 
                                        {state.spinning ? (
                                            <button className="btn btn-primary" type="button" id="reset" onClick={()=>reset()}>
                                            Reset
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" type="button" id="spin" onClick={spin}>
                                            Spin
                                            </button>
                                        )}

                                </div>
                                

                            </div>      
                        </div>

                        
                </div>

            </div>

        </div>
    )
}


export default Spinner;