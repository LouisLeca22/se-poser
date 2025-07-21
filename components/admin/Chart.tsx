'use client';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

type ChartPropsType = {
    data: {
        date: string;
        count: number;
    }[];
};

function Chart({ data }: ChartPropsType) {
    return (
        <section className='mt-24'>
            <h1 className="text-4xl font-semibold text-center">Réservations mensuelles</h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" name='Date' />
                    <YAxis allowDecimals />
                    <Tooltip />
                    <Bar dataKey='count' fill="#6D28D9" name="Nombre" barSize={75} />
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
}
export default Chart