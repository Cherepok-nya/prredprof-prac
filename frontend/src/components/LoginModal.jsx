import { Modal, Form, Input, Button, message } from 'antd'
import { useAuth } from '../../hooks/auth/hook.js'
import api from '../../api/api.js'

const LoginModal = ({ open, onClose }) => {
    const [form] = Form.useForm()
    const { reload } = useAuth()

    const handleSubmit = async (values) => {
        const res = await api.post('/users/login', values)
        if (res?.data) {
            message.success('Вы вошли!')
            await reload()
            form.resetFields()
            onClose()
        }
    }

    return (
        <Modal title="Вход" open={open} onCancel={() => { form.resetFields(); onClose() }} footer={null} centered>
            <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
                <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин' }]}>
                    <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>Войти</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LoginModal
