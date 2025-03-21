import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd
from dash.dependencies import Input, Output

# Load cleaned data
users = pd.read_csv("cleaned_users.csv")
subscriptions = pd.read_csv("cleaned_subscriptions.csv")
churn_analysis = pd.read_csv("subscription_analysis.csv")
ratings = pd.read_csv("cleaned_ratings.csv")
watch_history = pd.read_csv("cleaned_watch_history.csv")
movies = pd.read_csv("cleaned_movies.csv")

app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("Streaming Service Analytics Dashboard", style={'textAlign': 'center'}),
    
    dcc.Tabs([
        # User Demographics Tab
        dcc.Tab(label='User Insights', children=[
            html.Div([
                dcc.Graph(figure=px.bar(users['country'].value_counts().reset_index(), 
                                      x='country', y='count', 
                                      title='User Distribution by Country')),
                
                dcc.Graph(figure=px.histogram(users, x='age', 
                                            title='Age Distribution',
                                            nbins=20)),
                
                dcc.Graph(figure=px.pie(users, names='country',
                                      title='User Country Composition'))
            ], style={'padding': '20px'})
        ]),
        
        # Subscription Analysis Tab
        dcc.Tab(label='Subscription Insights', children=[
            html.Div([
                dcc.Graph(figure=px.bar(churn_analysis, x='plan_type', y='churn_rate',
                                      title='Churn Rate by Plan Type')),
                
                dcc.Graph(figure=px.pie(subscriptions, names='plan_type',
                                      title='Plan Type Distribution')),
                
                dcc.Graph(figure=px.box(subscriptions, x='plan_type', y='amount',
                                      title='Subscription Amounts by Plan'))
            ])
        ]),
        
        # Content Engagement Tab
        dcc.Tab(label='Content Insights', children=[
            html.Div([
                dcc.Graph(figure=px.histogram(watch_history, x='watch_duration',
                                            title='Watch Duration Distribution')),
                
                dcc.Graph(figure=px.pie(watch_history, names='device_type',
                                      title='Device Usage Distribution')),
                
                dcc.Graph(figure=px.scatter(movies, x='release_year', y='runtime',
                                          title='Movies: Runtime vs Release Year'))
            ])
        ]),
        
        # Ratings Analysis Tab
        dcc.Tab(label='Ratings Insights', children=[
            html.Div([
                dcc.Graph(figure=px.histogram(ratings, x='rating', 
                                            title='Rating Distribution',
                                            nbins=10)),
                
                dcc.Graph(figure=px.scatter(ratings, x='review_date', y='rating',
                                          title='Ratings Over Time')),
                
                dcc.Graph(figure=px.bar(movies.sort_values('runtime', ascending=False).head(20),
                                      x='title', y='runtime',
                                      title='Top Movies by Runtime'))
            ])
        ])
    ])
])

if __name__ == '__main__':
    app.run_server(debug=True)