import { useState } from "react"
import { Button, Col, Form, Row } from "reactstrap"
import InputForm from "../components/inputForm"
import axiosApi from "../services/axiosInstance"
import { ILogin } from "../types"
import SignUp from "./SignUp"

const SignIn = ({ setIsAuthenticated }: any) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isOpen, setIsOpen] = useState(false)

    const onChange = (e: any) => {
        const { type, name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const resetForm = () => (
        setFormData({
            email: '',
            password: ''
        })
    )

    const onSubmit = async () => {
        try {
            const { data }: any = await axiosApi.post('/sing-in', formData)
            const { expire_in, token }: ILogin = data
            localStorage.setItem('token', token)
            localStorage.setItem('expire_in', `${expire_in}`)
            setIsAuthenticated(true)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form>
            <Row noGutters className='content'>
                <SignUp isOpen={isOpen} setIsOpen={setIsOpen} />
                <InputForm
                    label='Email'
                    name='email'
                    type='email'
                    onChange={onChange}
                    value={formData.email}
                />
                <InputForm
                    label='Password'
                    name='password'
                    type='password'
                    onChange={onChange}
                    value={formData.password}
                />
                <Col style={{ display: 'flex', alignItems: 'end', marginBottom: '5px' }}>
                    <Button className='mx-1' onClick={onSubmit} >Login</Button>
                    <Button className='mx-1' onClick={resetForm}>Limpar</Button>
                    <Button className='mx-1' onClick={() => setIsOpen(true)}>Novo Usuario</Button>
                </Col>
            </Row>
        </Form >
    )
}

export default SignIn