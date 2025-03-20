import { Grid, Paper, Typography } from '@mui/material';

export default function DataCards({ data }) {
  const stats = [
    { title: 'Total Users', value: data.totalUsers },
    { title: 'Active Subscriptions', value: data.activeSubs },
    { title: 'Avg Rating', value: data.avgRating },
    { title: 'Daily Views', value: data.dailyViews }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stat.title}</Typography>
            <Typography variant="h4" color="primary">
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}