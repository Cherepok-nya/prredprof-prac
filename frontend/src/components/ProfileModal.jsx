import { Modal, Descriptions, Tag, Button } from 'antd'
import { useAuth } from '../../hooks/auth/hook.js'
import api from '../../api/api.js'

const ProfileModal = ({ open, onClose }) => {
    const { user, reload } = useAuth()

    const handleLogout = async () => {
        await api.post('/users/logout')
        await reload()
        onClose()
    }

    if (!user) return null

    return (
        <Modal title="Профиль" open={open} onCancel={onClose} footer={null} centered>
            <Descriptions column={1} bordered style={{ marginTop: 16 }}>
                <Descriptions.Item label="Имя">{user.firstName}</Descriptions.Item>
                <Descriptions.Item label="Фамилия">{user.lastName}</Descriptions.Item>
                <Descriptions.Item label="Логин">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Роль">
                    <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
                        {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
            <Button danger block style={{ marginTop: 16 }} onClick={handleLogout}>
                Выйти
            </Button>
        </Modal>
    )
}

export default ProfileModal
