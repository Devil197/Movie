import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {

    return <View {...props} >{props.children}</View>

}

const View = styled.View`
    justifyContent: space-between;
    flexDirection: row;
    ${({ m, s, xl, xxl }) => {
        switch (true) {
            case m:
                return ` padding: 10px 20px`;
            case s:
                return ` padding: 20px 20px`;
            case xl:
                return ` padding: 30px 20px`;
            case xxl:
                return ` padding: 40px 20px`;
        }

    }}
    
`
