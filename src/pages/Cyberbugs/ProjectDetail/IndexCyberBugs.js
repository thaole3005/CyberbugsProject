import React from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain';
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from './../../../components/Cyberbugs/Main/InforMain';

export default function IndexCyberBugs() {
    return (
        <div  className="main">
            <h3>Cyber Board</h3>
            <HeaderMain/>
            <InfoMain/>
            <ContentMain/>
        </div>
    )
}
