import { Modal, Form, Input, Button, message } from 'antd'
import api from '../../api/api.js'
import { useAuth } from '../../hooks/auth/hook.js'

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
    const [form] = Form.useForm()
    const { reload } = useAuth()

    const handleSubmit = async (values) => {
        const res = await api.post('/users/register/', {
            username: values.username,
            password: values.password,
        })
        if (res && (res.status === 200 || res.status === 201)) {
            message.success('Регистрация прошла успешно!')
            await reload()
            form.resetFields()
            onClose()
        }
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    return (
        <Modal
            title="Регистрация"
            open={open}
            onCancel={handleCancel}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ marginTop: 16 }}
            >
                <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин' }]}>
                    <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    Уже есть аккаунт?{' '}
                    <Button type="link" onClick={onSwitchToLogin} style={{ padding: 0 }}>
                        Войти
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default RegisterModal

