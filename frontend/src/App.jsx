import './App.css'
import { useState } from 'react'
import { Button, Upload, Space, Typography, Tag } from 'antd'
import { UploadOutlined, UserOutlined, BarChartOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuth } from '../hooks/auth/hook.js'
import api from '../api/api.js'
import LoginModal from './components/LoginModal.jsx'
import CreateUserModal from './components/CreateUserModal.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import AnalyticsModal from './components/AnalyticsModal.jsx'

const { Title, Text } = Typography

const App = () => {
    const { user, auth, reload } = useAuth()
    const [loginOpen, setLoginOpen] = useState(false)
    const [createUserOpen, setCreateUserOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [analyticsOpen, setAnalyticsOpen] = useState(false)
    const [testResults, setTestResults] = useState(null)
    const [analyticsData, setAnalyticsData] = useState(null)

    const handleUpload = ({ file }) => {
        const form = new FormData()
        form.append('file', file)
        api.post('/predict', form).then(r => { if (r?.data) setTestResults(r.data) })
        api.get('/analytics').then(r => { if (r?.data) { setAnalyticsData(r.data); setAnalyticsOpen(true) } })
        return false
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <div style={{ background: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8' }}>
                <Title level={4} style={{ margin: 0 }}>Классификатор сигналов</Title>

                {auth && user ? (
                    <Space>
                        <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
                            {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                        </Tag>
                        <Text>{user.firstName} {user.lastName}</Text>
                        <Button icon={<UserOutlined />} onClick={() => setProfileOpen(true)}>Профиль</Button>
                        {user.role === 'admin' && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateUserOpen(true)}>Создать пользователя</Button>
                        )}
                        {user.role === 'user' && (
                            <>
                                <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={false} accept=".npz">
                                    <Button icon={<UploadOutlined />} type="primary">Загрузить данные</Button>
                                </Upload>
                                <Button icon={<BarChartOutlined />} onClick={() => setAnalyticsOpen(true)}>Аналитика</Button>
                            </>
                        )}
                        <Button icon={<LogoutOutlined />} danger onClick={async () => { await api.post('/users/logout'); reload() }}>Выйти</Button>
                    </Space>
                ) : (
                    <Button type="primary" onClick={() => setLoginOpen(true)}>Войти</Button>
                )}
            </div>

            <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
                {!auth ? (
                    <Button type="primary" size="large" onClick={() => setLoginOpen(true)}>Войти в систему</Button>
                ) : user.role === 'admin' ? (
                    <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setCreateUserOpen(true)}>Создать пользователя</Button>
                ) : (
                    <Space direction="vertical" style={{ gap: 16 }}>
                        <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={false} accept=".npz">
                            <Button type="primary" size="large" icon={<UploadOutlined />}>Загрузить тестовый набор (.npz)</Button>
                        </Upload>
                        <Button size="large" icon={<BarChartOutlined />} onClick={() => setAnalyticsOpen(true)}>Аналитика</Button>
                        {testResults && (
                            <Space>
                                <Text>Точность: <b style={{ color: '#52c41a' }}>{(testResults.accuracy * 100).toFixed(2)}%</b></Text>
                                <Text>Потери: <b style={{ color: '#f5222d' }}>{testResults.loss?.toFixed(4)}</b></Text>
                            </Space>
                        )}
                    </Space>
                )}
            </div>

            <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
            <CreateUserModal open={createUserOpen} onClose={() => setCreateUserOpen(false)} />
            <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
            <AnalyticsModal open={analyticsOpen} onClose={() => setAnalyticsOpen(false)} testResults={testResults} analyticsData={analyticsData} />
        </div>
    )
}

export default App
