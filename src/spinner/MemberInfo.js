
import { snapshot, useSnapshot } from 'valtio';
import { useState, useEffect } from 'react';
import { state, actions } from '../store/store';
import { useNavigate } from 'react-router-dom';
const MemberInfo=()=>{
    let navigate = useNavigate();
    const snap = useSnapshot(state);
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6"> 
                    <div class="card mt-3">
                            <div class="card-header">
                                Members
                            </div>
                            <div class="card-body">


                                <table class="table caption-top">
                                    <caption>List of users</caption>
                                    <thead>
                                        <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Mobile No</th>
                                        <th scope="col">Gpay No</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        {snap.list.map((member, id)=>{
                                            return(
                                                <tr>
                                                    <th scope="row">{member.id}</th>
                                                    <td> {member.name} </td>
                                                    <td>{member.mobileNo}</td>
                                                    <td>{member.gpayNo}</td>
                                                </tr> 
                                            )
                                        })}  
                                    </tbody>
                                </table>
                            </div>
                    </div>  
                    <div className="text-center mt-3">
                    <button className="btn btn-primary " onClick={()=>{navigate("/spinner");}}>Proceed</button>
                    </div>
                </div>
                <div className="col-md-12">


                </div>
            </div>
        </div>
    )
}

export default MemberInfo;