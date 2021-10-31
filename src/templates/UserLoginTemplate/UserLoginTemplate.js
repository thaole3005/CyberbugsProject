
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { Button, Layout  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;



export default function UserLoginTemplate(props) {
    //? c1:
    // const [size, setSize] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // })

    //? c2: bóc tách phần tử
    const [{width, height}, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })


    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
    }, [])



    let {Component, ...resRoute} = props;
    return (
        <Route {...resRoute} render = {(propsRoute) => {
            return <>
            <Layout>
                <Sider width = {width/2} style = {{height: height, backgroundImage: `url("https://picsum.photos/${Math.round(width/2)}/${Math.round(height)}")`, backgroundSize: 'cover',}}></Sider>
                <Layout>
                    <Content>
                        {/* Component đc truyền vào sẽ đc thừa hưởng các props propsRoute( của thẻ Route)  */}
                        <Component {...propsRoute}/>
                    </Content>
                </Layout>
            </Layout>    
            </>
        }}>
        </Route>
    )
}
