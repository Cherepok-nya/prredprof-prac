import './App.css'
import styled from "@emotion/styled"

const Page = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const App = () => {
    return (
        <Page>
            Hello
        </Page>
    )
}

export default App
