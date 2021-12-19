import React from 'react';

import { OPEN_DRAWER, CLOSE_DRAWER, OPEN_FORM_EDIT_PROJECT, SET_SUBMIT_EDIT_PROJECT, OPEN_FORM_CREATE_TASK, SET_SUBMIT_CREATE_TASK } from './../../../constants/Cyberbugs/DrawConst/DrawConst';

const initialState = {
    visible: false,
    title: 'Default Title',
    ComponentContentDrawer: <p>Default DrawerContent</p>,
    callBackSubmit: (propValues) => {
        alert("Click demo");
    }
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {

    case OPEN_DRAWER: {

        return { ...state, visible: true};
    }
    case CLOSE_DRAWER: {

        return { ...state, visible: false};
    }

    case OPEN_FORM_EDIT_PROJECT: {
        // console.log("vào case OPEN_FORM_EDIT_PROJECT")
        return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title,};
    }


    case SET_SUBMIT_EDIT_PROJECT: {
        // console.log("vào case SET_SUBMIT_EDIT_PROJECT")
        return { ...state, callBackSubmit: action.submitFunction};

    }

    case OPEN_FORM_CREATE_TASK: {
        return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title,};
    }


    case SET_SUBMIT_CREATE_TASK: {
        return { ...state, callBackSubmit: action.submitFunction};
    }

    default:
        return state
    }
}
