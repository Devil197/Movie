import {REDUX } from '../store/types'


// <==== add keyword ne` 

const addKeywordActionRedux = (dispatch,keyword)=>{
    dispatch({
        type:REDUX.ADD_KEYWORD,
        payload:keyword
    })
}

// ====>

//<==== update keyword ne`

const updateKeywordRedux = (dispatch,keyword)=>{
    dispatch({
        type:REDUX.UPDATE_KEYWORD_LIST,
        payload:keyword
    })
}
//====>
// mấy cái khác sài tương tự thôi

// api viết dưới này lúc mà search xong á thì cho nó lưu vào redux.
