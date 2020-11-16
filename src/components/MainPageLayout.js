import React from 'react'
import Navs from './Navs'
import Title from './Title'


const MainPageLayout = ({children}) => {
    return (
        <div>
            <Navs/>
            <Title title="Box office" subtitle="Are you looking for a movie or an a actor"/>
            {children}
        </div>
    )
}
export default MainPageLayout;

