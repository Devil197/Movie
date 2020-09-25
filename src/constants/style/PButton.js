import React from 'react'
import styled from 'styled-components'

import {useTheme} from 'react-native-paper';


const theme = useTheme();
export default MyTouchableOpacity = ({...props}) =>{
return <MyTouchableOpacity {...props}>{props.children}</MyTouchableOpacity>
}

const MyTouchableOpacity = styled.button`
${({ row, col }) => {
    switch (true) {
        case row:
            return `flex-direction:row`;

            case col:
                return `flex-direction:column`;
      
    }

}} 
${({ s, m, l }) => {
    switch (true) {
        case s:
            return `alignItems: flex-start`;
        case m:
            return `alignItems: center`;
        case l:
            return `alignItems: flex-end`;
        default:
            return `alignItems: center`;
    }

}}
${({ ss, mm, ll }) => {
    switch (true) {
        case ss:
            return `justifyContent: flex-start`;
        case mm:
            return `justifyContent: center`;
        case ll:
            return `justifyContent: flex-end`;
        default:
            return `justifyContent: center`;
    }

}}

${({y , n})=>{
    switch(true){
        case y: 
            return `background:${theme.colors.primary}`
        case n:
            return `background:${theme.colors.background}`
    }
}}

`