import { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { loadCSVData, processData } from './utils/dataLoader';
import Header from './components/Layout/Header'; // Correct import path
import DataCards from './components/Dashboard/DataCards';
import UserDemographics from './components/Dashboard/UserDemographics';
import SubscriptionAnalysis from './components/Dashboard/SubscriptionAnalysis';
import ContentPerformance from './components/Dashboard/ContentPerformance';
import ChartContainer from './components/Layout/ChartContainer'; // Correct import path

export default function App() {
  const [dashboardData, setDashboardData] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const [users, subs, watchHistory, movies] = await Promise.all([
        loadCSVData('/data/cleaned_users.csv').then(processData.users),
        loadCSVData('/data/cleaned_subscriptions.csv').then(processData.subscriptions),
        loadCSVData('/data/cleaned_watch_history.csv'),
        loadCSVData('/data/movies.csv')
      ]);

      // Calculate statistics
      setStats({
        totalUsers: users.length,
        activeSubs: subs.length,
        avgRating: 4.2, // Sample calculation
        dailyViews: '1.2M' // Sample calculation
      });

      // Process demographic data
      const ageGroups = Array.from({ length: 8 }, (_, i) => ({
        age_group: `${i * 10 + 1}-${(i + 1) * 10}`,
        count: users.filter(u => u.age >= i * 10 + 1 && u.age <= (i + 1) * 10).length
      }));

      // Process content performance
      const genrePerformance = movies.map(movie => ({
        genre: movie.genre,
        views: watchHistory.filter(watch => watch.movie_id === movie.movie_id).length,
        rating: parseFloat(movie.rating)
      }));

      setDashboardData({
        ageDistribution: ageGroups,
        subscriptionData: subs.reduce((acc, sub) => {
          acc[sub.plan_type] = (acc[sub.plan_type] || 0) + 1;
          return acc;
        }, {}),
        genrePerformance
      });
    };

    loadData();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header title="G-Flix Analytics Dashboard" />
        
        <DataCards data={stats} />
        
        <ChartContainer title="User Demographics">
          <UserDemographics data={dashboardData.ageDistribution} />
        </ChartContainer>

        <ChartContainer title="Subscription Analysis">
          <SubscriptionAnalysis 
            data={Object.entries(dashboardData.subscriptionData || {}).map(([name, value]) => ({
              name,
              value
            }))}
          />
        </ChartContainer>

        <ChartContainer title="Content Performance by Genre">
          <ContentPerformance data={dashboardData.genrePerformance} />
        </ChartContainer>
      </Container>
    </>
  );
}