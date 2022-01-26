//import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import './Detail.css';



export default function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id));

    },[dispatch,id])

    const detailDog = useSelector((state) => state.detail)
    console.log(detailDog)


}