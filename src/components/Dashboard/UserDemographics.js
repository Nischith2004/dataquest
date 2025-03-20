import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function UserDemographics({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age_group" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" name="Users" />
      </BarChart>
    </ResponsiveContainer>
  );
}