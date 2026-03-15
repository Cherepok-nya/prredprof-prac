import { Modal, Tabs, Typography, Statistic, Row, Col, Card } from 'antd'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16']

const AnalyticsModal = ({ open, onClose, analyticsData, testResults }) => {
    if (!analyticsData) {
        return (
            <Modal title="Аналитика" open={open} onCancel={onClose} footer={null} centered>
                <Typography.Text type="secondary">Нет данных. Загрузите тестовый набор.</Typography.Text>
            </Modal>
        )
    }

    const { epochData, classDistData, testAccuracyData, top5Data } = analyticsData

    const items = [
        {
            key: '1',
            label: 'Точность по эпохам',
            children: (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={epochData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" />
                        <YAxis domain={[0, 1]} tickFormatter={v => (v * 100).toFixed(0) + '%'} />
                        <Tooltip formatter={v => (v * 100).toFixed(1) + '%'} />
                        <Legend />
                        <Line type="monotone" dataKey="accuracy" name="Train" stroke="#1890ff" dot={false} />
                        <Line type="monotone" dataKey="val_accuracy" name="Val" stroke="#52c41a" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            ),
        },
        {
            key: '2',
            label: 'Классы (обучение)',
            children: (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={classDistData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="count" name="Записей" fill="#1890ff">
                            {classDistData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ),
        },
        {
            key: '3',
            label: 'Точность по записям',
            children: (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={testAccuracyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis domain={[0, 1]} tickFormatter={v => (v * 100).toFixed(0) + '%'} />
                        <Tooltip formatter={v => (v * 100).toFixed(0) + '%'} />
                        <Bar dataKey="accuracy" name="Точность" fill="#722ed1" />
                    </BarChart>
                </ResponsiveContainer>
            ),
        },
        {
            key: '4',
            label: 'Топ-5 классов',
            children: (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={top5Data} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {top5Data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            ),
        },
        {
            key: '5',
            label: 'Результаты',
            children: testResults ? (
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                        <Card>
                            <Statistic title="Точность" value={(testResults.accuracy * 100).toFixed(2)} suffix="%" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic title="Потери" value={testResults.loss?.toFixed(4)} />
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Typography.Text type="secondary">Нет данных.</Typography.Text>
            ),
        },
    ]

    return (
        <Modal title="Аналитика" open={open} onCancel={onClose} footer={null} width={800} centered>
            <Tabs defaultActiveKey="1" items={items} />
        </Modal>
    )
}

export default AnalyticsModal
