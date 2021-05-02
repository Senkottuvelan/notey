import React from "react";
import Card from "@material-ui/core/Card"
import { Button } from "@material-ui/core";

export default function Notes(props){
    const {notes}=props;
    if(!notes||notes.length===0){
        return(<p className="mt-5">You havent created any note</p>);
    }
    else{
        return(
            <>
            <div className="container">
                Your Notes
            </div>
            <div className="container mt-4">
                <div className="card-columns">
                    {
                        notes.map((note)=>{
                            return(
                                <Card key={note.id} className="card p-3 text-center">
                                    <h6 className="m-0">{note.note}</h6>
                                    <p></p>
                                <Button size="small" variant="outlined" color="secondary">Send to  Email Id</Button>
                                <Button size="small" variant="outlined" color="secondary">Send to Mobile No</Button>
                                </Card> 
                            );
                        })
                    }
                </div>
            </div>
            </>
        );
    }
}