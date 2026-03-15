import { Modal, Form, Input, Button, message } from 'antd'
import api from '../../api/api.js'

const CreateUserModal = ({ open, onClose }) => {
    const [form] = Form.useForm()

    const handleSubmit = async (values) => {
        const res = await api.post('/users', values)
        if (res?.data) {
            message.success(`Пользователь ${values.firstName} ${values.lastName} создан!`)
            form.resetFields()
            onClose()
        }
    }

    return (
        <Modal title="Создать пользователя" open={open} onCancel={() => { form.resetFields(); onClose() }} footer={null} centered>
            <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
                <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
                    <Input placeholder="Имя" />
                </Form.Item>
                <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
                    <Input placeholder="Фамилия" />
                </Form.Item>
                <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин' }]}>
                    <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>Создать</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateUserModal
