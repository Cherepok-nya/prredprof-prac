import './App.css'
import styled from "@emotion/styled"
import Header from "./Header"

const Page = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const App = () => {
    return (
        <Page>
            <Header></Header>
        </Page>
    )
}

export default App
