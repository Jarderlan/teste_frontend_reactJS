import { Row } from "reactstrap"
import CollapseContent from "../../components/collapseContent"

const Home = () => {
    return (
        <Row>
            <CollapseContent
                titulo={'Empresas'}
                btnNovo
                onClickModal={() => (console.log('clicou'))}
            >
                <h1>Abriu</h1>
            </CollapseContent>
        </Row>

    )
}

export default Home